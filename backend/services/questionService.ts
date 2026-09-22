import { GoogleGenAI, Type } from '@google/genai';
import { Question, IQuestion } from '../models/Question.js';
import { TestSession, ITestSessionQuestion } from '../models/TestSession.js';
import { db } from '../../server/db.js';
import { generateMockQuestions } from '../../server/mockGenerator.js';
import { getBookQuestionsForTopic, getAllBookQuestions, BOOK_QUESTION_REPOSITORIES } from '../../server/bookQuestions.js';
import { getAiClient } from './gradingService.js';
import { TRAIN_PROBLEMS_100_BANK, getTrain100Questions } from '../../server/trains100Data.js';

export function getBloomInstruction(level: string): string {
  switch (level) {
    case 'Remember':
      return 'Formulate questions testing knowledge retrieval. Ask for direct formula definitions, standard terms, or simple direct values that require no deep manipulation. Examples: recalling constants, state of definitions, exact literal statements of mathematical theorems.';
    case 'Understand':
      return 'Test comprehension. Ask questions where the student must explain, interpret, describe, or identify correct explanations of the formulas. Examples: "Which of the following describes why simple interest remains constant?", "Explain the relationship between M1, D1, H1, and the work done."';
    case 'Apply':
      return 'Classic quantitative calculation. Challenge the student to apply formulas in standard single-step or simple multi-step scenarios to find numerical outputs. Make sure they use the key formulas. Examples: "Find simple interest given Principal, Rate, and Time.", "Calculate percentage increase from 250 to 300."';
    case 'Analyze':
      return 'Multi-step reasoning and logical breaking-down of systems. Questions should involve drawing connections, identifying constraints, or managing compound changes. Examples: combined work schedules where employees work on alternative days, successive percentage updates, relative speed problems with varying acceleration or multiple targets.';
    case 'Evaluate':
      return 'Ask questions testing judgment, choice selection, and verification. Have the student compare two deals, determine which plan is superior, verify if a solution claims a valid outcome, or evaluate which mathematical model fits a complex scenario.';
    case 'Create':
      return 'Synthesizing knowledge. Formulate complex synthesis questions, design original problems with variable parameters, build logical equations representing hypothetical systems, or create abstract optimization challenges on this topic.';
    default:
      return 'Standard problem-solving assessment.';
  }
}

export function generateTestCode(topicId: string): string {
  const prefix = topicId.replace('topic-', '').substring(0, 4).toUpperCase();
  const randomChars = Math.random().toString(36).substring(2, 6).toUpperCase();
  const year = new Date().getFullYear();
  return `APT-${prefix}-${year}-${randomChars}`;
}

export class QuestionService {
  /**
   * Filter questions from MongoDB Question pool (or initial book defaults)
   */
  static async getQuestions(filters: { topicId?: string; bloomLevel?: string; approved?: boolean }) {
    const query: any = {};
    if (filters.topicId && filters.topicId !== 'all') {
      query.topicId = filters.topicId;
    }
    if (filters.bloomLevel && filters.bloomLevel !== 'all') {
      const levels = filters.bloomLevel.split(',').map((l) => l.trim());
      query.bloomLevel = { $in: levels.map((l) => new RegExp(`^${l}$`, 'i')) };
    }
    if (filters.approved !== undefined) {
      query.approved = filters.approved;
    }

    try {
      const dbQuestions = await Question.find(query).sort({ createdAt: -1 }).lean();
      if (dbQuestions.length > 0) {
        return dbQuestions.map((q: any) => ({
          id: q.customId || q._id.toString(),
          topicId: q.topicId,
          subjectId: q.subjectId,
          bloomLevel: q.bloomLevel,
          qtype: q.qtype,
          questionText: q.questionText,
          options: q.options || [],
          correctAnswer: q.correctAnswer,
          explanation: q.explanation || '',
          approved: q.approved,
          syllabusUnit: q.syllabusUnit,
          learningOutcomes: q.learningOutcomes,
          createdAt: q.createdAt?.toISOString() || new Date().toISOString(),
        }));
      }
    } catch (err) {
      console.warn('MongoDB query for questions fallback to book pool:', err);
    }

    // If topic is Trains, return from the official 100-question PDF bank
    if (filters.topicId === 'topic-trains') {
      return TRAIN_PROBLEMS_100_BANK.map((q) => ({
        id: q.id,
        topicId: q.topicId,
        subjectId: q.subjectId,
        bloomLevel: q.bloomLevel,
        qtype: q.qtype,
        questionText: q.questionText,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
        approved: true,
        syllabusUnit: 'Unit III: Train Problems - 100 Questions Official Module',
        learningOutcomes: 'Master all 10 rules of train relative velocity and time calculations.',
        createdAt: new Date().toISOString(),
      }));
    }

    // If MongoDB collection has no questions yet, return from verified book pool
    const bookPool = filters.topicId && filters.topicId !== 'all'
      ? getBookQuestionsForTopic(filters.topicId)
      : getAllBookQuestions();

    return bookPool.map((q, idx) => ({
      id: `q-book-init-${idx}`,
      topicId: q.topicId,
      subjectId: q.subjectId,
      bloomLevel: q.bloomLevel,
      qtype: q.qtype,
      questionText: q.questionText,
      options: q.options,
      correctAnswer: q.correctAnswer,
      explanation: q.explanation,
      approved: true,
      syllabusUnit: q.syllabusUnit,
      learningOutcomes: q.learningOutcomes,
      createdAt: new Date().toISOString(),
    }));
  }

