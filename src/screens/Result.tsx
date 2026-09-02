import React, { useEffect, useState } from 'react';
import { Attempt, Topic } from '../types';
import { Award, ArrowRight, RefreshCw, CheckCircle2, XCircle, Home, FileSpreadsheet, ChevronDown, ChevronUp, Sparkles, BookOpen, Check, Trophy } from 'lucide-react';

interface ResultProps {
  attemptId: string;
  onNavigateHome: () => void;
  onTryAnotherTopic: () => void;
  onViewLeaderboard?: () => void;
}

export default function Result({ attemptId, onNavigateHome, onTryAnotherTopic, onViewLeaderboard }: ResultProps) {
  const [attempt, setAttempt] = useState<Attempt | null>(null);
  const [topic, setTopic] = useState<Topic | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Track collapsed questions; by default NONE are collapsed so all explanations show immediately!
  const [collapsedIds, setCollapsedIds] = useState<Record<string, boolean>>({});
  const [allExpanded, setAllExpanded] = useState(true);

  useEffect(() => {
    fetch(`/api/attempts/${attemptId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Attempt details not found');
        return res.json();
      })
      .then((data: Attempt) => {
        setAttempt(data);
        return fetch(`/api/topics/${data.topicId}`);
      })
      .then((res) => res?.json())
      .then((topicData) => {
        setTopic(topicData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [attemptId]);

  const getAccuracyBand = (pct: number) => {
    if (pct >= 85) return { label: 'EXCELLENT', color: 'text-emerald-700 bg-emerald-50 border-emerald-200', note: 'Superb! You demonstrate comprehensive understanding of this chapter\'s mathematical formulas and rules.' };
    if (pct >= 65) return { label: 'GOOD', color: 'text-amber-700 bg-amber-50 border-amber-200', note: 'Great job! Solid application of mathematical rules, with minor gaps in multi-step analysis.' };
    if (pct >= 45) return { label: 'FAIR', color: 'text-rust bg-rust/5 border-rust/20', note: 'Fair understanding. Additional focus on formulas and step-by-step derivation will help improve consistency.' };
    return { label: 'NEEDS PRACTICE', color: 'text-rose-700 bg-rose-50 border-rose-200', note: 'Requires revision. Carefully review the step-by-step formula derivations and retry the assessment.' };
  };

  const toggleCollapse = (qId: string) => {
    setCollapsedIds((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  const handleToggleAll = () => {
    if (allExpanded) {
      // Collapse all
      const newMap: Record<string, boolean> = {};
      attempt?.answers.forEach((ans) => { newMap[ans.questionId] = true; });
      setCollapsedIds(newMap);
      setAllExpanded(false);
    } else {
      // Expand all
      setCollapsedIds({});
      setAllExpanded(true);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center max-w-xl mx-auto px-4 py-16 text-center">
        <Award className="h-10 w-10 text-rust mb-4" />
        <h3 className="font-serif text-xl font-bold text-ink">Compiling Evaluation Results</h3>
        <p className="text-xs text-olive mt-1">Retrieving answers and step-by-step solutions...</p>
      </div>
    );
  }

  if (error || !attempt) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <XCircle className="h-10 w-10 text-rust mx-auto mb-4" />
        <h3 className="font-serif text-xl font-bold text-ink">Scorecard Retrieval Failed</h3>
        <p className="text-xs text-olive leading-relaxed mb-6">{error || 'Data missing'}</p>
        <button
          onClick={onNavigateHome}
          className="px-4 py-2 bg-rust text-paper text-sm font-sans font-semibold rounded-lg cursor-pointer"
        >
          Go back Home
        </button>
      </div>
    );
  }

  const percentage = Math.round((attempt.score / attempt.total) * 100);
  const band = getAccuracyBand(percentage);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      {/* Header Result Card */}
      <div className="paper-sheet rounded-xl p-6 sm:p-8 mb-8 text-center relative overflow-hidden bg-gradient-to-br from-paper to-cream/20 border border-beige shadow-sm">
        <div className="max-w-md mx-auto">
          <div className="inline-flex p-3 bg-cream rounded-full border border-beige shadow-xs mb-4">
            <Award className="h-10 w-10 text-rust" />
          </div>
          
          <h4 className="text-xxs font-mono text-rust uppercase tracking-wider font-bold">
            Assessment Complete
          </h4>
          <h2 className="font-serif text-2xl sm:text-3.5xl font-bold text-ink tracking-tight mt-1">
            Student Scorecard
          </h2>

          {/* Student credentials block */}
          <div className="bg-cream/40 border border-beige rounded-lg p-3 my-4 grid grid-cols-2 text-xxs font-mono text-left text-olive">
            <div>
              <p>Candidate: <span className="text-ink font-semibold">{attempt.studentName}</span></p>
              <p>Roll No: <span className="text-ink font-semibold uppercase">{attempt.studentRoll}</span></p>
            </div>
            <div className="text-right">
              <p>Topic: <span className="text-ink font-semibold">{topic?.name}</span></p>
              <p>Bloom level: <span className="text-ink font-semibold uppercase">{attempt.bloomLevel}</span></p>
            </div>
          </div>

          {/* Score display */}
          <div className="flex items-baseline justify-center gap-2 mt-6">
            <span className="font-serif text-5xl sm:text-6xl font-bold text-rust">{attempt.score}</span>
            <span className="text-2xl text-olive/60">/</span>
            <span className="text-3xl font-serif text-ink font-semibold">{attempt.total}</span>
          </div>
          
          <div className="mt-2">
            <span className="font-mono text-xs font-bold text-olive">
              Accuracy: <span className="text-rust text-sm font-semibold">{percentage}%</span>
            </span>
          </div>

          <div className={`mt-4 px-4 py-2.5 rounded-lg border text-xs font-sans font-bold inline-block ${band.color}`}>
            {band.label}
          </div>

          <p className="text-xs text-olive mt-3 leading-relaxed">
            {band.note}
          </p>
        </div>
      </div>

      {/* Per-question evaluation details Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h3 className="font-serif text-lg sm:text-xl font-bold text-ink">
            Detailed Question Explanations &amp; Step-by-Step Solutions
          </h3>
          <p className="text-xs text-olive">
            Step-by-step formula derivations and correct answers for all {attempt.answers.length} questions.
          </p>
        </div>
        <button
          onClick={handleToggleAll}
          className="self-start sm:self-auto px-3 py-1.5 text-xs font-sans font-semibold text-rust bg-rust/5 hover:bg-rust/10 border border-rust/20 rounded-lg transition-colors cursor-pointer"
        >
          {allExpanded ? 'Collapse All Explanations' : 'Expand All Explanations'}
        </button>
      </div>

      <div className="space-y-6">
        {attempt.answers.map((ans, idx) => {
          const qNum = idx + 1;
          const isCollapsed = collapsedIds[ans.questionId];
          const isExpanded = !isCollapsed;

          return (
            <div 
              key={ans.questionId}
              className={`paper-sheet rounded-xl border p-5 sm:p-6 transition-all shadow-2xs ${
                ans.correct 
                  ? 'border-emerald-200/80 bg-emerald-50/20' 
                  : 'border-rose-200/80 bg-rose-50/20'
              }`}
            >
              {/* Question Bar Header */}
              <div 
                onClick={() => toggleCollapse(ans.questionId)}
                className="flex items-start justify-between gap-4 cursor-pointer group"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0">
                    {ans.correct ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                    ) : (
                      <XCircle className="h-5 w-5 text-rose-600" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xxs font-bold text-rust">
                        Q{qNum}.
                      </span>
                      <span className="font-mono text-xxs text-olive uppercase font-semibold">
                        Type: {ans.qtype}
                      </span>
                      {ans.correct ? (
                        <span className="text-xxs font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded border border-emerald-200">
                          CORRECT (+1)
                        </span>
                      ) : (
                        <span className="text-xxs font-bold text-rose-800 bg-rose-100/80 px-2 py-0.5 rounded border border-rose-200">
                          INCORRECT (0)
                        </span>
                      )}
                    </div>
                    <p className="font-serif text-sm sm:text-base font-semibold text-ink leading-relaxed mt-1.5">
                      {ans.questionText}
                    </p>
                  </div>
                </div>
                <div className="text-olive/60 group-hover:text-ink shrink-0 pt-1">
                  {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </div>
              </div>

              {/* Answers & Step-by-Step Explanation Body */}
              <div className="mt-4 border-t border-beige/60 pt-4 space-y-4">
                {/* Answers Comparison Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className={`p-3 rounded-lg border ${ans.correct ? 'bg-emerald-50/60 border-emerald-200' : 'bg-rose-50/60 border-rose-200'}`}>
                    <span className="font-mono text-xxs text-olive uppercase block mb-1 font-bold">
                      Your Submitted Answer
                    </span>
                    <span className={`font-medium ${ans.correct ? 'text-emerald-900 font-bold' : 'text-rose-900 font-bold'}`}>
                      {ans.userAnswer || <span className="italic font-normal text-olive/60">No Answer Submitted</span>}
                    </span>
                  </div>

                  <div className="bg-emerald-50/80 border border-emerald-200 p-3 rounded-lg">
                    <span className="font-mono text-xxs text-emerald-800 uppercase block mb-1 font-bold flex items-center gap-1">
                      <Check className="h-3 w-3 text-emerald-600" />
                      Correct Approved Answer
                    </span>
                    <span className="text-emerald-950 font-bold font-mono text-sm">
                      {ans.correctAnswer}
                    </span>
                  </div>
                </div>

                {/* Grader equivalence notes */}
                {ans.graderReason && (
                  <div className="bg-beige/30 p-3 rounded-lg text-xxs text-olive border border-beige font-sans leading-relaxed flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-rust shrink-0" />
                    <span>
                      <strong>Evaluation Remark:</strong> {ans.graderReason}
                    </span>
                  </div>
                )}

                {/* Always-Visible / Expandable Explanation Box */}
                {isExpanded && (
                  <div className="bg-paper p-4 sm:p-5 rounded-xl border border-beige/80 text-xs text-ink/90 leading-relaxed shadow-xs animate-fadeIn">
                    <div className="flex items-center gap-2 mb-2 pb-2 border-b border-beige">
                      <BookOpen className="h-4 w-4 text-rust shrink-0" />
                      <h5 className="font-serif font-bold text-ink text-sm">
                        Step-by-Step Solution &amp; Explanation
                      </h5>
                    </div>
                    <div className="whitespace-pre-line text-ink/80 font-sans leading-relaxed text-xs sm:text-sm pt-1">
                      {ans.explanation || 'Refer to the standard formula derivation for this topic.'}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Navigation Buttons */}
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
        {onViewLeaderboard && (
          <button
            onClick={onViewLeaderboard}
            className="w-full sm:w-auto px-6 py-3 bg-amber-600 hover:bg-amber-700 text-paper font-sans font-semibold text-sm rounded-lg border border-amber-600 shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Trophy className="h-4 w-4" />
            View Class Leaderboard &amp; Rankings
          </button>
        )}

        <button
          onClick={onTryAnotherTopic}
          className="w-full sm:w-auto px-6 py-3 bg-rust hover:bg-rust-dark text-paper font-sans font-semibold text-sm rounded-lg border border-rust shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
        >
          <RefreshCw className="h-4 w-4" />
          Test Another Chapter
        </button>

        <button
          onClick={onNavigateHome}
          className="w-full sm:w-auto px-6 py-3 bg-cream hover:bg-beige/40 text-ink font-sans font-medium text-sm rounded-lg border border-beige shadow-2xs transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
        >
          <Home className="h-4 w-4" />
          Back to Courses Home
        </button>
      </div>
    </div>
  );
}

