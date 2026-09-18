import React, { useEffect, useState } from 'react';
import { Topic, BLOOM_LEVELS, BloomLevelType, QuestionSourceMode } from '../types';
import { ArrowLeft, Sparkles, BookOpen, GraduationCap, CheckSquare, Square, Layers, Database, Cpu, GitCompare, Library, Sliders, Zap, Lightbulb } from 'lucide-react';

interface TopicDetailProps {
  topicId: string;
  onGeneratePaper: (options: {
    topicId: string;
    bloomLevel: string;
    bloomLevels?: string[];
    sourceMode?: QuestionSourceMode;
    count: number;
  }) => void;
  onBack: () => void;
}

export default function TopicDetail({ topicId, onGeneratePaper, onBack }: TopicDetailProps) {
  const [topic, setTopic] = useState<Topic | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form states
  const [selectedLevels, setSelectedLevels] = useState<BloomLevelType[]>(['Remember', 'Understand', 'Apply', 'Create']);
  const [sourceMode, setSourceMode] = useState<QuestionSourceMode>('ai');
  const [count, setCount] = useState<number>(10);

  useEffect(() => {
    fetch(`/api/topics/${topicId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to retrieve chapter syllabus');
        return res.json();
      })
      .then((data) => {
        setTopic(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [topicId]);

  const toggleBloomLevel = (level: BloomLevelType) => {
    if (selectedLevels.includes(level)) {
      if (selectedLevels.length > 1) {
        setSelectedLevels(selectedLevels.filter((l) => l !== level));
      }
    } else {
      setSelectedLevels([...selectedLevels, level]);
    }
  };

  const selectAllBloomLevels = () => {
    setSelectedLevels([...BLOOM_LEVELS]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back to syllabus button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs font-sans font-medium text-olive hover:text-rust mb-6 transition-colors cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Chapters
      </button>

      {loading ? (
        <div className="space-y-6 animate-pulse">
          <div className="h-28 bg-cream/40 border border-beige rounded-xl"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 h-96 bg-cream/40 border border-beige rounded-xl"></div>
            <div className="h-96 bg-cream/40 border border-beige rounded-xl"></div>
          </div>
        </div>
      ) : error || !topic ? (
        <div className="bg-rust/5 border border-rust/20 text-rust p-4 rounded-lg text-center">
          <p className="font-sans text-sm font-semibold">{error || 'Chapter details not found'}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Chapter Content Left */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title card */}
            <div className="paper-sheet rounded-xl p-6 sm:p-8 border border-beige">
              <span className="font-mono text-xxs font-bold text-rust bg-rust/10 px-2.5 py-1 rounded-md border border-rust/10">
                {topic.syllabusUnit}
              </span>
              <h2 className="font-serif text-2xl sm:text-3.5xl font-bold text-ink mt-3 tracking-tight">
                {topic.name}
              </h2>
              <p className="text-xs sm:text-sm text-olive mt-2 leading-relaxed">
                <strong>Learning Outcomes:</strong> {topic.learningOutcomes}
              </p>
              
              <div className="border-t border-beige/60 mt-6 pt-6">
                <h4 className="font-serif text-sm font-bold text-ink mb-2">Chapter Abstract &amp; Summary</h4>
                <p className="font-sans text-xs sm:text-sm text-ink/80 leading-relaxed">
                  {topic.summary}
                </p>
              </div>
            </div>

            {/* Speed Calculation & Mental Math Shortcuts (Big Written Reading Format) */}
            {(() => {
              const shortcuts = topic.speedShortcuts;
              if (!shortcuts || shortcuts.length === 0) return null;
              return (
                <div className="paper-sheet rounded-2xl p-6 sm:p-8 border-2 border-amber-300/80 bg-gradient-to-br from-paper via-amber-50/30 to-cream/40 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-6 pb-4 border-b border-amber-200">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-amber-100 text-amber-900 rounded-xl border border-amber-300 shadow-2xs">
                        <Zap className="h-5 w-5 text-amber-700 fill-amber-500" />
                      </div>
                      <div>
                        <h3 className="font-serif text-xl sm:text-2xl font-bold text-ink">
                          Fast Mental Math &amp; Speed Shortcuts
                        </h3>
                        <p className="text-xs text-olive mt-0.5">
                          Rapid mental calculation principles to solve questions in seconds
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold bg-amber-100 text-amber-900 px-3 py-1 rounded-full border border-amber-300 shadow-2xs">
                      ⚡ {shortcuts.length} Speed Shortcuts
                    </span>
                  </div>

                  <div className="space-y-6">
                    {shortcuts.map((sc, scIdx) => (
                      <div
                        key={scIdx}
                        className="bg-paper rounded-2xl p-5 sm:p-6 border border-amber-200/90 shadow-2xs hover:border-amber-400 transition-all"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2 border-b border-beige">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-900 px-2.5 py-1 rounded-md border border-amber-300">
                              {sc.method}
                            </span>
                            <h4 className="font-serif text-base sm:text-lg font-bold text-ink">
                              {sc.title}
                            </h4>
                          </div>
                          <span className="text-xxs font-mono text-olive bg-cream px-2.5 py-1 rounded-md border border-beige font-semibold">
                            Shortcut #{scIdx + 1}
                          </span>
                        </div>

                      {/* BIG Written Rule Banner */}
                      <div className="my-3 p-4 rounded-xl bg-amber-50/60 border border-amber-200">
                        <span className="text-xxs font-mono uppercase font-bold text-rust block mb-1">
                          The Written Golden Rule:
                        </span>
                        <p className="font-serif text-sm sm:text-base text-ink font-medium leading-relaxed">
                          {sc.rule}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        {/* Big Worked Example */}
                        <div className="bg-cream/40 rounded-xl p-4 border border-beige flex flex-col justify-between">
                          <span className="text-xxs font-mono uppercase font-bold text-rust flex items-center gap-1.5 mb-2">
                            <Lightbulb className="h-3.5 w-3.5" /> Worked Example
                          </span>
                          <div className="font-mono text-sm sm:text-base font-bold text-ink bg-paper p-3 rounded-lg border border-beige/80 shadow-inner">
                            {sc.example}
                          </div>
                        </div>

                        {/* Mental Math Step */}
                        <div className="bg-amber-50/50 rounded-xl p-4 border border-amber-200/80 flex flex-col justify-between">
                          <span className="text-xxs font-mono uppercase font-bold text-amber-900 flex items-center gap-1.5 mb-2">
                            <Zap className="h-3.5 w-3.5 text-amber-700" /> Mental Calculation Step
                          </span>
                          <div className="text-xs sm:text-sm text-ink/90 bg-paper p-3 rounded-lg border border-amber-200/60 leading-relaxed font-sans">
                            {sc.mentalStep}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}

            {/* Elaborated Topic Comparisons (Similar Understanding Topics) */}
            {topic.comparisons && topic.comparisons.length > 0 && (
              <div className="paper-sheet rounded-xl p-6 sm:p-8 border border-beige/80">
                <h3 className="font-serif text-lg font-bold text-ink mb-2 flex items-center gap-2">
                  <GitCompare className="h-5 w-5 text-rust" />
                  Similar Understanding Topics &amp; Differences
                </h3>
                <p className="text-xs text-olive mb-5">
                  Detailed conceptual comparison between <strong>{topic.name}</strong> and closely related engineering &amp; aptitude modules:
                </p>

                <div className="space-y-6">
                  {topic.comparisons.map((comp, idx) => (
                    <div key={idx} className="bg-cream/30 rounded-xl p-4 sm:p-5 border border-beige">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2 border-b border-beige">
                        <h4 className="font-serif text-sm font-bold text-ink">
                          {topic.name} <span className="text-rust">vs</span> {comp.relatedTopicName || 'Related Concept'}
                        </h4>
                        <span className="text-xxs font-mono bg-paper px-2 py-0.5 rounded border border-beige text-olive">
                          Comparative Analysis #{idx + 1}
                        </span>
                      </div>

                      <div className="space-y-3">
                        {comp.keyDifference && (
                          <div>
                            <span className="text-xxs font-mono uppercase font-bold text-rust">Key Conceptual Difference:</span>
                            <p className="text-xs text-ink/80 mt-0.5 leading-relaxed bg-paper/60 p-2.5 rounded-lg border border-beige/50">
                              {comp.keyDifference}
                            </p>
                          </div>
                        )}

                        {comp.points && comp.points.length > 0 && (
                          <div>
                            <span className="text-xxs font-mono uppercase font-bold text-ink">Feature Comparison Matrix:</span>
                            <div className="mt-1 overflow-x-auto rounded-lg border border-beige">
                              <table className="w-full text-left border-collapse text-xs">
                                <thead>
                                  <tr className="bg-cream border-b border-beige text-ink font-serif font-bold">
                                    <th className="p-2.5">Feature</th>
                                    <th className="p-2.5">{topic.name}</th>
                                    <th className="p-2.5">{comp.relatedTopicName}</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {comp.points.map((pt, pIdx) => (
                                    <tr key={pIdx} className="bg-paper/80 border-b last:border-0 border-beige/50 text-ink/90">
                                      <td className="p-2.5 font-semibold text-olive">{pt.feature}</td>
                                      <td className="p-2.5 leading-relaxed">{pt.topicA}</td>
                                      <td className="p-2.5 leading-relaxed">{pt.topicB}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Formulas List (Big Written Reading Format) */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-ink flex items-center gap-2.5">
                  <BookOpen className="h-6 w-6 text-terracotta" />
                  Key Mathematical Formulas &amp; Laws
                </h3>
                <span className="text-xxs font-mono text-olive uppercase font-bold bg-cream px-2 py-0.5 rounded border border-beige">
                  Written Formulations
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {topic.formulas.map((f, i) => (
                  <div 
                    key={i}
                    className="bg-paper rounded-2xl p-5 border-2 border-beige/90 shadow-2xs hover:border-rust/40 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <h4 className="font-serif text-sm font-bold text-ink">{f.name}</h4>
                        <span className="font-mono text-xxs px-1.5 py-0.5 rounded bg-cream text-olive border border-beige font-semibold">
                          #{i + 1}
                        </span>
                      </div>

                      {/* Big Written Formula Display */}
                      <div className="bg-gradient-to-r from-cream/80 to-amber-50/50 p-3.5 rounded-xl border border-beige font-mono text-sm sm:text-base text-rust font-extrabold overflow-x-auto my-2.5 tracking-wide shadow-2xs text-center">
                        {f.formula}
                      </div>
                    </div>
                    {f.note && (
                      <p className="text-xs text-olive/90 mt-2 border-t border-beige/40 pt-2 font-sans leading-relaxed">
                        <strong className="text-ink font-serif">Note:</strong> {f.note}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Configuration Panel Right */}
          <div>
            <div className="sticky top-20 paper-sheet rounded-xl p-6 sm:p-8 border-terracotta/20 shadow-md border">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-beige">
                <BookOpen className="h-5 w-5 text-rust" />
                <h3 className="font-serif text-lg font-bold text-ink">
                  Assessment Paper Setup
                </h3>
              </div>

              {/* Form elements */}
              <div className="space-y-6">
                {/* Bloom's taxonomy combinations */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-xs font-sans font-bold text-ink uppercase tracking-wider flex items-center gap-1.5">
                      <Layers className="h-3.5 w-3.5 text-rust" />
                      Bloom's Taxonomy Levels
                    </label>
                    <button
                      type="button"
                      onClick={selectAllBloomLevels}
                      className="text-xxs font-bold text-rust hover:underline cursor-pointer"
                    >
                      Select All
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {BLOOM_LEVELS.map((lvl) => {
                      const isChecked = selectedLevels.includes(lvl);
                      return (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => toggleBloomLevel(lvl)}
                          className={`p-2.5 rounded-lg text-xs font-sans font-medium border flex items-center gap-2 transition-all cursor-pointer text-left ${
                            isChecked
                              ? 'bg-rust/10 text-rust border-rust/40 font-bold shadow-2xs'
                              : 'bg-paper text-olive border-beige hover:bg-cream/50'
                          }`}
                        >
                          {isChecked ? (
                            <CheckSquare className="h-4 w-4 text-rust shrink-0" />
                          ) : (
                            <Square className="h-4 w-4 text-olive/40 shrink-0" />
                          )}
                          <span className="truncate">{lvl}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Active selection summary */}
                  <div className="bg-cream/40 p-2.5 rounded-lg border border-beige/70 mt-3 text-xxs font-mono text-ink/80 flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-rust shrink-0" />
                    <span>Selected ({selectedLevels.length}): <strong>{selectedLevels.join(' + ')}</strong></span>
                  </div>
                </div>

                {/* Question Source Mode */}
                <div>
                  <label className="block text-xs font-sans font-bold text-ink mb-2.5 uppercase tracking-wider">
                    Question Source
                  </label>
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={() => setSourceMode('ai')}
                      className={`w-full p-2.5 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                        sourceMode === 'ai'
                          ? 'bg-paper border-rust ring-1 ring-rust shadow-2xs'
                          : 'bg-cream/20 border-beige hover:bg-cream/50'
                      }`}
                    >
                      <Cpu className={`h-4 w-4 shrink-0 ${sourceMode === 'ai' ? 'text-rust' : 'text-olive'}`} />
                      <div>
                        <p className="text-xs font-bold text-ink">Dynamic Curriculum Generation</p>
                        <p className="text-xxs text-olive">Creates fresh formula-backed practice questions</p>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSourceMode('bank')}
                      className={`w-full p-2.5 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                        sourceMode === 'bank'
                          ? 'bg-paper border-rust ring-1 ring-rust shadow-2xs'
                          : 'bg-cream/20 border-beige hover:bg-cream/50'
                      }`}
                    >
                      <Database className={`h-4 w-4 shrink-0 ${sourceMode === 'bank' ? 'text-rust' : 'text-olive'}`} />
                      <div>
                        <p className="text-xs font-bold text-ink">Verified Question Bank</p>
                        <p className="text-xxs text-olive">Pulls from curated faculty-approved question repository</p>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSourceMode('book')}
                      className={`w-full p-2.5 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                        sourceMode === 'book'
                          ? 'bg-paper border-rust ring-1 ring-rust shadow-2xs'
                          : 'bg-cream/20 border-beige hover:bg-cream/50'
                      }`}
                    >
                      <Library className={`h-4 w-4 shrink-0 ${sourceMode === 'book' ? 'text-rust' : 'text-olive'}`} />
                      <div>
                        <p className="text-xs font-bold text-ink">Standard Textbook Questions</p>
                        <p className="text-xxs text-olive">Loads authentic problems from R.S. Aggarwal, Arun Sharma &amp; M. Tyra</p>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSourceMode('hybrid')}
                      className={`w-full p-2.5 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                        sourceMode === 'hybrid'
                          ? 'bg-paper border-rust ring-1 ring-rust shadow-2xs'
                          : 'bg-cream/20 border-beige hover:bg-cream/50'
                      }`}
                    >
                      <Layers className={`h-4 w-4 shrink-0 ${sourceMode === 'hybrid' ? 'text-rust' : 'text-olive'}`} />
                      <div>
                        <p className="text-xs font-bold text-ink">Combined Comprehensive Mode</p>
                        <p className="text-xxs text-olive">Balanced blend of question bank and dynamic problems</p>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Question Count Slider & Quick Presets (Up to 100 max) */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-sans font-bold text-ink uppercase tracking-wider">
                      Question Count (Up to 100)
                    </label>
                    <span className="font-mono text-xs font-bold text-rust bg-rust/5 px-2 py-0.5 rounded border border-rust/10">
                      {count} items
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="5"
                      max="100"
                      step="1"
                      value={count}
                      onChange={(e) => setCount(Number(e.target.value))}
                      className="w-full accent-rust cursor-pointer"
                    />
                    <input
                      type="number"
                      min="5"
                      max="100"
                      value={count}
                      onChange={(e) => {
                        const v = Math.min(Math.max(Number(e.target.value), 5), 100);
                        setCount(v);
                      }}
                      className="w-16 bg-paper border border-beige rounded p-1 font-mono text-xs text-center text-ink focus:outline-none focus:border-rust"
                    />
                  </div>

                  {/* Quick Preset Buttons */}
                  <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
                    <span className="text-xxs font-mono text-olive mr-1">Presets:</span>
                    {[5, 10, 20, 30, 50, 75, 100].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setCount(preset)}
                        className={`text-xxs font-mono px-2 py-0.5 rounded-md border transition-all cursor-pointer ${
                          count === preset
                            ? 'bg-rust text-paper border-rust font-bold shadow-2xs'
                            : 'bg-paper text-olive border-beige hover:bg-cream/60 hover:text-ink'
                        }`}
                      >
                        {preset} Qs
                      </button>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <button
                  type="button"
                  onClick={() => onGeneratePaper({
                    topicId: topic.id,
                    bloomLevel: selectedLevels.join(' + '),
                    bloomLevels: selectedLevels,
                    sourceMode,
                    count
                  })}
                  className="w-full bg-rust hover:bg-rust-dark text-paper font-sans font-semibold text-sm py-3 rounded-lg border border-rust shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <BookOpen className="h-4 w-4" />
                  Generate Assessment Paper
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

