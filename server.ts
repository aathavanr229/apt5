import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { db } from './server/db.js';
import { Question, Attempt, AttemptAnswer } from './src/types.js';
import { generateMockQuestions } from './server/mockGenerator.js';
import { getBookQuestionsForTopic, getAllBookQuestions, BOOK_QUESTION_REPOSITORIES } from './server/bookQuestions.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK lazily if key is present
let aiClient: GoogleGenAI | null = null;
function getAiClient(): GoogleGenAI | null {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return null;
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// 0. API: Check if API Key is configured
app.get('/api/config-status', (req, res) => {
  res.json({ hasApiKey: Boolean(process.env.GEMINI_API_KEY) });
});

// Auth API Endpoints
app.get('/api/auth/users', (req, res) => {
  try {
    const users = db.getUsers().map(u => ({
      id: u.id,
      name: u.name,
      roll: u.roll,
      email: u.email || `${u.roll.toLowerCase()}@kongu.edu`,
      department: u.department,
      createdAt: u.createdAt
    }));
    res.json(users);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to fetch registered users' });
  }
});

app.post('/api/auth/signup', (req, res) => {
  try {
    const { name, roll, email, department, password } = req.body;
    if (!name || !roll || !password) {
      return res.status(400).json({ error: 'Name, Roll/Registration Number, and Password are required for registration.' });
    }
    const newUser = db.createUser({
      name: name.trim(),
      roll: roll.trim(),
      email: email ? email.trim().toLowerCase() : `${roll.trim().toLowerCase()}@kongu.edu`,
      department: department ? department.trim() : 'Computer Science & Engineering',
      password: password.trim()
    });
    res.json({ success: true, user: newUser });
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Signup failed' });
  }
});

app.post('/api/auth/login', (req, res) => {
  try {
    const { identifier, roll, password } = req.body;
    const loginId = (identifier || roll || '').trim();
    if (!loginId) {
      return res.status(400).json({ error: 'Roll Number or Email Address is required.' });
    }

    const user = db.getUserByIdentifier(loginId);
    if (!user) {
      return res.status(400).json({ 
        error: `Account with identifier "${loginId}" not found. Please Sign Up to create your student account!` 
      });
    }

    if (user.password && password && user.password !== password.trim()) {
      return res.status(400).json({ error: 'Invalid password. Please verify your credentials.' });
    }
    res.json({ success: true, user });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Login failed' });
  }
});

// Leaderboard API endpoint (Rank-wise scorecard)
app.get('/api/leaderboard', (req, res) => {
  try {
    const { topicId, subjectId, testCode } = req.query;
    const result = db.getLeaderboard(
      topicId ? String(topicId) : undefined,
      subjectId ? String(subjectId) : undefined,
      testCode ? String(testCode) : undefined
    );
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to generate leaderboard' });
  }
});

// 1. API: Get all subjects
app.get('/api/subjects', (req, res) => {
  try {
    const subjects = db.getSubjects();
    res.json(subjects);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});


// 2. API: Get all topics (or filter by subject)
app.get('/api/topics', (req, res) => {
  try {
    const { subjectId } = req.query;
    const topics = db.getTopics(subjectId as string);
    res.json(topics);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 3. API: Get specific topic by ID
app.get('/api/topics/:id', (req, res) => {
  try {
    const topic = db.getTopicById(req.params.id);
    if (!topic) {
      return res.status(404).json({ error: 'Topic not found' });
    }
    res.json(topic);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 4. API: Get questions with filters (for Faculty panel)
app.get('/api/questions', (req, res) => {
  try {
    const { topicId, bloomLevel, approved } = req.query;
    const filters: any = {};
    if (topicId) filters.topicId = topicId as string;
    if (bloomLevel) filters.bloomLevel = bloomLevel as string;
    if (approved !== undefined) filters.approved = approved === 'true';

    const questions = db.getQuestionsByFilters(filters);
    res.json(questions);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 5. API: Approve question
app.post('/api/questions/approve/:id', (req, res) => {
  try {
    const success = db.approveQuestion(req.params.id);
    if (!success) {
      return res.status(404).json({ error: 'Question not found' });
    }
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 6. API: Edit/Update Question
app.post('/api/questions/edit/:id', (req, res) => {
  try {
    const { questionText, options, correctAnswer, explanation, bloomLevel } = req.body;
    const success = db.updateQuestion(req.params.id, {
      questionText,
      options,
      correctAnswer,
      explanation,
      bloomLevel,
    });
    if (!success) {
      return res.status(404).json({ error: 'Question not found' });
    }
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 7. API: Delete Question
app.post('/api/questions/delete/:id', (req, res) => {
  try {
    const success = db.deleteQuestion(req.params.id);
    if (!success) {
      return res.status(404).json({ error: 'Question not found' });
    }
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 7b. API: Get Textbook Question Repositories Metadata & Direct Import
app.get('/api/books/repositories', (req, res) => {
  try {
    const repos = BOOK_QUESTION_REPOSITORIES.map(r => ({
      bookTitle: r.bookTitle,
      author: r.author,
      topicId: r.topicId,
      questionCount: r.questions.length
    }));
    res.json({ success: true, repositories: repos });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/books/import-all', (req, res) => {
  try {
    const { topicId } = req.body || {};
    const bookItems = topicId ? getBookQuestionsForTopic(topicId) : getAllBookQuestions();
    
    const mappedQuestions: Question[] = bookItems.map((q, index) => {
      const qId = `q-book-${Date.now()}-${index}-${Math.floor(Math.random() * 1000)}`;
      return {
        id: qId,
        topicId: q.topicId,
        subjectId: q.subjectId,
        bloomLevel: q.bloomLevel,
        qtype: q.qtype,
        questionText: q.questionText,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
        approved: true, // Mark textbook verified problems as approved
        syllabusUnit: q.syllabusUnit,
        learningOutcomes: q.learningOutcomes,
        createdAt: new Date().toISOString()
      };
    });

    db.addQuestions(mappedQuestions);
    res.json({
      success: true,
      importedCount: mappedQuestions.length,
      message: `Successfully loaded ${mappedQuestions.length} standard textbook questions into the verified audit pool.`
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 8. API: Generate Questions via Gemini / Question Bank / Hybrid / Standard Books
app.post('/api/questions/generate', async (req, res) => {
  try {
    const { topicId, bloomLevel, bloomLevels, count, sourceMode = 'ai' } = req.body;
    
    const topic = db.getTopicById(topicId);
    if (!topic) {
      return res.status(404).json({ error: 'Topic not found' });
    }

    // Normalize Bloom Levels
    let levelsArray: string[] = [];
    if (Array.isArray(bloomLevels) && bloomLevels.length > 0) {
      levelsArray = bloomLevels;
    } else if (typeof bloomLevels === 'string' && bloomLevels.trim().length > 0) {
      levelsArray = bloomLevels.split(',').map(l => l.trim()).filter(Boolean);
    } else if (typeof bloomLevel === 'string' && bloomLevel.trim().length > 0) {
      levelsArray = bloomLevel.split(',').map(l => l.trim()).filter(Boolean);
    } else {
      levelsArray = ['Apply'];
    }
    const bloomDisplay = levelsArray.join(' + ');

    const countNum = parseInt(count) || 10;
    let finalQuestions: any[] = [];
    let isOfflineMode = false;

    // Helper to get bank items
    const getBankItems = (qty: number) => {
      const existingInDb = topicId === 'topic-comprehensive-all' 
        ? db.getQuestions()
        : db.getQuestionsByFilters({ topicId });
      let items: any[] = [];
      if (existingInDb.length > 0) {
        items = existingInDb.map(q => ({
          qtype: q.qtype,
          questionText: q.questionText,
          options: q.options,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation,
          bloomLevel: q.bloomLevel
        }));
      }
      if (items.length < qty) {
        const needed = qty - items.length;
        const mockGenerated = generateMockQuestions(topicId, levelsArray[0] || 'Apply', needed + 5);
        items = [...items, ...mockGenerated];
      }
      return items.sort(() => Math.random() - 0.5).slice(0, qty);
    };

    // Helper to get textbook curated questions
    const getBookItems = (qty: number) => {
      const bookItems = topicId === 'topic-comprehensive-all'
        ? getAllBookQuestions()
        : getBookQuestionsForTopic(topicId);
      
      let items = bookItems.map(q => ({
        qtype: q.qtype,
        questionText: q.questionText,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
        bloomLevel: q.bloomLevel
      }));

      // If more questions are requested than available in the book repo, fill remainder with curriculum questions
      if (items.length < qty) {
        const needed = qty - items.length;
        const fillers = generateMockQuestions(topicId, levelsArray[0] || 'Apply', needed + 5);
        items = [...items, ...fillers];
      }
      return items.sort(() => Math.random() - 0.5).slice(0, qty);
    };

    if (sourceMode === 'bank') {
      finalQuestions = getBankItems(countNum);
      isOfflineMode = true;
    } else if (sourceMode === 'book') {
      finalQuestions = getBookItems(countNum);
      isOfflineMode = true;
    } else {
      const aiNeededCount = sourceMode === 'hybrid' ? Math.ceil(countNum / 2) : countNum;
      const bankNeededCount = countNum - aiNeededCount;

      let aiGenerated: any[] = [];
      try {
        const ai = getAiClient();
        if (!ai) {
          throw new Error('GEMINI_API_KEY environment variable is not configured. Switching to algorithmic syllabus question generator.');
        }
        const mcqCount = Math.round(aiNeededCount * 0.7);
        const shortCount = aiNeededCount - mcqCount;

        const formulasStr = topic.formulas
          .map(f => `- ${f.name}: ${f.formula} (${f.note || ''})`)
          .join('\n');

        const bloomInstructions = levelsArray
          .map(l => `Level "${l}": ${getBloomInstruction(l)}`)
          .join('\n');

        const prompt = `You are an expert technical examiner in Engineering and Quantitative Aptitude.
Generate exactly ${aiNeededCount} unique, high-quality questions for the topic "${topic.name}" spanning the following Bloom's Taxonomy Cognitive Levels: [${bloomDisplay}].

Course Syllabus Context:
- Syllabus Unit: ${topic.syllabusUnit}
- Learning Outcomes: ${topic.learningOutcomes}
- Topic Summary: ${topic.summary}
- Crucial Reference Formulas:\n${formulasStr}

Bloom's Taxonomy Instructions:
${bloomInstructions}

Requirements:
1. Generate exactly ${aiNeededCount} questions in total, evenly distributed across the requested Bloom levels [${bloomDisplay}].
2. Structure the set as: exactly ${mcqCount} MCQ questions and ${shortCount} Short Answer questions.
3. Every question must be distinct, mathematically accurate, and non-repetitive.
4. The MCQs must have exactly 4 plausible options, with one clear correct option.
5. Short-answer questions must have empty options arrays and direct numerical or short textual answers.
6. Provide a detailed, step-by-step mathematical explanation showing how the formula resolves the problem.

Return the questions as a JSON array matching the requested schema.`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.6-flash',
          contents: prompt,
          config: {
            maxOutputTokens: 8192,
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  qtype: {
                    type: Type.STRING,
                    description: "Type of question. MUST be either 'mcq' or 'short'."
                  },
                  questionText: {
                    type: Type.STRING,
                    description: "The scenario or question text. State values clearly."
                  },
                  options: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "Array of exactly 4 options for MCQ. MUST be empty array for short-answer questions."
                  },
                  correctAnswer: {
                    type: Type.STRING,
                    description: "The correct answer. For MCQ, this must EXACTLY match one of the options. For short answer, it should be the direct value."
                  },
                  explanation: {
                    type: Type.STRING,
                    description: "Step-by-step formula derivation and calculation details."
                  },
                  bloomLevel: {
                    type: Type.STRING,
                    description: "The specific Bloom level of this question from the requested list."
                  }
                },
                required: ['qtype', 'questionText', 'options', 'correctAnswer', 'explanation']
              }
            }
          }
        });

        const text = response.text;
        if (!text) {
          throw new Error('No content returned from Gemini.');
        }

        aiGenerated = JSON.parse(text);
      } catch (geminiErr: any) {
        console.warn('Gemini API question generation failed/fallback triggered:', geminiErr?.message || geminiErr);
        isOfflineMode = true;
        aiGenerated = generateMockQuestions(topicId, levelsArray[0] || 'Apply', aiNeededCount);
      }

      if (sourceMode === 'hybrid' && bankNeededCount > 0) {
        const bankItems = getBankItems(bankNeededCount);
        finalQuestions = [...aiGenerated, ...bankItems];
      } else {
        finalQuestions = aiGenerated;
      }
    }

    // Deduplicate questions by questionText
    const seenTexts = new Set<string>();
    let uniqueQuestions = finalQuestions.filter((q: any) => {
      const clean = String(q.questionText || '').trim().toLowerCase();
      if (!clean || seenTexts.has(clean)) return false;
      seenTexts.add(clean);
      return true;
    });

    // If deduplication caused count to fall below requested count, backfill with diverse mock items
    let backfillAttempts = 0;
    while (uniqueQuestions.length < countNum && backfillAttempts < 5) {
      backfillAttempts++;
      const needed = countNum - uniqueQuestions.length;
      const fillers = generateMockQuestions(topicId, levelsArray[0] || 'Apply', Math.max(needed + 15, 20));
      for (const f of fillers) {
        const clean = String(f.questionText || '').trim().toLowerCase();
        if (!seenTexts.has(clean)) {
          seenTexts.add(clean);
          uniqueQuestions.push(f);
          if (uniqueQuestions.length >= countNum) break;
        }
      }
    }

    // Slice to exact count
    uniqueQuestions = uniqueQuestions.slice(0, countNum);

    // Map and inject into database as pending (approved = false) questions
    const mappedQuestions: Question[] = uniqueQuestions.map((q: any, index: number) => {
      const qId = `q-gen-${Date.now()}-${index}-${Math.floor(Math.random() * 1000)}`;
      const assignedBloom = q.bloomLevel || levelsArray[index % levelsArray.length] || 'Apply';
      return {
        id: qId,
        topicId: topic.id,
        subjectId: topic.subjectId,
        bloomLevel: assignedBloom,
        qtype: q.qtype === 'mcq' ? 'mcq' : 'short',
        questionText: q.questionText,
        options: q.qtype === 'mcq' && Array.isArray(q.options) ? q.options : [],
        correctAnswer: String(q.correctAnswer).trim(),
        explanation: q.explanation || 'No explanation provided.',
        approved: false,
        syllabusUnit: topic.syllabusUnit,
        learningOutcomes: topic.learningOutcomes,
        createdAt: new Date().toISOString()
      };
    });

    db.addQuestions(mappedQuestions);

    res.json({
      success: true,
      topic,
      bloomLevel: bloomDisplay,
      levelsArray,
      count: mappedQuestions.length,
      isOfflineMode,
      sourceMode,
      questions: mappedQuestions
    });
  } catch (error: any) {
    console.error('Error generating questions:', error);
    res.status(500).json({ error: error.message });
  }
});

// 9. API: Submit Attempt & Grade Answers (Including AI Equivalence check for Short-Answer)
app.post('/api/attempts', async (req, res) => {
  try {
    const { topicId, bloomLevel, studentName, studentRoll, studentEmail, studentDepartment, topicName, testCode, timeTakenSeconds, answers } = req.body;
    
    const gradedAnswers: AttemptAnswer[] = [];
    let score = 0;

    for (const ans of answers) {
      const isMcq = ans.qtype === 'mcq';
      let correct = false;
      let graderReason = '';

      if (isMcq) {
        // Exact MCQ comparison
        correct = String(ans.userAnswer).trim().toLowerCase() === String(ans.correctAnswer).trim().toLowerCase();
        graderReason = correct ? 'Correct option selected.' : 'Incorrect option selected.';
      } else {
        // Short-answer normalization & evaluation
        const normalizedUser = normalizeValue(ans.userAnswer);
        const normalizedCorrect = normalizeValue(ans.correctAnswer);

        if (normalizedUser === normalizedCorrect) {
          correct = true;
          graderReason = 'Exact normalized value matched.';
        } else {
          // Verify equivalence via Gemini if available
          try {
            const ai = getAiClient();
            if (!ai) {
              throw new Error('No Gemini API client configured for NLP equivalence check.');
            }
            const verifyPrompt = `Evaluate if the student's answer is mathematically or conceptually equivalent to the correct answer.

Question: ${ans.questionText}
Correct Answer: ${ans.correctAnswer}
Student Answer: ${ans.userAnswer}

Consider equivalent formats, rounding (e.g. 0.33 vs 1/3), percentages (e.g. 50% vs 0.5), formulas, and currency prefixes.
Provide a boolean field 'correct' indicating if it is equivalent, and a short string 'reason' explaining why.`;

            const aiRes = await ai.models.generateContent({
              model: 'gemini-3.6-flash',
              contents: verifyPrompt,
              config: {
                responseMimeType: 'application/json',
                responseSchema: {
                  type: Type.OBJECT,
                  properties: {
                    correct: { type: Type.BOOLEAN },
                    reason: { type: Type.STRING }
                  },
                  required: ['correct', 'reason']
                }
              }
            });

            if (aiRes.text) {
              const check = JSON.parse(aiRes.text);
              correct = !!check.correct;
              graderReason = check.reason || 'Verified by AI Grader.';
            } else {
              graderReason = 'AI Grader did not return any feedback, treated as incorrect.';
            }
          } catch (aiErr) {
            console.error('Error during AI answer verification:', aiErr);
            graderReason = 'AI Grader verification failed; evaluated using local exact match.';
          }
        }
      }

      if (correct) {
        score++;
      }

      gradedAnswers.push({
        questionId: ans.questionId,
        userAnswer: ans.userAnswer,
        correct,
        qtype: ans.qtype,
        questionText: ans.questionText,
        options: ans.options,
        correctAnswer: ans.correctAnswer,
        explanation: ans.explanation,
        graderReason
      });
    }

    const topic = db.getTopicById(topicId);
    const totalCount = Math.max(1, answers.length);
    const percentage = Math.round((score / totalCount) * 100);

    const attemptId = `attempt-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const attempt: Attempt = {
      id: attemptId,
      topicId,
      topicName: topicName || topic?.name || 'Aptitude Test',
      subjectId: topic?.subjectId || 'subj-aptitude',
      testCode: testCode || undefined,
      bloomLevel,
      studentName: studentName || 'Guest Student',
      studentRoll: studentRoll || 'ROLL-TEMP',
      studentEmail: studentEmail || `${(studentRoll || 'student').toLowerCase()}@kongu.edu`,
      studentDepartment: studentDepartment || 'Engineering',
      score,
      total: answers.length,
      percentage,
      timeTakenSeconds: timeTakenSeconds ? Number(timeTakenSeconds) : 180,
      answers: gradedAnswers,
      createdAt: new Date().toISOString()
    };

    db.addAttempt(attempt);

    res.json({ attemptId, score, total: answers.length, percentage });
  } catch (error: any) {
    console.error('Error processing attempt submission:', error);
    res.status(500).json({ error: error.message });
  }
});

// 10. API: Get all attempts (with optional filters)
app.get('/api/attempts', (req, res) => {
  try {
    const { topicId, subjectId, testCode } = req.query;
    const attempts = db.getAttempts({
      topicId: topicId ? String(topicId) : undefined,
      subjectId: subjectId ? String(subjectId) : undefined,
      testCode: testCode ? String(testCode) : undefined
    });
    res.json(attempts);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 11. API: Get Attempt by ID
app.get('/api/attempts/:id', (req, res) => {
  try {
    const attempt = db.getAttemptById(req.params.id);
    if (!attempt) {
      return res.status(404).json({ error: 'Attempt not found' });
    }
    res.json(attempt);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Helper for Bloom's Taxonomy Prompts
function getBloomInstruction(level: string): string {
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
      return 'Ask questions testing judgment, choice selection, and verification. Have the student compare two deals, determine which plan is superior, verify if a solution claims a valid outcome, or evaluate which mathematical model fits a complex scenario. Example: "Evaluate which of two discount schemes is better for a merchant, or if a student\'s solution is correct."';
    case 'Create':
      return 'Synthesizing knowledge. Formulate complex synthesis questions, design original problems with variable parameters, build logical equations representing hypothetical systems, or create abstract optimization challenges on this topic. Example: "Formulate a work-rate equation under specific real-world factory downtime rules."';
    default:
      return 'Standard problem-solving assessment.';
  }
}

// Normalize a string value for local comparison
function normalizeValue(val: string): string {
  if (!val) return '';
  return val
    .toLowerCase()
    .replace(/\s+/g, '') // Remove whitespaces
    .replace(/[%,$,rs.,₹,meters,seconds,sec,min,hrs,hours,days,kg,gm]/g, '') // Remove units
    .trim();
}

async function startServer() {
  // If running in Vercel serverless environment, do not start local HTTP listener
  if (process.env.VERCEL) {
    return;
  }

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();

export default app;
export { app };