  /**
   * Generates questions and binds them to a unique, shareable TestSession with testCode.
   */
  static async generateQuestions(params: {
    topicId: string;
    bloomLevel?: string;
    bloomLevels?: string[];
    count?: number;
    sourceMode?: string;
    studentId?: string;
  }) {
    const { topicId, sourceMode = 'ai', studentId } = params;
    const topic = db.getTopicById(topicId);
    if (!topic) {
      throw new Error(`Topic with id "${topicId}" not found.`);
    }

    // Normalize Bloom levels
    let levelsArray: string[] = [];
    if (Array.isArray(params.bloomLevels) && params.bloomLevels.length > 0) {
      levelsArray = params.bloomLevels;
    } else if (params.bloomLevel && typeof params.bloomLevel === 'string' && params.bloomLevel.trim().length > 0) {
      levelsArray = params.bloomLevel.split(',').map((l) => l.trim()).filter(Boolean);
    } else {
      levelsArray = ['Apply'];
    }
    const bloomDisplay = levelsArray.join(' + ');
    const countNum = Math.min(Math.max(Number(params.count) || 10, 5), 100);

    let finalQuestions: any[] = [];
    let isOfflineMode = false;

    const getBankItems = async (qty: number) => {
      let items: any[] = [];
      try {
        const query: any = topicId === 'topic-comprehensive-all' ? {} : { topicId };
        const stored: any[] = await Question.find(query).lean();
        if (stored.length > 0) {
          items = stored.map((q: any) => ({
            id: q.customId || q._id.toString(),
            qtype: q.qtype,
            questionText: q.questionText,
            options: q.options,
            correctAnswer: q.correctAnswer,
            explanation: q.explanation,
            bloomLevel: q.bloomLevel,
          }));
        }
      } catch (e) {
        console.warn('Bank fetch from MongoDB failed, using algorithm generator:', e);
      }

      if (items.length < qty) {
        const needed = qty - items.length;
        const mock = generateMockQuestions(topicId, levelsArray[0] || 'Apply', needed + 5);
        items = [...items, ...mock];
      }
      return items.sort(() => Math.random() - 0.5).slice(0, qty);
    };

    const getBookItems = (qty: number) => {
      const bookItems = topicId === 'topic-comprehensive-all'
        ? getAllBookQuestions()
        : getBookQuestionsForTopic(topicId);

      let items: any[] = bookItems.map((q, idx) => ({
        id: `q-book-${idx}-${Date.now()}`,
        qtype: q.qtype,
        questionText: q.questionText,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
        bloomLevel: q.bloomLevel,
      }));

      if (items.length < qty) {
        const needed = qty - items.length;
        const fillers = generateMockQuestions(topicId, levelsArray[0] || 'Apply', needed + 5);
        items = [...items, ...fillers];
      }
      return items.sort(() => Math.random() - 0.5).slice(0, qty);
    };

    if (topicId === 'topic-trains') {
      // Train Problems Official Module: Strictly and exclusively drawn from the 100-question PDF bank
      const trainBank = getTrain100Questions(countNum);
      finalQuestions = trainBank.map((q) => ({
        id: q.id,
        qtype: q.qtype,
        questionText: q.questionText,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
        bloomLevel: q.bloomLevel,
      }));
      isOfflineMode = true;
    } else if (sourceMode === 'bank') {
      finalQuestions = await getBankItems(countNum);
      isOfflineMode = true;
    } else if (sourceMode === 'book') {
      finalQuestions = getBookItems(countNum);
      isOfflineMode = true;
    } else {
      // AI or Hybrid mode
      const aiNeededCount = sourceMode === 'hybrid' ? Math.ceil(countNum / 2) : countNum;
      const bankNeededCount = countNum - aiNeededCount;

      let aiGenerated: any[] = [];
      try {
        const ai = getAiClient();
        if (!ai) {
          throw new Error('GEMINI_API_KEY environment variable is not configured.');
        }

        const mcqCount = Math.round(aiNeededCount * 0.7);
        const shortCount = aiNeededCount - mcqCount;

        const formulasStr = topic.formulas
          .map((f) => `- ${f.name}: ${f.formula} (${f.note || ''})`)
          .join('\n');

        const bloomInstructions = levelsArray
          .map((l) => `Level "${l}": ${getBloomInstruction(l)}`)
          .join('\n');

        const prompt = `You are an expert technical examiner in Engineering and Quantitative Aptitude.
Generate exactly ${aiNeededCount} unique, high-quality questions for the topic "${topic.name}" spanning Bloom levels: [${bloomDisplay}].

Course Syllabus Context:
- Syllabus Unit: ${topic.syllabusUnit}
- Learning Outcomes: ${topic.learningOutcomes}
- Topic Summary: ${topic.summary}
- Crucial Reference Formulas:\n${formulasStr}

Bloom Instructions:
${bloomInstructions}

Requirements:
1. Generate exactly ${aiNeededCount} questions distributed across Bloom levels [${bloomDisplay}].
2. Structure as: exactly ${mcqCount} MCQ questions and ${shortCount} Short Answer questions.
3. Every question must be distinct and mathematically accurate.
4. MCQs must have exactly 4 plausible options, with one clear correct option.
5. Short-answer questions must have empty options arrays and direct numerical or short textual answers.
6. Provide a detailed, step-by-step mathematical explanation showing formula derivations.`;

        const candidateModels = ['gemini-3.6-flash', 'gemini-2.5-flash', 'gemini-2.0-flash'];
        let response: any = null;
        let lastModelErr = null;

        for (const m of candidateModels) {
          try {
            response = await ai.models.generateContent({
              model: m,
              contents: prompt,
              config: {
                maxOutputTokens: 8192,
                responseMimeType: 'application/json',
                responseSchema: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      qtype: { type: Type.STRING },
                      questionText: { type: Type.STRING },
                      options: { type: Type.ARRAY, items: { type: Type.STRING } },
                      correctAnswer: { type: Type.STRING },
                      explanation: { type: Type.STRING },
                      bloomLevel: { type: Type.STRING },
                    },
                    required: ['qtype', 'questionText', 'options', 'correctAnswer', 'explanation'],
                  },
                },
              },
            });
            if (response && response.text) break;
          } catch (mErr) {
            lastModelErr = mErr;
          }
        }

