import React, { useEffect, useState } from 'react';
import { Question, Topic } from '../types';
import { FileText, ArrowLeft, Loader2, Sparkles, AlertCircle, BookOpen, GraduationCap, ChevronDown, ChevronUp } from 'lucide-react';
import { StudentProfile } from '../components/StudentLoginModal';

interface QuizProps {
  topicId: string;
  bloomLevel: string;
  bloomLevels?: string[];
  sourceMode?: 'ai' | 'bank' | 'hybrid';
  count: number;
  student: StudentProfile | null;
  onQuizComplete: (attemptId: string) => void;
  onBack: () => void;
  onOpenLogin: () => void;
}

export default function Quiz({
  topicId,
  bloomLevel,
  bloomLevels = ['Apply'],
  sourceMode = 'ai',
  count,
  student,
  onQuizComplete,
  onBack,
  onOpenLogin
}: QuizProps) {
  const [topic, setTopic] = useState<Topic | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showSummary, setShowSummary] = useState(true);

  // Student credentials
  const [studentName, setStudentName] = useState(student?.name || '');
  const [studentRoll, setStudentRoll] = useState(student?.roll || '');
  const [showFormError, setShowFormError] = useState(false);

  // Auto update student name/roll if student prop changes
  useEffect(() => {
    if (student) {
      setStudentName(student.name);
      setStudentRoll(student.roll);
    }
  }, [student]);

  // Answers state
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [startTime] = useState<number>(Date.now());

  // Fetch Topic & Generate Questions
  useEffect(() => {
    // Get topic details
    fetch(`/api/topics/${topicId}`)
      .then((res) => res.json())
      .then((data) => setTopic(data))
      .catch((err) => console.error(err));

    // Generate questions
    fetch('/api/questions/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topicId, bloomLevel, bloomLevels, sourceMode, count })
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Failed to load question paper');
        }
        return data;
      })
      .then((data) => {
        setQuestions(data.questions);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [topicId, bloomLevel, JSON.stringify(bloomLevels), sourceMode, count]);


  // 3. Handle selections
  const handleAnswerChange = (qId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [qId]: value }));
  };

  // 4. Submit Examination Paper
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !studentRoll.trim()) {
      setShowFormError(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setShowFormError(false);
    setIsSubmitting(true);

    try {
      const elapsedSeconds = Math.max(5, Math.floor((Date.now() - startTime) / 1000));
      const requestPayload = {
        topicId,
        topicName: topic?.name || 'Aptitude Test',
        bloomLevel,
        studentName,
        studentRoll,
        studentEmail: student?.email || `${studentRoll.toLowerCase()}@kongu.edu`,
        studentDepartment: student?.department || 'Computer Science & Engineering',
        timeTakenSeconds: elapsedSeconds,
        answers: questions.map((q) => ({
          questionId: q.id,
          questionText: q.questionText,
          qtype: q.qtype,
          options: q.options,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation,
          userAnswer: answers[q.id] || ''
        }))
      };

      const res = await fetch('/api/attempts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestPayload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Evaluation server error');
      
      onQuizComplete(data.attemptId);
    } catch (err: any) {
      alert(`Submission error: ${err.message}`);
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center max-w-xl mx-auto px-4 py-16 text-center">
        <Loader2 className="h-9 w-9 text-rust animate-spin mb-4" />
        <h3 className="font-serif text-xl font-bold text-ink mb-1">
          Loading Examination Paper
        </h3>
        <p className="text-xs text-olive">
          Retrieving questions and assessment parameters...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <div className="inline-flex p-3 bg-rust/5 rounded-full border border-rust/10 text-rust mb-4">
          <AlertCircle className="h-8 w-8" />
        </div>
        <h3 className="font-serif text-xl font-bold text-ink mb-2">
          Assessment Loading Failed
        </h3>
        <p className="text-xs text-olive leading-relaxed mb-6">
          {error}
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onBack}
            className="px-4 py-2 bg-cream text-ink font-sans font-medium rounded-lg border border-beige hover:bg-beige/40 transition-colors cursor-pointer text-xs"
          >
            Back to Topics
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs font-sans font-medium text-olive hover:text-rust mb-6 transition-colors cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Topic
      </button>

      {/* Submission Overlay */}
      {isSubmitting && (
        <div className="fixed inset-0 z-50 bg-paper/95 flex flex-col items-center justify-center text-center p-4">
          <Loader2 className="h-10 w-10 text-rust animate-spin mb-4" />
          <h3 className="font-serif text-2xl font-bold text-ink mb-1">
            Submitting Assessment Sheet
          </h3>
          <p className="text-xs text-olive">
            Recording responses and computing evaluation scorecard...
          </p>
        </div>
      )}

      {/* Brief Topic Summary Cheat Sheet Banner */}
      {topic && (
        <div className="paper-sheet rounded-xl border border-beige p-5 mb-8 bg-gradient-to-r from-cream/60 to-paper shadow-2xs">
          <div 
            onClick={() => setShowSummary(!showSummary)}
            className="flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-terracotta text-paper rounded-lg">
                <BookOpen className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-serif text-base font-bold text-ink">
                  Brief Topic Summary: {topic.name}
                </h3>
                <p className="text-xxs text-olive font-mono">{topic.syllabusUnit}</p>
              </div>
            </div>
            <button
              type="button"
              className="text-xs text-rust font-semibold flex items-center gap-1 hover:underline"
            >
              {showSummary ? 'Hide Summary' : 'Show Topic Summary & Formulas'}
              {showSummary ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
          </div>

          {showSummary && (
            <div className="mt-4 pt-4 border-t border-beige/60 space-y-3 animate-fadeIn">
              <p className="text-xs sm:text-sm text-ink/80 leading-relaxed">
                {topic.summary}
              </p>

              <div>
                <span className="text-xxs font-mono uppercase text-rust font-bold block mb-2">
                  Key Formulas Reference:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {topic.formulas.map((f, i) => (
                    <div key={i} className="bg-paper p-2.5 rounded border border-beige/60 text-xxs font-mono">
                      <span className="font-bold text-ink block">{f.name}:</span>
                      <span className="text-rust font-semibold">{f.formula}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Exam Paper Sheet */}
        <div className="bg-paper border-2 border-beige shadow-lg rounded-xl p-6 sm:p-10 relative overflow-hidden">
          {/* Header Lines */}
          <div className="text-center border-b-2 border-beige pb-6 mb-8">
            <h4 className="text-xxs font-mono text-rust uppercase tracking-widest font-bold">
              KONGU ENGINEERING COLLEGE &bull; COMPUTER SCIENCE DEPT
            </h4>
            <h2 className="font-serif text-2xl sm:text-3.5xl font-bold text-ink mt-1 tracking-tight">
              Platform Assessment Paper
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xxs font-mono text-olive mt-3">
              <span>Syllabus: <span className="font-semibold text-ink">{topic?.syllabusUnit.split(':')[0]}</span></span>
              <span>&bull;</span>
              <span>Bloom's taxonomy: <span className="font-semibold text-ink uppercase">{bloomLevel}</span></span>
              <span>&bull;</span>
              <span>Questions: <span className="font-semibold text-ink">{questions.length} Items</span></span>
              <span>&bull;</span>
              <span>Allocated Time: <span className="font-semibold text-ink">{Math.max(15, Math.ceil(questions.length * 1.5))} Mins</span></span>
            </div>
          </div>

          {/* Hall Ticket Credentials Registration */}
          <div className="bg-cream/40 border border-beige p-5 rounded-lg mb-8">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-serif text-sm font-bold text-ink flex items-center gap-1.5">
                <FileText className="h-4 w-4 text-rust" />
                Candidate Hall Ticket Registration
              </h3>
              <button
                type="button"
                onClick={onOpenLogin}
                className="text-xxs font-sans font-bold text-rust hover:underline flex items-center gap-1 bg-rust/5 px-2.5 py-1 rounded border border-rust/10"
              >
                <GraduationCap className="h-3.5 w-3.5" />
                {student ? 'Switch Student Account' : 'Student Login Portal'}
              </button>
            </div>

            {showFormError && (
              <div className="bg-rust/5 border border-rust/10 text-rust text-xs p-3 rounded mb-3 flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                <span>Please fill in both Student Name and Roll Number before submission.</span>
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xxs font-sans font-bold text-ink uppercase mb-1 tracking-wider">
                  Student Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full bg-paper border border-beige p-2 rounded text-sm text-ink focus:outline-none focus:ring-1 focus:ring-rust focus:border-rust"
                />
              </div>
              <div>
                <label className="block text-xxs font-sans font-bold text-ink uppercase mb-1 tracking-wider">
                  Student Roll Number *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 24CSE101"
                  value={studentRoll}
                  onChange={(e) => setStudentRoll(e.target.value)}
                  className="w-full bg-paper border border-beige p-2 rounded text-sm text-ink uppercase focus:outline-none focus:ring-1 focus:ring-rust focus:border-rust"
                />
              </div>
            </div>
          </div>

          {/* Course outcomes reference */}
          <div className="text-xxs font-sans text-olive bg-cream/20 p-3 rounded border border-beige/40 mb-8 leading-relaxed">
            <strong>Outcome Alignment:</strong> Automatically verifying <strong>{topic?.learningOutcomes}</strong>. Questions are strictly curated according to our verified formula library.
          </div>

          {/* Question List */}
          <div className="space-y-8 divide-y divide-beige/50">
            {questions.map((q, idx) => {
              const qNum = idx + 1;
              const isMcq = q.qtype === 'mcq';
              return (
                <div key={q.id} className={`pt-8 ${idx === 0 ? 'pt-0 border-t-0' : ''}`}>
                  <div className="flex items-start gap-3">
                    <span className="font-mono text-sm font-bold text-rust shrink-0 mt-0.5">
                      Q{qNum}.
                    </span>
                    <div className="space-y-4 w-full">
                      {/* Question Text */}
                      <p className="font-serif text-sm sm:text-base font-semibold text-ink leading-relaxed">
                        {q.questionText}
                      </p>

                      {/* Options / Inputs */}
                      {isMcq ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                          {q.options.map((opt, oIdx) => {
                            const isChecked = answers[q.id] === opt;
                            return (
                              <label
                                key={oIdx}
                                className={`flex items-start gap-2.5 p-3 rounded-lg border text-xs cursor-pointer transition-colors ${
                                  isChecked
                                    ? 'bg-cream border-terracotta text-ink font-medium shadow-2xs'
                                    : 'bg-paper/50 border-beige/60 text-ink/80 hover:bg-cream/40'
                                }`}
                              >
                                <input
                                  type="radio"
                                  name={`question-${q.id}`}
                                  value={opt}
                                  checked={isChecked}
                                  onChange={() => handleAnswerChange(q.id, opt)}
                                  className="mt-0.5 accent-rust shrink-0"
                                />
                                <span className="leading-tight">{opt}</span>
                              </label>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="mt-2 max-w-md">
                          <label className="block text-xxs font-mono text-olive mb-1 uppercase tracking-wider">
                            Type Short Answer
                          </label>
                          <input
                            type="text"
                            placeholder="Type value (AI verifies units and calculations)"
                            value={answers[q.id] || ''}
                            onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                            className="w-full bg-paper border border-beige p-2.5 rounded text-xs text-ink focus:outline-none focus:ring-1 focus:ring-rust focus:border-rust font-mono"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sticky Submit Bar */}
        <div className="sticky bottom-0 bg-paper/90 backdrop-blur-md border border-beige p-4 rounded-xl shadow-md flex items-center justify-between gap-4">
          <div className="text-left">
            <p className="text-xs font-serif font-bold text-ink">
              Examination Sheet
            </p>
            <p className="text-xxs text-olive">
              {Object.keys(answers).length} of {questions.length} questions answered
            </p>
          </div>
          <button
            type="submit"
            className="bg-rust hover:bg-rust-dark text-paper font-sans font-semibold text-xs sm:text-sm px-6 py-2.5 rounded-lg border border-rust shadow-xs cursor-pointer transition-all hover:shadow"
          >
            Submit Paper for Evaluation
          </button>
        </div>
      </form>
    </div>
  );
}
