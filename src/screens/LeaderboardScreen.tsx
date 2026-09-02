import React, { useState, useEffect } from 'react';
import { LeaderboardEntry, LeaderboardStats, Topic, Subject } from '../types';
import { 
  Trophy, Medal, Award, Search, Filter, RefreshCw, Users, TrendingUp, 
  CheckCircle2, Clock, Mail, Hash, Building2, Download, ArrowLeft,
  Sparkles, PlayCircle, GraduationCap, ChevronRight
} from 'lucide-react';
import { StudentProfile } from '../components/StudentLoginModal';

interface LeaderboardScreenProps {
  currentStudent: StudentProfile | null;
  onBack: () => void;
  onSelectTopic?: (topicId: string) => void;
}

export default function LeaderboardScreen({
  currentStudent,
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
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulationMessage, setSimulationMessage] = useState<string | null>(null);

  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      const url = selectedTopicId && selectedTopicId !== 'all'
        ? `/api/leaderboard?topicId=${selectedTopicId}`
        : '/api/leaderboard';
      
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
  }, [selectedTopicId]);

  // Filter entries based on search query
  const filteredEntries = entries.filter((e) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      e.studentName.toLowerCase().includes(q) ||
      e.studentRoll.toLowerCase().includes(q) ||
      (e.studentEmail && e.studentEmail.toLowerCase().includes(q)) ||
      (e.studentDepartment && e.studentDepartment.toLowerCase().includes(q)) ||
      e.topicName.toLowerCase().includes(q)
    );
  });

  // Export results to CSV
  const handleExportCSV = () => {
    if (filteredEntries.length === 0) return;
    const headers = ['Rank', 'Student Name', 'Roll Number', 'Email', 'Department', 'Topic', 'Bloom Level', 'Score', 'Total', 'Percentage', 'Time (Seconds)', 'Date'];
    const rows = filteredEntries.map(e => [
      e.rank,
      `"${e.studentName}"`,
      `"${e.studentRoll}"`,
      `"${e.studentEmail || ''}"`,
      `"${e.studentDepartment || ''}"`,
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
    link.setAttribute('download', `Aptitude_Leaderboard_${selectedTopicId || 'Overall'}.csv`);
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                Live Examination Leaderboard
              </span>
              <span className="text-xxs font-mono text-olive">
                Rank-Wise Performance Scorecard
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-ink mt-1">
              Assessment Results &amp; Student Rankings
            </h1>
            <p className="text-xs text-olive mt-0.5">
              Comparative cohort rankings across all students who attended assessments (by Roll Number / Email).
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
            <p className="text-xxs text-olive">Active test participants</p>
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

      {/* Top 3 Podium Cards */}
      {topThree.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Medal className="h-4 w-4 text-amber-600" />
            <h2 className="font-serif text-lg font-bold text-ink">Top Ranked Candidates</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topThree.map((entry, index) => {
              const isGold = index === 0;
              const isSilver = index === 1;
              const isBronze = index === 2;

              const badgeColor = isGold 
                ? 'bg-amber-100 text-amber-900 border-amber-300' 
                : isSilver 
                ? 'bg-slate-100 text-slate-800 border-slate-300' 
                : 'bg-orange-100 text-orange-900 border-orange-300';

              const rankText = isGold ? '🥇 Rank 1 - Gold Medalist' : isSilver ? '🥈 Rank 2 - Silver Medalist' : '🥉 Rank 3 - Bronze Medalist';

              const isCurrent = currentStudent && (
                entry.studentRoll.toUpperCase() === currentStudent.roll.toUpperCase() ||
                (currentStudent.email && entry.studentEmail?.toLowerCase() === currentStudent.email.toLowerCase())
              );

              return (
                <div
                  key={entry.attemptId}
                  className={`bg-paper border rounded-xl p-5 shadow-xs transition-all relative overflow-hidden ${
                    isCurrent ? 'ring-2 ring-rust bg-amber-50/20' : 'border-beige'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xxs font-bold uppercase tracking-wider border ${badgeColor}`}>
                      {rankText}
                    </span>
                    <span className="font-serif text-2xl font-bold text-ink">
                      {entry.percentage}%
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-ink truncate">
                    {entry.studentName}
                  </h3>
                  
                  <div className="space-y-1 my-3 text-xs text-olive">
                    <div className="flex items-center gap-1.5">
                      <Hash className="h-3.5 w-3.5 text-rust shrink-0" />
                      <span className="font-mono font-semibold text-ink">{entry.studentRoll}</span>
                      <span className="text-xxs">({entry.studentDepartment})</span>
                    </div>
                    {entry.studentEmail && (
                      <div className="flex items-center gap-1.5 truncate">
                        <Mail className="h-3.5 w-3.5 text-olive shrink-0" />
                        <span className="truncate text-xxs">{entry.studentEmail}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-beige flex items-center justify-between text-xs">
                    <span className="text-olive truncate max-w-[140px]">{entry.topicName}</span>
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

      {/* Filter and Search Bar */}
      <div className="bg-cream/40 border border-beige rounded-xl p-4 mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Topic Filter */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter className="h-4 w-4 text-olive shrink-0" />
          <label className="text-xs font-bold text-ink whitespace-nowrap">Filter Topic:</label>
          <select
            value={selectedTopicId}
            onChange={(e) => setSelectedTopicId(e.target.value)}
            className="bg-paper border border-beige rounded-lg px-3 py-1.5 text-xs text-ink focus:outline-none focus:border-rust cursor-pointer w-full md:w-64"
          >
            <option value="all">All Topics (Overall Leaderboard)</option>
            {topics.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>

        {/* Search Field */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-olive" />
          <input
            type="text"
            placeholder="Search by student name, roll, or email..."
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
              Ranked Assessment Scorecard ({filteredEntries.length} Candidates)
            </h3>
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
            <p className="text-xs font-semibold">Calculating live rankings...</p>
          </div>
        ) : filteredEntries.length === 0 ? (
          <div className="py-16 text-center px-4">
            <Award className="h-10 w-10 text-olive/40 mx-auto mb-2" />
            <h4 className="font-serif text-base font-bold text-ink">No Attempt Records Found</h4>
            <p className="text-xs text-olive max-w-sm mx-auto mt-1">
              No students have submitted assessments for this filter yet. Take a test now to record your score!
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
                  <th className="py-3 px-4">Topic &amp; Bloom Level</th>
                  <th className="py-3 px-4 text-center">Score</th>
                  <th className="py-3 px-4 text-center">Percentage</th>
                  <th className="py-3 px-4 text-center">Time Taken</th>
                  <th className="py-3 px-4 text-right">Attempt Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-beige/70 font-sans">
                {filteredEntries.map((e) => {
                  const isCurrent = currentStudent && (
                    e.studentRoll.toUpperCase() === currentStudent.roll.toUpperCase() ||
                    (currentStudent.email && e.studentEmail?.toLowerCase() === currentStudent.email.toLowerCase())
                  );

                  return (
                    <tr
                      key={e.attemptId}
                      className={`hover:bg-cream/40 transition-colors ${
                        isCurrent ? 'bg-amber-50/50 font-semibold' : ''
                      }`}
                    >
                      {/* Rank Column */}
                      <td className="py-3 px-4 text-center font-serif font-bold">
                        {e.rank === 1 ? (
                          <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-amber-100 text-amber-800 border border-amber-300 text-xs">
                            🥇 1
                          </span>
                        ) : e.rank === 2 ? (
                          <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-slate-100 text-slate-800 border border-slate-300 text-xs">
                            🥈 2
                          </span>
                        ) : e.rank === 3 ? (
                          <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-orange-100 text-orange-800 border border-orange-300 text-xs">
                            🥉 3
                          </span>
                        ) : (
                          <span className="font-mono text-xs text-olive">#{e.rank}</span>
                        )}
                      </td>

                      {/* Student Name & Roll / Email */}
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
                            <div className="flex items-center gap-2 text-xxs text-olive font-mono mt-0.5">
                              <span>{e.studentRoll}</span>
                              {e.studentEmail && (
                                <>
                                  <span>•</span>
                                  <span className="text-ink">{e.studentEmail}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Department */}
                      <td className="py-3 px-4 text-olive">
                        <span className="inline-block max-w-[160px] truncate" title={e.studentDepartment}>
                          {e.studentDepartment || 'General'}
                        </span>
                      </td>

                      {/* Topic & Bloom Level */}
                      <td className="py-3 px-4">
                        <p className="text-ink font-medium">{e.topicName}</p>
                        <span className="text-xxs px-1.5 py-0.5 rounded bg-cream border border-beige text-olive inline-block mt-0.5">
                          {e.bloomLevel || 'Apply'}
                        </span>
                      </td>

                      {/* Raw Score */}
                      <td className="py-3 px-4 text-center font-mono font-bold text-ink">
                        {e.score} / {e.total}
                      </td>

                      {/* Percentage & Progress Bar */}
                      <td className="py-3 px-4 text-center">
                        <div className="inline-flex flex-col items-center">
                          <span className={`font-serif font-bold text-sm ${
                            e.percentage >= 80 ? 'text-emerald-700' : e.percentage >= 50 ? 'text-blue-700' : 'text-rose-700'
                          }`}>
                            {e.percentage}%
                          </span>
                          <div className="w-16 h-1.5 bg-beige/60 rounded-full overflow-hidden mt-1">
                            <div
                              className={`h-full ${
                                e.percentage >= 80 ? 'bg-emerald-600' : e.percentage >= 50 ? 'bg-blue-600' : 'bg-rose-600'
                              }`}
                              style={{ width: `${Math.min(100, e.percentage)}%` }}
                            />
                          </div>
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

      {/* Free Hosting Strategy Guide Card */}
      <div className="mt-10 bg-paper border border-beige rounded-2xl p-6 shadow-xs">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-rust/10 text-rust rounded-xl border border-rust/20 shrink-0">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-ink">
              Hosting Guide: How to Host This Assessment Portal for Free
            </h3>
            <p className="text-xs text-olive mt-1">
              You can deploy this full-stack application (Express + React) at zero cost so all students and faculty can access it simultaneously with live ranking.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="bg-cream/40 border border-beige rounded-xl p-4">
                <p className="font-bold text-ink text-xs mb-1">1. Render.com (Recommended Free Tier)</p>
                <p className="text-xxs text-olive mb-2">
                  Deploy as a Web Service. Free 750 monthly compute hours, automatic Git deployments, free SSL HTTPS certificate.
                </p>
                <code className="text-xxxs bg-paper p-1 rounded border border-beige block font-mono">
                  Build: npm run build<br />
                  Start: npm start
                </code>
              </div>

              <div className="bg-cream/40 border border-beige rounded-xl p-4">
                <p className="font-bold text-ink text-xs mb-1">2. Railway.app / Fly.io</p>
                <p className="text-xxs text-olive mb-2">
                  Provides free starter trial credits with Docker and Node.js support. Supports instant multi-user concurrent tests.
                </p>
                <code className="text-xxxs bg-paper p-1 rounded border border-beige block font-mono">
                  Container Ingress: Port 3000<br />
                  Env: GEMINI_API_KEY
                </code>
              </div>

              <div className="bg-cream/40 border border-beige rounded-xl p-4">
                <p className="font-bold text-ink text-xs mb-1">3. Cloud Run / Vercel + Node</p>
                <p className="text-xxs text-olive mb-2">
                  Google Cloud Run free tier provides 2 million requests/month and scale-to-zero compute at zero cost.
                </p>
                <code className="text-xxxs bg-paper p-1 rounded border border-beige block font-mono">
                  Click 'Deploy to Cloud Run'<br />
                  in the Settings menu
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
