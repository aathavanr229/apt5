import React, { useEffect, useState } from 'react';
import { Subject } from '../types';
import { GraduationCap, ArrowRight, ShieldCheck, Cpu, Code2, Layers, Binary, Trophy, Users, BookOpen, Library, CheckCircle2, Zap, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface HomeProps {
  onSelectSubject: (id: string) => void;
  onViewLeaderboard?: () => void;
  onViewHandbook?: () => void;
  onSelectTopic?: (topicId: string) => void;
}

export default function Home({ onSelectSubject, onViewLeaderboard, onViewHandbook, onSelectTopic }: HomeProps) {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasApiKey, setHasApiKey] = useState<boolean>(true);

  useEffect(() => {
    // Check API Key configuration status
    fetch('/api/config-status')
      .then((res) => res.json())
      .then((data) => {
        setHasApiKey(!!data.hasApiKey);
      })
      .catch((err) => console.error('Error fetching config status:', err));

    fetch('/api/subjects')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to retrieve courses');
        return res.json();
      })
      .then((data) => {
        setSubjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const getSubjectIcon = (code: string) => {
    switch (code) {
      case 'QA101':
        return <Binary className="h-6 w-6 text-rust" />;
      case 'MA3151':
        return <Cpu className="h-6 w-6 text-olive" />;
      case 'CS3401':
        return <Layers className="h-6 w-6 text-terracotta" />;
      case 'CS3301':
        return <Code2 className="h-6 w-6 text-ink/70" />;
      default:
        return <GraduationCap className="h-6 w-6 text-olive" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Title block */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-ink tracking-tight leading-tight">
          Engineering Assessment &amp; Question Bank Portal
        </h2>
        <p className="font-sans text-sm sm:text-base text-olive mt-4 leading-relaxed">
          Comprehensive curriculum practice, technical question sets, and faculty-moderated examination repository.
        </p>
        
        {/* Core Capabilities */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          <div className="flex items-center gap-2.5 bg-cream/30 p-3 rounded-lg border border-beige/60 text-left">
            <Cpu className="h-5 w-5 text-terracotta shrink-0" />
            <div>
              <h4 className="font-serif text-xs font-bold text-ink">Curriculum Aligned</h4>
              <p className="text-xxs text-olive/80">Structured learning outcomes &amp; formulas</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 bg-cream/30 p-3 rounded-lg border border-beige/60 text-left">
            <Layers className="h-5 w-5 text-olive shrink-0" />
            <div>
              <h4 className="font-serif text-xs font-bold text-ink">Bloom's Taxonomy</h4>
              <p className="text-xxs text-olive/80">6 levels from Recall to Problem Creation</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 bg-cream/30 p-3 rounded-lg border border-beige/60 text-left">
            <ShieldCheck className="h-5 w-5 text-rust shrink-0" />
            <div>
              <h4 className="font-serif text-xs font-bold text-ink">Faculty Moderation</h4>
              <p className="text-xxs text-olive/80">Review, edit, and export to CSV</p>
            </div>
          </div>
        </div>
      </div>

      {/* New Textbook Curated Questions & Grand Comprehensive Mock Highlight */}
      <div className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="paper-sheet rounded-xl p-5 border border-terracotta/30 bg-gradient-to-br from-cream/60 via-paper to-amber-50/30 flex items-start gap-3.5 shadow-2xs">
          <div className="p-2.5 bg-rust/10 text-rust rounded-lg border border-rust/20 shrink-0">
            <Library className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded-full text-xxs font-bold uppercase tracking-wider bg-rust/10 text-rust border border-rust/20">
                Textbook Question Bank
              </span>
              <span className="text-xxs font-mono text-olive">100% Verified</span>
            </div>
            <h4 className="font-serif text-sm font-bold text-ink">
              Direct Placement Textbook Questions
            </h4>
            <p className="text-xs text-olive mt-1 leading-relaxed">
              Solve authentic problems sourced directly from classic textbooks (R.S. Aggarwal, Arun Sharma, and M. Tyra) with detailed step-by-step mathematical proofs.
            </p>
          </div>
        </div>

        <div className="paper-sheet rounded-xl p-5 border border-beige bg-gradient-to-br from-cream/60 via-paper to-cream/30 flex items-start gap-3.5 shadow-2xs">
          <div className="p-2.5 bg-olive/10 text-olive rounded-lg border border-beige shrink-0">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded-full text-xxs font-bold uppercase tracking-wider bg-olive/10 text-olive border border-beige">
                Full Syllabus Mock
              </span>
              <span className="text-xxs font-mono text-rust font-semibold">Up to 100 Questions</span>
            </div>
            <h4 className="font-serif text-sm font-bold text-ink">
              Comprehensive Grand Paper (All Topics Mixed)
            </h4>
            <p className="text-xs text-olive mt-1 leading-relaxed">
              Create an integrated placement paper covering all chapters simultaneously. Configure custom question lengths from 5 up to 100 questions.
            </p>
          </div>
        </div>
      </div>

      {/* Official 100-Question PDF Bank Live Exam Banner */}
      <div className="mb-6 bg-gradient-to-r from-red-950 via-neutral-900 to-amber-950 border-2 border-rust text-paper rounded-2xl p-6 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-44 h-44 bg-rust/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex items-start gap-4 z-10">
          <div className="p-3.5 bg-rust/30 text-amber-300 rounded-xl border border-rust/50 shrink-0">
            <Zap className="h-7 w-7 text-amber-400 fill-amber-400" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-xxs font-bold uppercase tracking-wider bg-rust text-paper border border-rust/30 shadow-2xs">
                🔥 Live Test Module
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xxs font-mono font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                100 Questions PDF Bank
              </span>
              <span className="text-xxs font-mono text-paper/70">
                Official Placement Exam
              </span>
            </div>
            <h3 className="font-serif text-xl font-bold text-paper mt-1.5">
              Problems on Trains — Official 100-Question Assessment Module
            </h3>
            <p className="text-xs text-paper/80 mt-1 leading-relaxed max-w-2xl">
              Strictly draws questions from the verified 10-rule PDF curriculum. Choose any custom question count (5, 10, 20, 50, or full 100) with real-time scoring, live leaderboard ranking, and step-by-step mathematical derivations.
            </p>
          </div>
        </div>

        {onSelectTopic && (
          <button
            onClick={() => onSelectTopic('topic-trains')}
            className="z-10 shrink-0 flex items-center gap-2 px-5 py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs rounded-xl shadow-lg transition-all transform hover:scale-105 cursor-pointer"
          >
            <span>Launch Train Problems Test</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Multi-User Assessment & Live Leaderboard Banner */}
      <div className="mb-6 bg-paper border border-amber-200/80 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-5 bg-gradient-to-r from-amber-50/50 via-paper to-cream/40">
        <div className="flex items-start gap-4">
          <div className="p-3.5 bg-amber-100/80 text-amber-800 rounded-xl border border-amber-300 shrink-0">
            <Trophy className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full text-xxs font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-200">
                Multi-User Live Ranking
              </span>
              <span className="text-xxs font-mono text-olive">
                Classroom Assessment Mode
              </span>
            </div>
            <h3 className="font-serif text-lg font-bold text-ink mt-1">
              Class Leaderboard &amp; Student Rankings
            </h3>
            <p className="text-xs text-olive mt-0.5 leading-relaxed max-w-2xl">
              Anyone with an email or Roll Number can participate. Real-time rank scorecards, score breakdown, time taken, and class averages are calculated automatically.
            </p>
          </div>
        </div>

        {onViewLeaderboard && (
          <button
            onClick={onViewLeaderboard}
            className="shrink-0 flex items-center gap-2 px-4 py-2.5 bg-rust hover:bg-rust-dark text-paper text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            <Trophy className="h-4 w-4 text-amber-300" />
            <span>Open Class Leaderboard</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Speed Math Handbook Banner */}
      <div className="mb-10 bg-gradient-to-br from-cream/80 via-paper to-amber-50/60 border border-rust/30 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div className="flex items-start gap-4">
          <div className="p-3.5 bg-rust/10 text-rust rounded-xl border border-rust/20 shrink-0">
            <Zap className="h-6 w-6 fill-rust/20 text-rust" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 py-0.5 rounded-full text-xxs font-bold uppercase tracking-wider bg-rust text-paper">
                Reference Handbook
              </span>
              <span className="text-xxs font-mono text-olive bg-cream px-2 py-0.5 rounded border border-beige">
                Academic &amp; Campus Placement Edition
              </span>
              <span className="text-xxs font-mono text-rust font-semibold">
                15 Master Chapters • 60+ Worked Solutions
              </span>
            </div>
            <h3 className="font-serif text-lg font-bold text-ink mt-1">
              Speed Mental Math &amp; Calculation Shortcuts Handbook
            </h3>
            <p className="text-xs text-olive mt-0.5 leading-relaxed max-w-2xl">
              Master rapid calculation methods: multiplying by 11, squaring numbers ending in 5, base-100 multiplication, percentage shortcuts, unit conversion, and 60+ worked examples with practice drills.
            </p>
          </div>
        </div>

        {onViewHandbook && (
          <button
            onClick={onViewHandbook}
            className="shrink-0 flex items-center gap-2 px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-paper text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            <Sparkles className="h-4 w-4 text-amber-200" />
            <span>Open Speed Math Handbook</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Courses/Subjects Grid */}
      <h3 className="font-serif text-xl sm:text-2xl font-bold text-ink mb-6 border-b border-beige pb-3">
        Engineering Courses &amp; Modules
      </h3>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-60 bg-cream/40 border border-beige rounded-xl"></div>
          ))}
        </div>
      ) : error ? (
        <div className="bg-rust/5 border border-rust/20 text-rust p-4 rounded-lg text-center">
          <p className="font-sans text-sm font-semibold">{error}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subj) => {
            const isActive = subj.status === 'active';
            return (
              <motion.div
                key={subj.id}
                whileHover={isActive ? { y: -4 } : {}}
                className={`paper-sheet rounded-xl overflow-hidden p-6 flex flex-col justify-between h-64 transition-all duration-200 ${
                  isActive 
                    ? 'cursor-pointer hover:border-terracotta/40 hover:shadow-md' 
                    : 'opacity-75 bg-cream/10 border-beige/40 grayscale-35'
                }`}
                onClick={() => isActive && onSelectSubject(subj.id)}
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-cream rounded-lg border border-beige shadow-2xs">
                      {getSubjectIcon(subj.code)}
                    </div>
                    <span className={`text-xxs font-sans font-semibold px-2 py-0.5 rounded-full border ${
                      isActive 
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                        : 'bg-beige/40 text-olive/80 border-beige/60'
                    }`}>
                      {isActive ? 'ACTIVE MODULE' : 'COMING SOON'}
                    </span>
                  </div>

                  <span className="font-mono text-xxs text-rust tracking-wider font-semibold">
                    {subj.code}
                  </span>
                  <h4 className="font-serif text-lg sm:text-xl font-bold text-ink mt-1 tracking-tight">
                    {subj.name}
                  </h4>
                  <p className="text-xs text-olive/90 mt-2 line-clamp-3 leading-relaxed">
                    {subj.summary}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-beige/60 pt-4 mt-4">
                  <span className="text-xxs font-sans text-olive font-mono">
                    {subj.department}
                  </span>
                  {isActive ? (
                    <div className="flex items-center gap-1 text-xs font-sans font-semibold text-rust group">
                      <span>Open Course</span>
                      <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  ) : (
                    <span className="text-xxs font-sans font-medium text-olive/60">
                      Curriculum in preparation
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
