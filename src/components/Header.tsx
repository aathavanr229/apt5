import React from 'react';
import { BookOpen, Trophy, FileSpreadsheet, GraduationCap, UserCheck, Zap } from 'lucide-react';
import { StudentProfile } from './StudentLoginModal';

interface HeaderProps {
  currentScreen: string;
  student: StudentProfile | null;
  onNavigate: (screen: string) => void;
  onOpenStudentLogin: () => void;
}

export default function Header({
  currentScreen,
  student,
  onNavigate,
  onOpenStudentLogin,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-paper/95 backdrop-blur-md border-b border-beige shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div 
            onClick={() => onNavigate('home')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="h-10 w-10 rounded-lg bg-terracotta flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-200">
              <span className="font-serif text-xl font-bold text-paper">AF</span>
            </div>
            <div>
              <h1 className="font-serif text-lg sm:text-xl font-bold text-ink tracking-tight">
                Aptitude Forge
              </h1>
              <p className="text-xxs sm:text-xs font-sans text-olive">
                Examination &amp; Assessment Portal
              </p>
            </div>
          </div>

          {/* Navigation Links & Student Login */}
          <nav className="flex items-center gap-1.5 sm:gap-2.5">
            <button
              onClick={() => onNavigate('home')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-sans font-medium transition-colors duration-200 cursor-pointer ${
                currentScreen === 'home' || currentScreen === 'topics' || currentScreen === 'topic-detail' || currentScreen === 'quiz' || currentScreen === 'result'
                  ? 'text-rust bg-cream border border-beige'
                  : 'text-ink/70 hover:text-ink hover:bg-cream/50'
              }`}
            >
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Courses</span>
            </button>

            {/* Speed Shortcuts Handbook */}
            <button
              onClick={() => onNavigate('speed-handbook')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-sans font-medium transition-colors duration-200 cursor-pointer ${
                currentScreen === 'speed-handbook'
                  ? 'text-rust bg-amber-50 border border-amber-300 shadow-xs'
                  : 'text-ink/70 hover:text-ink hover:bg-cream/50'
              }`}
              title="Speed Mental Math & Fast Calculation Handbook (15 Chapters Complete)"
            >
              <Zap className="h-4 w-4 text-amber-600 fill-amber-500/20" />
              <span className="hidden sm:inline">Speed Shortcuts</span>
              <span className="sm:hidden">Shortcuts</span>
            </button>

            {/* Leaderboard & Rankings */}
            <button
              onClick={() => onNavigate('leaderboard')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-sans font-medium transition-colors duration-200 cursor-pointer ${
                currentScreen === 'leaderboard'
                  ? 'text-rust bg-cream border border-beige shadow-xs'
                  : 'text-ink/70 hover:text-ink hover:bg-cream/50'
              }`}
            >
              <Trophy className="h-4 w-4 text-amber-600" />
              <span className="hidden sm:inline">Leaderboard</span>
            </button>

            {/* Student Login Button / Badge */}
            <button
              onClick={onOpenStudentLogin}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs sm:text-sm font-sans font-medium transition-all duration-200 border cursor-pointer ${
                student
                  ? 'bg-amber-50 text-amber-900 border-amber-200/80 hover:bg-amber-100/80 shadow-2xs'
                  : 'bg-rust/10 text-rust border-rust/20 hover:bg-rust hover:text-paper'
              }`}
              title={student ? `Logged in as ${student.name} (${student.roll})` : 'Click to Log in as Student'}
            >
              <GraduationCap className="h-4 w-4 shrink-0 text-rust" />
              {student ? (
                <span className="font-semibold max-w-[120px] sm:max-w-[160px] truncate">
                  {student.name} <span className="font-mono text-xxs opacity-80">({student.roll})</span>
                </span>
              ) : (
                <span>Student Login</span>
              )}
            </button>

            <button
              onClick={() => onNavigate('admin')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-sans font-medium transition-colors duration-200 cursor-pointer ${
                currentScreen === 'admin'
                  ? 'text-rust bg-cream border border-beige shadow-xs'
                  : 'text-ink/70 hover:text-ink hover:bg-cream/50'
              }`}
            >
              <FileSpreadsheet className="h-4 w-4" />
              <span className="hidden md:inline">Faculty Portal</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}

