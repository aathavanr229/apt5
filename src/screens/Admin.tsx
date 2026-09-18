import React, { useEffect, useState } from 'react';
import { Question, Topic, BLOOM_LEVELS } from '../types';
import { ShieldCheck, Check, Trash2, Edit3, Filter, FileSpreadsheet, Download, Search, AlertCircle, X, HelpCircle, Library, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function Admin() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters state
  const [filterTopicId, setFilterTopicId] = useState<string>('all');
  const [filterBloom, setFilterBloom] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all'); // 'all', 'pending', 'approved'

  // Edit Modal State
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [editedText, setEditedText] = useState('');
  const [editedOptions, setEditedOptions] = useState<string[]>(['', '', '', '']);
  const [editedAnswer, setEditedAnswer] = useState('');
  const [editedExplanation, setEditedExplanation] = useState('');
  const [editedBloom, setEditedBloom] = useState('');
  const [importingBooks, setImportingBooks] = useState(false);
  const [importNotice, setImportNotice] = useState<string | null>(null);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('aptitude_token');
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    return headers;
  };

  // Load Textbook Questions into verified pool
  const handleImportBooks = async () => {
    try {
      setImportingBooks(true);
      setImportNotice(null);
      const res = await fetch('/api/books/import-all', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({})
      });
      const data = await res.json();
      if (data.success) {
        setImportNotice(data.message || `Loaded textbook questions into the verified audit pool.`);
        loadData();
      }
    } catch (err: any) {
      console.error('Error importing book questions:', err);
    } finally {
      setImportingBooks(false);
    }
  };

  // Fetch all questions and topics
  const loadData = () => {
    setLoading(true);
    
    // Fetch topics
    fetch('/api/topics')
      .then((res) => res.json())
      .then((topicData) => setTopics(topicData))
      .catch((err) => console.error('Error fetching topics:', err));

    // Fetch questions
    fetch('/api/questions')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to retrieve question pool');
        return res.json();
      })
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filter local question pool
  const filteredQuestions = questions.filter((q) => {
    const matchTopic = filterTopicId === 'all' || q.topicId === filterTopicId;
    const matchBloom = filterBloom === 'all' || q.bloomLevel.toLowerCase() === filterBloom.toLowerCase();
    const matchStatus = 
      filterStatus === 'all' || 
      (filterStatus === 'approved' && q.approved) || 
      (filterStatus === 'pending' && !q.approved);
    return matchTopic && matchBloom && matchStatus;
  });

  // Action handlers
  const handleApprove = async (id: string) => {
    try {
      const res = await fetch(`/api/questions/approve/${id}`, {
        method: 'POST',
        headers: getAuthHeaders(),
      });
      if (!res.ok) throw new Error('Approve action failed');
      
      // Update local state
      setQuestions((prev) =>
        prev.map((q) => (q.id === id ? { ...q, approved: true } : q))
      );
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this question?')) return;
    try {
      const res = await fetch(`/api/questions/delete/${id}`, {
        method: 'POST',
        headers: getAuthHeaders(),
      });
      if (!res.ok) throw new Error('Delete action failed');
      
      // Update local state
      setQuestions((prev) => prev.filter((q) => q.id !== id));
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Open Edit Modal
  const openEditModal = (q: Question) => {
    setEditingQuestion(q);
    setEditedText(q.questionText);
    setEditedOptions(q.options.length === 4 ? [...q.options] : ['', '', '', '']);
    setEditedAnswer(q.correctAnswer);
    setEditedExplanation(q.explanation);
    setEditedBloom(q.bloomLevel);
  };

  const closeEditModal = () => {
    setEditingQuestion(null);
  };

  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingQuestion) return;

    try {
      const payload = {
        questionText: editedText,
        options: editingQuestion.qtype === 'mcq' ? editedOptions : [],
        correctAnswer: editedAnswer,
        explanation: editedExplanation,
        bloomLevel: editedBloom
      };

      const res = await fetch(`/api/questions/edit/${editingQuestion.id}`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('Failed to update question');

      // Update local state
      setQuestions((prev) =>
        prev.map((q) =>
          q.id === editingQuestion.id ? { ...q, ...payload } : q
        )
      );
      closeEditModal();
    } catch (err: any) {
      alert(err.message);
    }
  };

  // CSV Export
  const handleExportCSV = () => {
    if (filteredQuestions.length === 0) {
      alert('No questions match the current filters to export.');
      return;
    }

    const headers = ['Syllabus Unit', 'Topic', 'Bloom Level', 'Type', 'Question Text', 'Options', 'Correct Answer', 'Detailed Explanation', 'Status'];
    const rows = filteredQuestions.map((q) => {
      const topicName = topics.find((t) => t.id === q.topicId)?.name || 'Unknown';
      const optionsStr = q.options.join(' | ');
      return [
        q.syllabusUnit || '',
        topicName,
        q.bloomLevel,
        q.qtype.toUpperCase(),
        q.questionText.replace(/"/g, '""'),
        optionsStr.replace(/"/g, '""'),
        q.correctAnswer.replace(/"/g, '""'),
        q.explanation.replace(/"/g, '""'),
        q.approved ? 'Approved' : 'Pending'
      ];
    });

    // Construct CSV content
    const csvContent = [
      headers.join(','),
      ...rows.map((r) => r.map((field) => `"${field}"`).join(','))
    ].join('\n');

    // Programmatic trigger
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `techgen_questions_${Date.now()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getTopicName = (id: string) => {
    return topics.find((t) => t.id === id)?.name || 'General';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      {/* Faculty header banner */}
      <div className="paper-sheet rounded-xl p-6 sm:p-8 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-rust/10 border border-rust/10 text-rust px-3 py-1 rounded-md mb-2">
            <ShieldCheck className="h-4 w-4" />
            <span className="text-xxs font-sans font-bold uppercase tracking-wider">
              Faculty / Review Portal
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3.5xl font-bold text-ink tracking-tight">
            Technical Assessment Audit Pool
          </h2>
          <p className="text-xs sm:text-sm text-olive mt-1 leading-relaxed">
            Review questions generated on-the-fly, update wording or formulas to match precise standards, and approve them to your verified database.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={handleImportBooks}
            disabled={importingBooks}
            className="bg-paper hover:bg-cream text-rust font-sans font-semibold text-xs py-2.5 px-3.5 rounded-lg border border-rust/40 shadow-2xs hover:shadow flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            title="Import authentic questions from R.S. Aggarwal, Arun Sharma, and M. Tyra for every syllabus topic"
          >
            {importingBooks ? (
              <Loader2 className="h-4 w-4 animate-spin text-rust" />
            ) : (
              <Library className="h-4 w-4 text-rust" />
            )}
            <span>Load Questions from Books</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="bg-rust hover:bg-rust-dark text-paper font-sans font-semibold text-xs py-2.5 px-4 rounded-lg border border-rust shadow-sm hover:shadow flex items-center gap-1.5 shrink-0 cursor-pointer"
          >
            <Download className="h-4 w-4" />
            Export approved CSV
          </button>
        </div>
      </div>

      {importNotice && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>{importNotice}</span>
          </div>
          <button
            onClick={() => setImportNotice(null)}
            className="text-emerald-700 hover:text-emerald-900 font-bold p-1 cursor-pointer"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Filter Toolbar */}
      <div className="bg-cream/40 border border-beige rounded-xl p-4 sm:p-5 mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Topic Filter */}
        <div>
          <label className="block text-xxs font-sans font-bold text-ink uppercase mb-1.5 tracking-wider">
            Filter by Syllabus Topic
          </label>
          <div className="relative">
            <select
              value={filterTopicId}
              onChange={(e) => setFilterTopicId(e.target.value)}
              className="w-full bg-paper border border-beige p-2.5 rounded text-xs text-ink focus:outline-none focus:ring-1 focus:ring-rust focus:border-rust cursor-pointer"
            >
              <option value="all">All Chapter Topics</option>
              {topics.map((t) => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Bloom Filter */}
        <div>
          <label className="block text-xxs font-sans font-bold text-ink uppercase mb-1.5 tracking-wider">
            Filter by Bloom Level
          </label>
          <select
            value={filterBloom}
            onChange={(e) => setFilterBloom(e.target.value)}
            className="w-full bg-paper border border-beige p-2.5 rounded text-xs text-ink focus:outline-none focus:ring-1 focus:ring-rust focus:border-rust cursor-pointer"
          >
            <option value="all">All Cognitive Levels</option>
            {BLOOM_LEVELS.map((lvl) => (
              <option key={lvl} value={lvl}>{lvl}</option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-xxs font-sans font-bold text-ink uppercase mb-1.5 tracking-wider">
            Audit Status
          </label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full bg-paper border border-beige p-2.5 rounded text-xs text-ink focus:outline-none focus:ring-1 focus:ring-rust focus:border-rust cursor-pointer"
          >
            <option value="all">All Draft Statuses</option>
            <option value="pending">Pending Faculty Audit</option>
            <option value="approved">Approved Dataset</option>
          </select>
        </div>
      </div>

      {/* Main Table/Grid */}
      {loading ? (
        <div className="space-y-4 animate-pulse">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-20 bg-cream/30 border border-beige rounded-xl"></div>
          ))}
        </div>
      ) : filteredQuestions.length === 0 ? (
        <div className="bg-paper border border-beige/60 p-12 rounded-xl text-center">
          <AlertCircle className="h-10 w-10 text-olive/50 mx-auto mb-3 animate-pulse" />
          <h4 className="font-serif text-base font-bold text-ink">No questions found</h4>
          <p className="text-xs text-olive/80 mt-1 max-w-sm mx-auto">
            Try adjusting your search criteria, or generate a fresh paper inside the course detail view to populate the pool.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="text-right text-xxs text-olive font-mono">
            Displaying {filteredQuestions.length} of {questions.length} total generated items
          </div>

          <div className="grid grid-cols-1 gap-4">
            {filteredQuestions.map((q) => (
              <div 
                key={q.id}
                className={`paper-sheet rounded-xl p-5 border flex flex-col justify-between gap-4 transition-all ${
                  q.approved ? 'border-emerald-200/50' : 'border-beige'
                }`}
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-beige/40 pb-2 mb-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-sans text-xxs font-bold text-rust bg-cream border border-beige px-2 py-0.5 rounded-sm">
                        {getTopicName(q.topicId)}
                      </span>
                      <span className="font-sans text-xxs font-bold text-olive bg-cream border border-beige px-2 py-0.5 rounded-sm uppercase">
                        {q.bloomLevel}
                      </span>
                      <span className="font-mono text-xxs text-olive bg-cream border border-beige px-2 py-0.5 rounded-sm">
                        {q.qtype.toUpperCase()}
                      </span>
                    </div>

                    <span className={`text-xxs font-mono font-bold px-2.5 py-1 rounded-full ${
                      q.approved 
                        ? 'text-emerald-700 bg-emerald-50 border border-emerald-200/60' 
                        : 'text-amber-700 bg-amber-50 border border-amber-200/60'
                    }`}>
                      {q.approved ? 'APPROVED DATASET' : 'PENDING AUDIT'}
                    </span>
                  </div>

                  <p className="font-serif text-sm sm:text-base font-semibold text-ink leading-relaxed">
                    {q.questionText}
                  </p>

                  {/* Options display if MCQ */}
                  {q.qtype === 'mcq' && q.options.length === 4 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                      {q.options.map((opt, oIdx) => {
                        const isCorrect = opt === q.correctAnswer;
                        return (
                          <div 
                            key={oIdx}
                            className={`p-2 rounded border text-xs flex items-center justify-between ${
                              isCorrect 
                                ? 'bg-emerald-50/50 border-emerald-200 text-emerald-800 font-semibold' 
                                : 'bg-paper/30 border-beige/40 text-ink/80'
                            }`}
                          >
                            <span className="truncate">{opt}</span>
                            {isCorrect && <Check className="h-3.5 w-3.5 shrink-0 text-emerald-600" />}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {q.qtype === 'short' && (
                    <div className="bg-cream/20 p-2.5 rounded border border-beige/40 mt-3 text-xs max-w-sm">
                      <span className="font-mono text-xxs text-olive uppercase block">Correct Answer Key</span>
                      <span className="font-mono font-semibold text-ink">{q.correctAnswer}</span>
                    </div>
                  )}

                  {/* Syllabus outcomes info */}
                  {q.syllabusUnit && (
                    <div className="text-xxs text-olive mt-3 font-sans leading-relaxed italic border-t border-beige/20 pt-2 flex items-center gap-1">
                      <HelpCircle className="h-3.5 w-3.5 shrink-0" />
                      <span>Aligned to: {q.syllabusUnit}</span>
                    </div>
                  )}
                </div>

                {/* Audit Action Buttons */}
                <div className="flex flex-wrap items-center justify-end gap-2 border-t border-beige/40 pt-4 mt-2">
                  <button
                    onClick={() => openEditModal(q)}
                    className="p-1.5 px-3 rounded border border-beige hover:bg-cream text-xs font-sans text-ink flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Edit3 className="h-3.5 w-3.5" />
                    Edit Draft
                  </button>

                  <button
                    onClick={() => handleDelete(q.id)}
                    className="p-1.5 px-3 rounded border border-beige hover:bg-rose-50 hover:text-rose-700 text-xs font-sans text-olive hover:border-rose-200 flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Delete
                  </button>

                  {!q.approved && (
                    <button
                      onClick={() => handleApprove(q.id)}
                      className="p-1.5 px-3 rounded bg-rust hover:bg-rust-dark text-paper text-xs font-sans font-semibold flex items-center gap-1 cursor-pointer transition-colors border border-rust"
                    >
                      <Check className="h-3.5 w-3.5" />
                      Approve &amp; Seed
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Edit Modal (Beautiful craft-paper dialog) */}
      {editingQuestion && (
        <div className="fixed inset-0 z-50 bg-ink/35 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-paper border-2 border-beige shadow-xl rounded-xl max-w-2xl w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto">
            {/* Modal close */}
            <button
              onClick={closeEditModal}
              className="absolute top-4 right-4 text-olive hover:text-ink transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="font-serif text-lg sm:text-xl font-bold text-ink mb-2 border-b border-beige pb-3">
              Edit Technical Question Draft
            </h3>

            <form onSubmit={handleSaveChanges} className="space-y-4 text-xs">
              {/* Question Text */}
              <div>
                <label className="block text-xxs font-sans font-bold text-ink uppercase mb-1 tracking-wider">
                  Question Text Formulation
                </label>
                <textarea
                  required
                  rows={4}
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  className="w-full bg-paper border border-beige p-2.5 rounded text-sm text-ink focus:outline-none focus:ring-1 focus:ring-rust focus:border-rust font-serif leading-relaxed"
                />
              </div>

              {/* Cognitive level selection */}
              <div>
                <label className="block text-xxs font-sans font-bold text-ink uppercase mb-1 tracking-wider">
                  Bloom's Taxonomy Cognitive Classification
                </label>
                <select
                  value={editedBloom}
                  onChange={(e) => setEditedBloom(e.target.value)}
                  className="w-full bg-paper border border-beige p-2 rounded text-xs text-ink focus:outline-none cursor-pointer"
                >
                  {BLOOM_LEVELS.map((lvl) => (
                    <option key={lvl} value={lvl}>{lvl}</option>
                  ))}
                </select>
              </div>

              {/* Options (MCQ Only) */}
              {editingQuestion.qtype === 'mcq' && (
                <div className="space-y-2">
                  <label className="block text-xxs font-sans font-bold text-ink uppercase tracking-wider">
                    MCQ Response Options
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {editedOptions.map((opt, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="font-mono text-xxs text-olive font-bold">({String.fromCharCode(65 + idx)})</span>
                        <input
                          type="text"
                          required
                          value={opt}
                          onChange={(e) => {
                            const updated = [...editedOptions];
                            updated[idx] = e.target.value;
                            setEditedOptions(updated);
                          }}
                          className="w-full bg-paper border border-beige p-2 rounded text-xs text-ink focus:outline-none focus:border-rust"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Correct Answer */}
              <div>
                <label className="block text-xxs font-sans font-bold text-ink uppercase mb-1 tracking-wider">
                  Correct Answer Key
                </label>
                <input
                  type="text"
                  required
                  value={editedAnswer}
                  onChange={(e) => setEditedAnswer(e.target.value)}
                  className="w-full bg-paper border border-beige p-2 rounded text-xs font-mono text-ink focus:outline-none focus:border-rust"
                />
                <p className="text-xxs text-olive mt-1 leading-snug">
                  {editingQuestion.qtype === 'mcq' 
                    ? 'MUST match exactly one of the MCQ response options.' 
                    : 'Numerical or short textual answer. AI verifies units and variants.'}
                </p>
              </div>

              {/* Explanation */}
              <div>
                <label className="block text-xxs font-sans font-bold text-ink uppercase mb-1 tracking-wider">
                  Step-by-Step Explanation Derivation
                </label>
                <textarea
                  required
                  rows={4}
                  value={editedExplanation}
                  onChange={(e) => setEditedExplanation(e.target.value)}
                  className="w-full bg-paper border border-beige p-2.5 rounded text-xs text-ink focus:outline-none focus:ring-1 focus:ring-rust focus:border-rust leading-relaxed font-mono"
                />
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-end gap-2 border-t border-beige pt-4 mt-6">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="px-4 py-2 bg-cream hover:bg-beige/30 border border-beige rounded text-ink text-xs cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-rust hover:bg-rust-dark border border-rust rounded text-paper text-xs font-semibold cursor-pointer transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
