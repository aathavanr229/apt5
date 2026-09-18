import React, { useState, useEffect } from 'react';
import { LeaderboardEntry, LeaderboardStats, Topic, Subject } from '../types';
import { 
  Trophy, Medal, Award, Search, Filter, RefreshCw, Users, TrendingUp, 
  CheckCircle2, Clock, Hash, Download, ArrowLeft, KeyRound, X
} from 'lucide-react';
import { StudentProfile } from '../components/StudentLoginModal';

interface LeaderboardScreenProps {
  currentStudent: StudentProfile | null;
  initialTestCode?: string;
  onBack: () => void;
  onSelectTopic?: (topicId: string) => void;
}

const DEPARTMENTS = [
  'All Departments',
  'Computer Science & Engineering',
  'Information Technology',
  'Electronics & Communication',
  'Electrical & Electronics',
  'Mechanical Engineering',
  'Civil Engineering',
  'Mechatronics Engineering',
  'Chemical Engineering',
  'Artificial Intelligence & Data Science',
  'Artificial Intelligence & Machine Learning',
];

export default function LeaderboardScreen({
  currentStudent,
  initialTestCode,
  onBack,
  onSelectTopic
}: LeaderboardScreenProps) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [stats, setStats] = useState<LeaderboardStats>({
    totalAttended: 0,
    averagePercentage: 0,
    topPercentage: 0,
    passPercentage: 0
  });
  const [topics, setTopics] = useState<Topic[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedTopicId, setSelectedTopicId] = useState<string>('all');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [testCodeFilter, setTestCodeFilter] = useState<string>(initialTestCode || '');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'all' | 'top' | 'mine'>('all');
  const [loading, setLoading] = useState<boolean>(true);

  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedTopicId && selectedTopicId !== 'all') {
        params.set('topicId', selectedTopicId);
      }
      if (selectedDepartment && selectedDepartment !== 'all') {
        params.set('department', selectedDepartment);
      }
      if (testCodeFilter.trim()) {
        params.set('testCode', testCodeFilter.trim().toUpperCase());
      }

      const queryString = params.toString();
      const url = `/api/leaderboard${queryString ? '?' + queryString : ''}`;
      
      const res = await fetch(url);
      const data = await res.json();
      if (res.ok) {
        setEntries(data.entries || []);
        setStats(data.stats || {
          totalAttended: 0,
          averagePercentage: 0,
          topPercentage: 0,
          passPercentage: 0
        });
      }
    } catch (err) {
      console.error('Error loading leaderboard:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch topics and subjects
    fetch('/api/topics')
      .then((res) => res.json())
      .then((data) => setTopics(data))
      .catch((err) => console.error(err));

    fetch('/api/subjects')
      .then((res) => res.json())
      .then((data) => setSubjects(data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    fetchLeaderboard();
  }, [selectedTopicId, selectedDepartment]);

  // Filter entries based on search query and active tab
  const filteredEntries = entries.filter((e: any) => {
    if (
      e.studentRoll?.toLowerCase().includes('demo') ||
      e.studentName?.toLowerCase().includes('demo') ||
      e.attemptId?.toLowerCase().includes('demo') ||
      e.attemptId?.toLowerCase().includes('real-') ||
      (e.testCode && e.testCode.toLowerCase().includes('demo'))
    ) {
      return false;
    }
    if (activeTab === 'top' && e.percentage < 80) return false;
    if (activeTab === 'mine') {
      if (!currentStudent) return false;
      if (e.studentRoll.toUpperCase() !== currentStudent.roll.toUpperCase()) return false;
    }
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      e.studentName.toLowerCase().includes(q) ||
      e.studentRoll.toLowerCase().includes(q) ||
      (e.studentDepartment && e.studentDepartment.toLowerCase().includes(q)) ||
      (e.testCode && e.testCode.toLowerCase().includes(q)) ||
      e.topicName.toLowerCase().includes(q)
    );
  });

  // Export results to CSV
  const handleExportCSV = () => {
    if (filteredEntries.length === 0) return;
    const headers = ['Rank', 'Student Name', 'Roll Number', 'Department', 'Test Code', 'Topic', 'Bloom Level', 'Score', 'Total', 'Percentage', 'Time (Seconds)', 'Date'];
    const rows = filteredEntries.map((e: any) => [
      e.rank,
      `"${e.studentName}"`,
      `"${e.studentRoll}"`,
      `"${e.studentDepartment || ''}"`,
      `"${e.testCode || ''}"`,
      `"${e.topicName}"`,
      `"${e.bloomLevel}"`,
      e.score,
      e.total,
      `${e.percentage}%`,
      e.timeTakenSeconds,
      `"${new Date(e.createdAt).toLocaleDateString()}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Aptitude_Leaderboard_${testCodeFilter || selectedTopicId || 'Overall'}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Helper formatting seconds to min:sec
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s < 10 ? '0' : ''}${s}s`;
  };

  const topThree = filteredEntries.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-beige pb-6 mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 border border-beige rounded-lg hover:bg-cream transition-colors text-ink cursor-pointer"
            title="Back to portal"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xxs font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-200">
                <Trophy className="h-3 w-3 text-amber-700" />
                Examination Leaderboard
              </span>
              <span className="text-xxs font-mono text-olive">
                MongoDB Backed &bull; Multi-User Scorecard
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-ink mt-1">
              Assessment Results &amp; Student Rankings
            </h1>
            <p className="text-xs text-olive mt-0.5">
              Verified test scores recorded directly from student attempts across departments.
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={fetchLeaderboard}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-paper border border-beige hover:bg-cream rounded-lg text-ink transition-colors cursor-pointer"
          >
            <RefreshCw className={`h-3.5 w-3.5 text-rust ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          <button
            onClick={handleExportCSV}
            disabled={filteredEntries.length === 0}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-rust hover:bg-rust-dark text-paper rounded-lg transition-colors shadow-xs cursor-pointer disabled:opacity-50"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export Rank Sheet (CSV)</span>
          </button>
        </div>
      </div>

      {/* Cohort Summary Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-paper border border-beige rounded-xl p-4 shadow-xs flex items-center gap-3">
          <div className="p-3 bg-amber-50 text-amber-700 rounded-lg border border-amber-200">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xxs font-sans uppercase font-bold text-olive">Total Attended</p>
            <p className="text-2xl font-serif font-bold text-ink">{stats.totalAttended}</p>
            <p className="text-xxs text-olive">Registered participants</p>
          </div>
        </div>

        <div className="bg-paper border border-beige rounded-xl p-4 shadow-xs flex items-center gap-3">
          <div className="p-3 bg-blue-50 text-blue-700 rounded-lg border border-blue-200">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xxs font-sans uppercase font-bold text-olive">Class Average</p>
            <p className="text-2xl font-serif font-bold text-ink">{stats.averagePercentage}%</p>
            <p className="text-xxs text-olive">Mean score across cohort</p>
          </div>
        </div>

        <div className="bg-paper border border-beige rounded-xl p-4 shadow-xs flex items-center gap-3">
          <div className="p-3 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-200">
            <Trophy className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xxs font-sans uppercase font-bold text-olive">Top Score</p>
            <p className="text-2xl font-serif font-bold text-ink">{stats.topPercentage}%</p>
            <p className="text-xxs text-olive">Highest secured mark</p>
          </div>
        </div>

        <div className="bg-paper border border-beige rounded-xl p-4 shadow-xs flex items-center gap-3">
          <div className="p-3 bg-purple-50 text-purple-700 rounded-lg border border-purple-200">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xxs font-sans uppercase font-bold text-olive">Pass Rate (≥50%)</p>
            <p className="text-2xl font-serif font-bold text-ink">{stats.passPercentage}%</p>
            <p className="text-xxs text-olive">Met passing criterion</p>
          </div>
        </div>
      </div>

      {/* Top Ranked Assessment Results */}
      {topThree.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <h2 className="font-serif text-lg font-bold text-ink">Benchmark Assessment Results</h2>
              <span className="text-xxs font-mono bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">
                Verified Candidate Records
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topThree.map((entry: any, index) => {
              const rankLabel = index === 0 ? 'Rank #1 • Top Performer' : index === 1 ? 'Rank #2 • High Distinction' : 'Rank #3 • Distinction';
              const rankBadgeStyle = index === 0 
                ? 'bg-emerald-100 text-emerald-900 border-emerald-300' 
                : index === 1 
                ? 'bg-blue-100 text-blue-900 border-blue-300' 
                : 'bg-amber-100 text-amber-900 border-amber-300';

              const isCurrent = currentStudent && (
                entry.studentRoll.toUpperCase() === currentStudent.roll.toUpperCase()
              );

              return (
                <div
                  key={entry.attemptId}
                  className={`bg-paper border rounded-xl p-5 shadow-xs transition-all relative overflow-hidden ${
                    isCurrent ? 'ring-2 ring-rust bg-amber-50/20' : 'border-beige'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xxs font-bold uppercase tracking-wider border ${rankBadgeStyle}`}>
                      {rankLabel}
                    </span>
                    <div className="text-right">
                      <span className="font-serif text-2xl font-bold text-ink">
                        {entry.percentage}%
                      </span>
                      <span className="block text-xxs text-olive font-mono">
                        {entry.score} / {entry.total} marks
                      </span>
                    </div>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-ink truncate">
                    {entry.studentName}
                  </h3>
                  
                  <div className="space-y-1.5 my-3 text-xs text-olive">
                    <div className="flex items-center gap-1.5">
                      <Hash className="h-3.5 w-3.5 text-rust shrink-0" />
                      <span className="font-mono font-semibold text-ink">{entry.studentRoll}</span>
                      <span className="text-xxs px-1.5 py-0.5 rounded bg-cream border border-beige/60 text-olive">
                        {entry.studentDepartment}
                      </span>
                    </div>
                    {entry.testCode && (
                      <div className="flex items-center gap-1.5 font-mono text-xxs text-rust">
                        <KeyRound className="h-3 w-3 shrink-0" />
                        <span>Test Code: <strong>{entry.testCode}</strong></span>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-beige flex items-center justify-between text-xs">
                    <span className="text-olive truncate max-w-[140px]" title={entry.topicName}>
                      {entry.topicName}
                    </span>
                    <div className="flex items-center gap-1 text-ink font-mono font-semibold">
                      <Clock className="h-3.5 w-3.5 text-olive" />
                      <span>{formatTime(entry.timeTakenSeconds)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Results View Tabs Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-beige mb-4 pb-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'all'
                ? 'bg-ink text-paper shadow-xs'
                : 'bg-paper text-olive hover:text-ink border border-beige'
            }`}
          >
            All Results ({entries.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('top')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'top'
                ? 'bg-ink text-paper shadow-xs'
                : 'bg-paper text-olive hover:text-ink border border-beige'
            }`}
          >
            Top Ranked (≥80%)
          </button>
          {currentStudent && (
            <button
              type="button"
              onClick={() => setActiveTab('mine')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'mine'
                  ? 'bg-rust text-paper shadow-xs'
                  : 'bg-paper text-rust hover:bg-rust/5 border border-rust/30'
              }`}
            >
              My Submissions
            </button>
          )}
        </div>
        <span className="text-xxs font-mono text-olive hidden sm:inline">
          Showing {filteredEntries.length} verified attempt{filteredEntries.length === 1 ? '' : 's'}
        </span>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-cream/40 border border-beige rounded-xl p-4 mb-6 flex flex-col lg:flex-row items-center justify-between gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full lg:w-auto">
          {/* Topic Filter */}
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-olive shrink-0" />
            <select
              value={selectedTopicId}
              onChange={(e) => setSelectedTopicId(e.target.value)}
              className="bg-paper border border-beige rounded-lg px-3 py-1.5 text-xs text-ink focus:outline-none focus:border-rust cursor-pointer w-full"
            >
              <option value="all">All Topics</option>
              {topics.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          {/* Department Filter */}
          <div className="flex items-center gap-2">
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="bg-paper border border-beige rounded-lg px-3 py-1.5 text-xs text-ink focus:outline-none focus:border-rust cursor-pointer w-full"
            >
              <option value="all">All Departments</option>
              {DEPARTMENTS.slice(1).map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Test Code Specific Filter */}
          <div className="relative">
            <input
              type="text"
              placeholder="Filter by Test Code..."
              value={testCodeFilter}
              onChange={(e) => setTestCodeFilter(e.target.value.toUpperCase())}
              onKeyDown={(e) => e.key === 'Enter' && fetchLeaderboard()}
              className="w-full bg-paper border border-beige rounded-lg pl-3 pr-8 py-1.5 text-xs font-mono text-ink uppercase focus:outline-none focus:border-rust"
            />
            {testCodeFilter ? (
              <button
                type="button"
                onClick={() => { setTestCodeFilter(''); setTimeout(fetchLeaderboard, 50); }}
                className="absolute right-2 top-2 text-olive hover:text-ink cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={fetchLeaderboard}
                title="Apply test code filter"
                className="absolute right-2 top-2 text-rust cursor-pointer"
              >
                <KeyRound className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Search Field */}
        <div className="relative w-full lg:w-72">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-olive" />
          <input
            type="text"
            placeholder="Search by student name or roll..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-paper border border-beige rounded-lg pl-9 pr-3 py-1.5 text-xs text-ink focus:outline-none focus:border-rust"
          />
        </div>
      </div>

      {/* Full Leaderboard Table */}
      <div className="bg-paper border border-beige rounded-xl overflow-hidden shadow-xs">
        <div className="px-6 py-4 border-b border-beige flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-rust" />
            <h3 className="font-serif text-base font-bold text-ink">
              Ranked Assessment Scorecard ({filteredEntries.length} Records)
            </h3>
            {testCodeFilter && (
              <span className="text-xxs font-mono bg-rust/10 text-rust font-bold px-2 py-0.5 rounded border border-rust/20">
                Code: {testCodeFilter}
              </span>
            )}
          </div>
          {currentStudent && (
            <span className="text-xxs font-mono text-olive">
              Logged in as: <strong className="text-ink">{currentStudent.name}</strong> ({currentStudent.roll})
            </span>
          )}
        </div>

        {loading ? (
          <div className="py-16 text-center text-olive">
            <RefreshCw className="h-6 w-6 animate-spin mx-auto text-rust mb-2" />
            <p className="text-xs font-semibold">Retrieving cohort rankings from database...</p>
          </div>
        ) : filteredEntries.length === 0 ? (
          <div className="py-16 text-center px-4">
            <Award className="h-10 w-10 text-olive/40 mx-auto mb-2" />
            <h4 className="font-serif text-base font-bold text-ink">
              No attempts have been submitted for this test yet.
            </h4>
            <p className="text-xs text-olive max-w-sm mx-auto mt-1">
              Be the first student to take this assessment and set the benchmark on the leaderboard!
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-cream/60 border-b border-beige text-olive uppercase tracking-wider font-mono text-xxs">
                <tr>
                  <th className="py-3 px-4 w-16 text-center">Rank</th>
                  <th className="py-3 px-4">Student &amp; Identification</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4">Test Code / Topic</th>
                  <th className="py-3 px-4 text-center">Score</th>
                  <th className="py-3 px-4 text-center">Percentage</th>
                  <th className="py-3 px-4 text-center">Time Taken</th>
                  <th className="py-3 px-4 text-right">Attempt Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-beige/70 font-sans">
                {filteredEntries.map((e: any) => {
                  const isCurrent = currentStudent && (
                    e.studentRoll.toUpperCase() === currentStudent.roll.toUpperCase()
                  );

                  return (
                    <tr
                      key={e.attemptId}
                      className={`hover:bg-cream/40 transition-colors ${
                        isCurrent ? 'bg-amber-50/50 font-semibold' : ''
                      }`}
                    >
                      {/* Rank Column */}
                      <td className="py-3 px-4 text-center font-bold">
                        {e.rank === 1 ? (
                          <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-mono font-bold shadow-xs">
                            1
                          </span>
                        ) : e.rank === 2 ? (
                          <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-900 border border-blue-300 text-xs font-mono font-bold shadow-xs">
                            2
                          </span>
                        ) : e.rank === 3 ? (
                          <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-mono font-bold shadow-xs">
                            3
                          </span>
                        ) : (
                          <span className="font-mono text-xs text-olive font-semibold">#{e.rank}</span>
                        )}
                      </td>

                      {/* Student Name & Roll */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div>
                            <p className="font-bold text-ink flex items-center gap-1.5">
                              {e.studentName}
                              {isCurrent && (
                                <span className="text-xxxs px-1.5 py-0.5 rounded bg-rust text-paper font-mono">
                                  YOU
                                </span>
                              )}
                            </p>
                            <span className="text-xxs text-olive font-mono">{e.studentRoll}</span>
                          </div>
                        </div>
                      </td>

                      {/* Department */}
                      <td className="py-3 px-4 text-olive">
                        <span className="inline-block max-w-[160px] truncate" title={e.studentDepartment}>
                          {e.studentDepartment || 'General'}
                        </span>
                      </td>

                      {/* Test Code & Topic */}
                      <td className="py-3 px-4">
                        <p className="text-ink font-medium">{e.topicName}</p>
                        {e.testCode && (
                          <span className="text-xxxs font-mono px-1.5 py-0.5 rounded bg-cream border border-beige text-rust font-semibold inline-block mt-0.5">
                            {e.testCode}
                          </span>
                        )}
                      </td>

                      {/* Raw Score */}
                      <td className="py-3 px-4 text-center font-mono font-bold text-ink">
                        {e.score} / {e.total}
                      </td>

                      {/* Percentage & Status Badge */}
                      <td className="py-3 px-4 text-center">
                        <div className="inline-flex flex-col items-center">
                          <span className={`font-serif font-bold text-sm ${
                            e.percentage >= 80 ? 'text-emerald-700' : e.percentage >= 50 ? 'text-blue-700' : 'text-rose-700'
                          }`}>
                            {e.percentage}%
                          </span>
                          <span className={`text-xxxs font-mono px-1.5 py-0.5 rounded font-semibold mt-0.5 border ${
                            e.percentage >= 85
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              : e.percentage >= 50
                              ? 'bg-blue-50 text-blue-800 border-blue-200'
                              : 'bg-rose-50 text-rose-800 border-rose-200'
                          }`}>
                            {e.percentage >= 85 ? 'Distinction' : e.percentage >= 50 ? 'Qualified' : 'Needs Review'}
                          </span>
                        </div>
                      </td>

                      {/* Time Taken */}
                      <td className="py-3 px-4 text-center font-mono text-olive">
                        {formatTime(e.timeTakenSeconds)}
                      </td>

                      {/* Date */}
                      <td className="py-3 px-4 text-right text-xxs text-olive font-mono">
                        {new Date(e.createdAt).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
