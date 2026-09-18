import React, { useState } from 'react';
import { 
  HANDBOOK_CHAPTERS, 
  SPEED_HANDBOOK_METADATA, 
  ShortcutChapter 
} from '../data/speedShortcutsData';
import { 
  BookOpen, 
  Zap, 
  CheckCircle2, 
  Eye, 
  EyeOff, 
  ArrowLeft, 
  Search, 
  Calculator, 
  Award, 
  ChevronRight, 
  Sparkles,
  Bookmark,
  Type,
  Maximize2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SpeedHandbookScreenProps {
  onBack: () => void;
  onSelectTopic?: (topicId: string) => void;
}

type TextScale = 'normal' | 'large' | 'xl';

export default function SpeedHandbookScreen({ onBack }: SpeedHandbookScreenProps) {
  const [selectedChapterId, setSelectedChapterId] = useState<string>(HANDBOOK_CHAPTERS[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [textScale, setTextScale] = useState<TextScale>('large');
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [checkedResults, setCheckedResults] = useState<Record<string, boolean>>({});

  const filteredChapters = HANDBOOK_CHAPTERS.filter(ch => 
    ch.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ch.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ch.rule.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ch.writtenFormula.toLowerCase().includes(searchQuery.toLowerCase()) ||
    `chapter ${ch.chapterNumber}`.includes(searchQuery.toLowerCase())
  );

  const activeChapter = HANDBOOK_CHAPTERS.find(c => c.id === selectedChapterId) || HANDBOOK_CHAPTERS[0];

  const toggleReveal = (problemKey: string) => {
    setRevealedAnswers(prev => ({ ...prev, [problemKey]: !prev[problemKey] }));
  };

  const handleCheckAnswer = (problemKey: string, correctAnswer: string) => {
    const input = (userAnswers[problemKey] || '').trim();
    const cleanInput = input.replace(/,/g, '');
    const cleanAnswer = correctAnswer.replace(/,/g, '');
    const isMatch = cleanInput === cleanAnswer || cleanInput.toLowerCase() === cleanAnswer.toLowerCase();
    setCheckedResults(prev => ({ ...prev, [problemKey]: isMatch }));
  };

  // Reading scale typography helpers
  const getRuleTextClass = () => {
    switch (textScale) {
      case 'xl':
        return 'text-lg sm:text-2xl leading-relaxed';
      case 'large':
        return 'text-base sm:text-xl leading-relaxed';
      default:
        return 'text-sm sm:text-base leading-normal';
    }
  };

  const getFormulaTextClass = () => {
    switch (textScale) {
      case 'xl':
        return 'text-2xl sm:text-4xl';
      case 'large':
        return 'text-xl sm:text-3xl';
      default:
        return 'text-lg sm:text-2xl';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 selection:bg-rust selection:text-paper">
      {/* Top Bar with Navigation & Reader Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-beige">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-sans font-medium text-olive hover:text-ink transition-colors cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Courses</span>
        </button>

        {/* Text Scale Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-cream/70 p-1 rounded-lg border border-beige text-xs">
            <span className="text-xxs font-mono text-olive font-bold px-2 flex items-center gap-1">
              <Type className="h-3 w-3" /> Reading Size:
            </span>
            <button
              onClick={() => setTextScale('normal')}
              className={`px-2 py-0.5 rounded text-xs font-semibold cursor-pointer transition-all ${
                textScale === 'normal' ? 'bg-paper text-ink shadow-2xs font-bold' : 'text-olive hover:text-ink'
              }`}
            >
              Default
            </button>
            <button
              onClick={() => setTextScale('large')}
              className={`px-2.5 py-0.5 rounded text-xs font-semibold cursor-pointer transition-all ${
                textScale === 'large' ? 'bg-rust text-paper shadow-2xs font-bold' : 'text-olive hover:text-ink'
              }`}
            >
              Large
            </button>
            <button
              onClick={() => setTextScale('xl')}
              className={`px-2.5 py-0.5 rounded text-xs font-semibold cursor-pointer transition-all ${
                textScale === 'xl' ? 'bg-ink text-paper shadow-2xs font-bold' : 'text-olive hover:text-ink'
              }`}
            >
              Extra Large (XL)
            </button>
          </div>

          <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rust/10 text-rust border border-rust/20">
            <Zap className="h-3.5 w-3.5 fill-rust" />
            15 Master Chapters
          </span>
        </div>
      </div>

      {/* Hero Header Card */}
      <div className="mb-8 rounded-2xl bg-gradient-to-br from-cream/90 via-paper to-amber-50/60 border border-beige p-6 sm:p-8 shadow-xs relative overflow-hidden">
        <div className="max-w-4xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rust text-paper shadow-xs mb-3">
            <Sparkles className="h-3.5 w-3.5 text-amber-200" />
            Speed Mental Calculation Master Handbook
          </div>
          
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-ink tracking-tight leading-tight">
            {SPEED_HANDBOOK_METADATA.title}
          </h1>
          <p className="font-sans text-base sm:text-xl text-rust font-semibold mt-2">
            {SPEED_HANDBOOK_METADATA.subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-y-2 gap-x-4 mt-4 pt-4 border-t border-beige text-xs sm:text-sm text-olive">
            <span className="font-mono bg-cream px-2.5 py-1 rounded border border-beige font-semibold text-ink">
              {SPEED_HANDBOOK_METADATA.edition}
            </span>
            <span className="text-beige hidden sm:inline">•</span>
            <span className="font-mono text-rust font-semibold">{SPEED_HANDBOOK_METADATA.stats}</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Chapter Navigator & Big Reading Board */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Chapter List (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="paper-sheet rounded-xl p-4 border border-beige bg-paper shadow-xs">
            <div className="relative mb-3">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-olive" />
              <input
                type="text"
                placeholder="Search shortcuts, formulas, tricks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-cream/40 border border-beige rounded-lg focus:outline-none focus:ring-1 focus:ring-rust font-sans"
              />
            </div>

            <div className="flex items-center justify-between text-xxs font-mono uppercase tracking-wider text-olive px-1 mb-2 font-bold">
              <span>All 15 Chapters</span>
              <span>{filteredChapters.length} Available</span>
            </div>

            <div className="space-y-2 max-h-[680px] overflow-y-auto pr-1">
              {filteredChapters.map((ch) => {
                const isActive = ch.id === activeChapter.id;
                return (
                  <button
                    key={ch.id}
                    onClick={() => {
                      setSelectedChapterId(ch.id);
                      window.scrollTo({ top: 220, behavior: 'smooth' });
                    }}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all duration-150 cursor-pointer flex items-start gap-3 ${
                      isActive
                        ? 'bg-amber-50/90 border-rust/50 shadow-sm text-ink'
                        : 'bg-paper hover:bg-cream/40 border-beige/80 text-ink/80'
                    }`}
                  >
                    <span className={`h-7 w-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5 ${
                      isActive ? 'bg-rust text-paper shadow-2xs' : 'bg-cream text-olive border border-beige'
                    }`}>
                      {ch.chapterNumber}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h4 className={`font-serif text-sm font-bold truncate ${isActive ? 'text-rust' : 'text-ink'}`}>
                        {ch.title}
                      </h4>
                      <p className="text-xxs font-mono text-rust/80 mt-0.5 truncate">
                        {ch.writtenFormula}
                      </p>
                    </div>
                    {isActive && <ChevronRight className="h-4 w-4 text-rust shrink-0 mt-1" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Mental Calculation Tip */}
          <div className="p-4 rounded-xl border border-amber-300/60 bg-gradient-to-br from-amber-50/50 to-cream/40 text-xs text-olive space-y-2">
            <div className="flex items-center gap-1.5 font-serif font-bold text-ink text-sm">
              <Sparkles className="h-4 w-4 text-amber-600" />
              <span>Speed Strategy Principle</span>
            </div>
            <p className="leading-relaxed">
              Every speed formula converts multi-step arithmetic into instantaneous single-line mental patterns. Review the large formula card above each chapter, follow the written steps, and drill 3 problems mentally every morning.
            </p>
          </div>
        </div>

        {/* Right Column: Big Written Reading Board (8 Cols) */}
        <div className="lg:col-span-8 space-y-8">
          {/* Active Chapter Header */}
          <div className="paper-sheet rounded-2xl p-6 sm:p-8 border border-beige bg-paper shadow-xs">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-md text-xs font-mono font-bold bg-rust text-paper shadow-2xs">
                Chapter {activeChapter.chapterNumber} of 15
              </span>
              <span className="text-xs text-olive font-mono">
                {activeChapter.workedExamples.length} Worked Examples • {activeChapter.practiceProblems.length} Mental Exercises
              </span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-ink tracking-tight">
              {activeChapter.title}
            </h2>
            <p className="font-sans text-sm sm:text-base text-olive mt-2 leading-relaxed">
              {activeChapter.subtitle}
            </p>

            {/* BIG WRITTEN FORMULA BOARD (Slate / Chalkboard Style) */}
            <div className="mt-6 rounded-2xl bg-gradient-to-br from-stone-900 via-zinc-900 to-stone-950 text-paper p-6 sm:p-8 shadow-md border-2 border-stone-800 relative overflow-hidden">
              <div className="flex items-center justify-between gap-2 mb-3 text-xxs uppercase tracking-widest font-mono text-amber-300/90 font-bold border-b border-stone-800 pb-2">
                <span className="flex items-center gap-1.5">
                  <Zap className="h-3.5 w-3.5 fill-amber-300" />
                  Written Master Shortcut Formula
                </span>
                <span className="text-stone-400">Mental Speed Pattern</span>
              </div>

              {/* Big Written Formula Display */}
              <div className="py-2 text-center">
                <div className={`font-mono font-bold text-amber-300 tracking-wide select-all ${getFormulaTextClass()}`}>
                  {activeChapter.writtenFormula}
                </div>

                {/* Visual Written Diagram Pattern */}
                <div className="mt-4 inline-block bg-stone-800/80 rounded-xl px-5 py-2.5 border border-stone-700">
                  <span className="text-xxs uppercase tracking-wider font-mono text-stone-400 block mb-1">
                    Visual Layout Pattern
                  </span>
                  <p className="font-mono text-base sm:text-xl font-bold text-emerald-300 tracking-wider">
                    {activeChapter.visualPattern}
                  </p>
                </div>
              </div>
            </div>

            {/* The Core Written Rule Card (Big Reading Format) */}
            <div className="mt-6 p-5 sm:p-7 rounded-2xl bg-amber-50/70 border-2 border-amber-200/90">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rust mb-2">
                <Bookmark className="h-4 w-4 fill-rust text-rust" />
                <span>The Core Written Rule</span>
              </div>
              <p className={`font-serif text-ink font-medium leading-relaxed ${getRuleTextClass()}`}>
                {activeChapter.rule}
              </p>
            </div>

            {/* Why it works / Mathematical Logic */}
            {activeChapter.whyItWorks && (
              <div className="mt-5 p-5 rounded-xl bg-cream/40 border border-beige">
                <div className="flex items-center gap-1.5 font-serif font-bold text-ink text-sm sm:text-base mb-2">
                  <Calculator className="h-4 w-4 text-olive" />
                  <span>Why This Works (Algebraic Proof &amp; Mathematical Logic)</span>
                </div>
                <div className="font-mono text-xs sm:text-sm text-ink bg-paper p-3.5 rounded-lg border border-beige overflow-x-auto leading-relaxed">
                  {activeChapter.whyItWorks}
                </div>
              </div>
            )}
          </div>

          {/* Worked Examples Section (Big Step-by-Step Lecture Notes) */}
          <div className="paper-sheet rounded-2xl p-6 sm:p-8 border border-beige bg-paper shadow-xs">
            <div className="flex items-center justify-between border-b border-beige pb-4 mb-6">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-ink flex items-center gap-2.5">
                <BookOpen className="h-6 w-6 text-rust" />
                <span>Step-by-Step Worked Solutions</span>
              </h3>
              <span className="text-xs font-mono text-olive">
                Full Mathematical Breakdown
              </span>
            </div>

            <div className="space-y-6">
              {activeChapter.workedExamples.map((ex, idx) => (
                <div 
                  key={idx} 
                  className="p-5 sm:p-6 rounded-2xl border-2 border-beige/90 bg-cream/20 hover:bg-cream/40 transition-all shadow-2xs"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded-md bg-rust/10 text-rust border border-rust/20 font-mono text-xs font-bold">
                      Example #{idx + 1}
                    </span>
                    <h4 className="font-serif text-sm sm:text-base font-bold text-ink">
                      {ex.title}
                    </h4>
                  </div>

                  {/* Big Problem Display */}
                  <div className="my-3 py-2 px-4 bg-paper rounded-xl border border-beige/80 inline-block font-mono text-lg sm:text-2xl font-bold text-rust tracking-wide shadow-2xs">
                    {ex.problem}
                  </div>

                  {/* Big Step List */}
                  <div className="space-y-2.5 my-4">
                    {ex.steps.map((s, sIdx) => (
                      <div key={sIdx} className="flex items-start gap-3 text-xs sm:text-sm text-ink">
                        <span className="h-5 w-5 rounded-full bg-rust text-paper text-xxs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {sIdx + 1}
                        </span>
                        <p className="leading-relaxed font-sans">{s}</p>
                      </div>
                    ))}
                  </div>

                  {/* Big Final Result Callout */}
                  <div className="pt-3 border-t border-beige flex items-center justify-between bg-paper p-3 rounded-xl border border-beige/60">
                    <span className="text-xs uppercase tracking-wider text-olive font-bold font-mono">
                      Calculated Result:
                    </span>
                    <span className="font-mono text-xl sm:text-3xl font-extrabold text-emerald-700">
                      = {ex.result}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mental Calculation Practice Arena */}
          <div className="paper-sheet rounded-2xl p-6 sm:p-8 border border-beige bg-paper shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-beige pb-4 mb-6">
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-ink flex items-center gap-2.5">
                  <Award className="h-6 w-6 text-amber-600" />
                  <span>Mental Calculation Drill</span>
                </h3>
                <p className="text-xs sm:text-sm text-olive mt-1">
                  Test your mental speed without writing on paper. Type your answer and check instantly.
                </p>
              </div>
              <span className="text-xs font-mono text-rust bg-rust/10 border border-rust/20 px-3 py-1 rounded-full self-start sm:self-auto font-bold">
                {activeChapter.practiceProblems.length} Exercises
              </span>
            </div>

            <div className="space-y-4">
              {activeChapter.practiceProblems.map((prob, idx) => {
                const key = `${activeChapter.id}-p-${idx}`;
                const isRevealed = !!revealedAnswers[key];
                const checkStatus = checkedResults[key];

                return (
                  <div 
                    key={idx} 
                    className="p-4 sm:p-5 rounded-xl border border-beige bg-paper hover:border-rust/40 transition-all shadow-2xs"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="h-7 w-7 rounded-lg bg-cream text-olive border border-beige font-mono text-xs flex items-center justify-center font-bold shrink-0">
                          {idx + 1}
                        </span>
                        <div className="font-mono text-base sm:text-xl font-bold text-ink">
                          {prob.question}
                        </div>
                      </div>

                      {/* Interactive Answer Box */}
                      <div className="flex items-center gap-2 self-end sm:self-auto">
                        <input
                          type="text"
                          placeholder="Your answer..."
                          value={userAnswers[key] || ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            setUserAnswers(prev => ({ ...prev, [key]: val }));
                            if (checkedResults[key] !== undefined) {
                              setCheckedResults(prev => {
                                const next = { ...prev };
                                delete next[key];
                                return next;
                              });
                            }
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleCheckAnswer(key, prob.answer);
                            }
                          }}
                          className={`w-32 sm:w-40 px-3 py-1.5 text-sm font-mono font-bold rounded-lg border focus:outline-none ${
                            checkStatus === true
                              ? 'bg-emerald-50 border-emerald-400 text-emerald-900'
                              : checkStatus === false
                              ? 'bg-red-50 border-red-400 text-red-900'
                              : 'bg-cream/40 border-beige text-ink focus:ring-1 focus:ring-rust'
                          }`}
                        />

                        <button
                          onClick={() => handleCheckAnswer(key, prob.answer)}
                          className="px-3 py-1.5 rounded-lg text-xs font-bold bg-rust text-paper hover:bg-rust-dark border border-rust cursor-pointer transition-colors shadow-2xs"
                        >
                          Check
                        </button>

                        <button
                          onClick={() => toggleReveal(key)}
                          className="p-2 text-olive hover:text-ink hover:bg-cream rounded-lg transition-colors cursor-pointer border border-beige"
                          title={isRevealed ? 'Hide Answer' : 'Reveal Solution'}
                        >
                          {isRevealed ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Result Feedback & Solution Reveal */}
                    <AnimatePresence>
                      {(checkStatus !== undefined || isRevealed) && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-3 pt-3 border-t border-beige/80 text-xs sm:text-sm flex flex-wrap items-center justify-between gap-2"
                        >
                          <div>
                            {checkStatus === true && (
                              <span className="text-emerald-700 font-bold inline-flex items-center gap-1.5">
                                <CheckCircle2 className="h-4 w-4" /> Correct! Outstanding mental speed.
                              </span>
                            )}
                            {checkStatus === false && (
                              <span className="text-red-700 font-semibold inline-flex items-center gap-1">
                                Check the carry digits or formula steps again.
                              </span>
                            )}
                            {prob.hint && isRevealed && (
                              <p className="text-olive text-xs mt-0.5">
                                <strong className="text-rust">Hint:</strong> {prob.hint}
                              </p>
                            )}
                          </div>

                          {isRevealed && (
                            <div className="font-mono text-sm sm:text-base font-extrabold text-ink bg-amber-50 px-3 py-1 rounded-lg border border-amber-200">
                              Answer: <span className="text-rust">{prob.answer}</span>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
