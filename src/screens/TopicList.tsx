import React, { useEffect, useState } from 'react';
import { Topic, Subject } from '../types';
import { BookOpen, Calendar, ArrowLeft, ArrowRight, Award, FileSpreadsheet, Layers, Sparkles, Search, Zap, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface TopicListProps {
  subjectId: string;
  onSelectTopic: (id: string) => void;
  onBack: () => void;
}

export default function TopicList({ subjectId, onSelectTopic, onBack }: TopicListProps) {
  const [subject, setSubject] = useState<Subject | null>(null);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'quantitative' | 'logical' | 'verbal' | 'mock'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch subject info
    fetch('/api/subjects')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to retrieve course details');
        return res.json();
      })
      .then((data: Subject[]) => {
        const found = data.find((s) => s.id === subjectId);
        if (found) setSubject(found);
      })
      .catch((err) => console.error(err));

    // Fetch topics
    fetch(`/api/topics?subjectId=${subjectId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to retrieve syllabus chapters');
        return res.json();
      })
      .then((data) => {
        setTopics(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [subjectId]);

  // Filter topics by category and search
  const filteredTopics = topics.filter((t) => {
    if (selectedCategory !== 'all') {
      const topicCategory = t.category || (t.id === 'topic-comprehensive-all' ? 'mock' : 'quantitative');
      if (topicCategory !== selectedCategory) return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      return (
        t.name.toLowerCase().includes(q) ||
        t.summary.toLowerCase().includes(q) ||
        t.syllabusUnit.toLowerCase().includes(q) ||
        (t.speedShortcuts && t.speedShortcuts.some(s => s.title.toLowerCase().includes(q) || (s.method || '').toLowerCase().includes(q)))
      );
    }
    return true;
  });

  const categoryCounts = {
    all: topics.length,
    quantitative: topics.filter(t => (t.category || 'quantitative') === 'quantitative' && t.id !== 'topic-comprehensive-all').length,
    logical: topics.filter(t => t.category === 'logical').length,
    verbal: topics.filter(t => t.category === 'verbal').length,
    mock: topics.filter(t => t.category === 'mock' || t.id === 'topic-comprehensive-all').length,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      {/* Back button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs font-sans font-medium text-olive hover:text-rust mb-6 transition-colors cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Courses
      </button>

      {/* Course Banner */}
      {subject && (
        <div className="paper-sheet rounded-xl p-6 sm:p-8 mb-8 bg-gradient-to-br from-paper via-cream/30 to-amber-50/20 border border-beige shadow-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
            <div>
              <span className="font-mono text-xs font-bold text-rust bg-rust/10 px-3 py-1 rounded-md border border-rust/20">
                {subject.code}
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-ink mt-2 tracking-tight">
                {subject.name}
              </h2>
            </div>
            <div className="text-left sm:text-right font-mono text-xxs sm:text-xs text-olive space-y-1">
              <p>Placement &amp; Competitive Syllabus</p>
              <p className="text-rust font-semibold">⚡ Includes Fast Mental Math Shortcuts</p>
            </div>
          </div>
          <p className="font-sans text-xs sm:text-sm text-ink/80 leading-relaxed max-w-4xl border-t border-beige/60 pt-4">
            {subject.summary}
          </p>
        </div>
      )}

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-6">
        {/* Category filter tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-cream/60 rounded-xl border border-beige">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-ink text-paper shadow-xs'
                : 'text-olive hover:text-ink'
            }`}
          >
            All Modules ({categoryCounts.all})
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('quantitative')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              selectedCategory === 'quantitative'
                ? 'bg-ink text-paper shadow-xs'
                : 'text-olive hover:text-ink'
            }`}
          >
            Quantitative ({categoryCounts.quantitative})
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('logical')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              selectedCategory === 'logical'
                ? 'bg-ink text-paper shadow-xs'
                : 'text-olive hover:text-ink'
            }`}
          >
            Logical Reasoning ({categoryCounts.logical})
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('verbal')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              selectedCategory === 'verbal'
                ? 'bg-ink text-paper shadow-xs'
                : 'text-olive hover:text-ink'
            }`}
          >
            Verbal Ability ({categoryCounts.verbal})
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('mock')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              selectedCategory === 'mock'
                ? 'bg-rust text-paper shadow-xs'
                : 'text-rust hover:bg-rust/5'
            }`}
          >
            Grand Mock ({categoryCounts.mock})
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-olive" />
          <input
            type="text"
            placeholder="Search topic or shortcut..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-paper border border-beige rounded-xl pl-9 pr-3 py-2 text-xs text-ink focus:outline-none focus:border-rust shadow-2xs"
          />
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="h-44 bg-cream/40 border border-beige rounded-xl"></div>
          ))}
        </div>
      ) : error ? (
        <div className="bg-rust/5 border border-rust/20 text-rust p-4 rounded-lg text-center">
          <p className="font-sans text-sm font-semibold">{error}</p>
        </div>
      ) : filteredTopics.length === 0 ? (
        <div className="bg-paper border border-beige rounded-xl p-12 text-center">
          <p className="font-serif text-lg text-ink font-bold">No modules match your search criteria</p>
          <p className="text-xs text-olive mt-1">Try clearing the search query or switching category filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredTopics.map((topic, index) => {
            const isComprehensive = topic.id === 'topic-comprehensive-all';
            const speedCount = topic.speedShortcuts?.length || 0;
            const categoryLabel = topic.category === 'logical' 
              ? 'Logical Reasoning' 
              : topic.category === 'verbal' 
              ? 'Verbal Ability' 
              : topic.category === 'mock' 
              ? 'Placement Mock' 
              : 'Quantitative';

            return (
              <motion.div
                key={topic.id}
                whileHover={{ y: -3 }}
                onClick={() => onSelectTopic(topic.id)}
                className={`paper-sheet rounded-xl p-5 sm:p-6 cursor-pointer flex flex-col justify-between transition-all duration-200 ${
                  isComprehensive
                    ? 'col-span-1 md:col-span-2 border-2 border-rust bg-gradient-to-r from-cream/80 via-paper to-amber-50/40 shadow-sm hover:shadow-md'
                    : 'hover:border-terracotta/40 hover:shadow-md border border-beige'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2.5">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className={`font-sans text-xxs font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm border ${
                        isComprehensive
                          ? 'bg-rust text-paper border-rust'
                          : 'bg-cream text-rust border border-beige'
                      }`}>
                        {categoryLabel}
                      </span>
                      {speedCount > 0 && (
                        <span className="inline-flex items-center gap-1 font-mono text-xxxs font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded border border-amber-300">
                          <Zap className="h-2.5 w-2.5 text-amber-700" />
                          {speedCount} Speed Shortcut{speedCount === 1 ? '' : 's'}
                        </span>
                      )}
                    </div>
                    <span className="font-mono text-xxs text-olive/80">
                      {isComprehensive ? 'Full Mock' : `Unit ${index + 1}`}
                    </span>
                  </div>

                  <h4 className={`font-serif text-lg font-bold tracking-tight ${
                    isComprehensive ? 'text-xl text-rust' : 'text-ink hover:text-rust'
                  } transition-colors`}>
                    {topic.name}
                  </h4>
                  
                  <p className="text-xs text-olive/90 mt-2 line-clamp-2 leading-relaxed">
                    {topic.summary}
                  </p>
                </div>

                {/* Bottom stats block */}
                <div className="flex items-center justify-between border-t border-beige/60 pt-4 mt-4 text-xxs sm:text-xs">
                  <span className="font-sans text-olive truncate max-w-[65%]">
                    {isComprehensive ? 'Full Campus Drive Simulation' : `Formulas: ${topic.formulaCount}`}
                  </span>
                  <span className="inline-flex items-center gap-1 font-sans font-semibold text-rust hover:underline">
                    <span>Study &amp; Test</span>
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