        if (response && response.text) {
          aiGenerated = JSON.parse(response.text);
        } else {
          throw lastModelErr || new Error('Empty response from Gemini');
        }
      } catch (geminiErr: any) {
        console.warn('Gemini question generation fallback:', geminiErr?.message || geminiErr);
        isOfflineMode = true;
        aiGenerated = generateMockQuestions(topicId, levelsArray[0] || 'Apply', aiNeededCount);
      }

      if (sourceMode === 'hybrid' && bankNeededCount > 0) {
        const bankItems = await getBankItems(bankNeededCount);
        finalQuestions = [...aiGenerated, ...bankItems];
      } else {
        finalQuestions = aiGenerated;
      }
    }

    // Deduplicate questions by questionText
    let uniqueQuestions: any[] = [];
    if (topicId === 'topic-trains') {
      // Questions are already strictly chosen from the 100-question PDF bank
      uniqueQuestions = finalQuestions.slice(0, countNum);
    } else {
      const seenTexts = new Set<string>();
      uniqueQuestions = finalQuestions.filter((q: any) => {
        const clean = String(q.questionText || '').trim().toLowerCase();
        if (!clean || seenTexts.has(clean)) return false;
        seenTexts.add(clean);
        return true;
      });

      // Backfill if needed
      let attempts = 0;
      while (uniqueQuestions.length < countNum && attempts < 5) {
        attempts++;
        const needed = countNum - uniqueQuestions.length;
        const fillers = generateMockQuestions(topicId, levelsArray[0] || 'Apply', Math.max(needed + 10, 15));
        for (const f of fillers) {
          const clean = String(f.questionText || '').trim().toLowerCase();
          if (!seenTexts.has(clean)) {
            seenTexts.add(clean);
            uniqueQuestions.push(f);
            if (uniqueQuestions.length >= countNum) break;
          }
        }
      }

      uniqueQuestions = uniqueQuestions.slice(0, countNum);
    }

    // Map questions with unique IDs
    const mappedQuestions: ITestSessionQuestion[] = uniqueQuestions.map((q: any, idx: number) => {
      const qId = q.id || `q-gen-${Date.now()}-${idx}-${Math.floor(Math.random() * 1000)}`;
      const assignedBloom = q.bloomLevel || levelsArray[idx % levelsArray.length] || 'Apply';
      return {
        id: qId,
        topicId: topic.id,
        bloomLevel: assignedBloom,
        qtype: q.qtype === 'mcq' ? 'mcq' : 'short',
        questionText: q.questionText,
        options: q.qtype === 'mcq' && Array.isArray(q.options) ? q.options : [],
        correctAnswer: String(q.correctAnswer).trim(),
        explanation: q.explanation || 'Refer to standard formula derivation for this topic.',
      };
    });

    // Create unique TestSession with testCode
    const testCode = generateTestCode(topic.id);
    try {
      await TestSession.create({
        testCode,
        topicId: topic.id,
        topicName: topic.name,
        subjectId: topic.subjectId,
        bloomLevel: bloomDisplay,
        bloomLevels: levelsArray,
        sourceMode,
        count: mappedQuestions.length,
        questions: mappedQuestions,
        createdByStudentId: studentId ? (studentId as any) : undefined,
      });
    } catch (sessionErr) {
      console.warn('Failed to persist TestSession to MongoDB:', sessionErr);
    }

    // Persist questions to Question pool for audit/bank
    try {
      const questionDocs = mappedQuestions.map((q) => ({
        customId: q.id,
        topicId: q.topicId,
        subjectId: topic.subjectId,
        bloomLevel: q.bloomLevel,
        qtype: q.qtype,
        questionText: q.questionText,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
        approved: false,
        syllabusUnit: topic.syllabusUnit,
        learningOutcomes: topic.learningOutcomes,
        source: sourceMode,
      }));
      await Question.insertMany(questionDocs as any, { ordered: false }).catch(() => {});
    } catch {
      // Ignore duplicates
    }

    return {
      testCode,
      topic,
      bloomLevel: bloomDisplay,
      levelsArray,
      count: mappedQuestions.length,
      isOfflineMode,
      sourceMode,
      questions: mappedQuestions,
    };
  }

  /**
   * Approve a question in MongoDB.
   */
  static async approveQuestion(id: string): Promise<boolean> {
    const filter: any = id.match(/^[0-9a-fA-F]{24}$/)
      ? { $or: [{ customId: id }, { _id: id }] }
      : { customId: id };
    const res = await Question.findOneAndUpdate(filter, { approved: true });
    return Boolean(res);
  }

  /**
   * Update an existing question.
   */
  static async updateQuestion(id: string, updates: any): Promise<boolean> {
    const filter: any = id.match(/^[0-9a-fA-F]{24}$/)
      ? { $or: [{ customId: id }, { _id: id }] }
      : { customId: id };
    const res = await Question.findOneAndUpdate(filter, { $set: updates });
    return Boolean(res);
  }

  /**
   * Delete a question.
   */
  static async deleteQuestion(id: string): Promise<boolean> {
    const filter: any = id.match(/^[0-9a-fA-F]{24}$/)
      ? { $or: [{ customId: id }, { _id: id }] }
      : { customId: id };
    const res = await Question.findOneAndDelete(filter);
    return Boolean(res);
  }

  /**
   * Import standard textbook questions into MongoDB Question collection.
   */
  static async importAllBookQuestions(topicId?: string) {
    const bookItems = topicId ? getBookQuestionsForTopic(topicId) : getAllBookQuestions();

    const mapped = bookItems.map((q, idx) => ({
      customId: `q-book-${Date.now()}-${idx}-${Math.floor(Math.random() * 1000)}`,
      topicId: q.topicId,
      subjectId: q.subjectId,
      bloomLevel: q.bloomLevel,
      qtype: q.qtype,
      questionText: q.questionText,
      options: q.options,
      correctAnswer: q.correctAnswer,
      explanation: q.explanation,
      approved: true, // textbook items are approved
      syllabusUnit: q.syllabusUnit,
      learningOutcomes: q.learningOutcomes,
      source: 'book',
    }));

    let importedCount = 0;
    try {
      const docs = await Question.insertMany(mapped as any, { ordered: false });
      importedCount = docs.length;
    } catch (err: any) {
      importedCount = err.insertedDocs ? err.insertedDocs.length : mapped.length;
    }

    return {
      success: true,
      importedCount,
      message: `Successfully loaded ${importedCount} standard textbook questions into MongoDB verified pool.`,
    };
  }

  static getBookRepositories() {
    return BOOK_QUESTION_REPOSITORIES.map((r) => ({
      bookTitle: r.bookTitle,
      author: r.author,
      topicId: r.topicId,
      questionCount: r.questions.length,
    }));
  }
}
