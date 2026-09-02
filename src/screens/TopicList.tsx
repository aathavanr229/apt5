import React, { useEffect, useState } from 'react';
import { Topic, Subject } from '../types';
import { BookOpen, Calendar, ArrowLeft, ArrowRight, Award, FileSpreadsheet, Layers, Sparkles } from 'lucide-react';
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      {/* Back button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs font-sans font-medium text-olive hover:text-rust mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Courses
      </button>

      {/* Course Banner */}
      {subject && (
        <div className="paper-sheet rounded-xl p-6 sm:p-8 mb-10 bg-gradient-to-br from-paper to-cream/30">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
            <div>
              <span className="font-mono text-xs font-bold text-rust bg-rust/10 px-3 py-1 rounded-md">
                {subject.code}
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-ink mt-2 tracking-tight">
                {subject.name}
              </h2>
            </div>
            <div className="text-left sm:text-right font-mono text-xxs sm:text-xs text-olive">
              <p>Dept: {subject.department}</p>
              <p>Structure: 5 Units &bull; 10 Chapters</p>
            </div>
          </div>
          <p className="font-sans text-xs sm:text-sm text-ink/80 leading-relaxed max-w-4xl border-t border-beige/60 pt-4">
            {subject.summary}
          </p>
        </div>
      )}

      {/* Syllabus Chapters List */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-serif text-lg sm:text-xl font-bold text-ink flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-terracotta" />
          Syllabus Chapters &amp; Units
        </h3>
        <span className="text-xs font-sans text-olive font-medium bg-cream border border-beige px-3 py-1 rounded-md">
          {topics.length} Modules Available
        </span>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="h-40 bg-cream/40 border border-beige rounded-xl"></div>
          ))}
        </div>
      ) : error ? (
        <div className="bg-rust/5 border border-rust/20 text-rust p-4 rounded-lg text-center">
          <p className="font-sans text-sm font-semibold">{error}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {topics.map((topic, index) => {
            const isComprehensive = topic.id === 'topic-comprehensive-all';
            return (
              <motion.div
                key={topic.id}
                whileHover={{ y: -3 }}
                onClick={() => onSelectTopic(topic.id)}
                className={`paper-sheet rounded-xl p-5 sm:p-6 cursor-pointer flex flex-col justify-between transition-all duration-200 ${
                  isComprehensive
                    ? 'col-span-1 md:col-span-2 border-2 border-rust bg-gradient-to-r from-cream/80 via-paper to-amber-50/40 shadow-sm hover:shadow-md'
                    : 'hover:border-terracotta/40 hover:shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <span className={`font-sans text-xxs font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm border ${
                      isComprehensive
                        ? 'bg-rust text-paper border-rust'
                        : 'bg-cream text-rust border border-beige'
                    }`}>
                      {isComprehensive ? 'Grand Placement Paper (All Topics)' : topic.syllabusUnit.split(':')[0]}
                    </span>
                    <span className="font-mono text-xxs text-olive/80">
                      {isComprehensive ? 'Full Syllabus' : `Ch ${index + 1}`}
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
                  <span className="font-sans text-olive truncate max-w-[70%]">
                    {isComprehensive ? 'Multi-Domain Placement & Entrance Simulation' : `Outcomes: ${topic.learningOutcomes.slice(0, 50)}...`}
                  </span>
                  <span className="font-mono font-medium text-rust bg-rust/5 px-2.5 py-1 rounded-md shrink-0 border border-rust/10">
                    {isComprehensive ? 'Up to 100 Questions' : `${topic.formulaCount} formulas`}
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
