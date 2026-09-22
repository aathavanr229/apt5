import React, { useState, useEffect } from 'react';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import Home from './screens/Home.tsx';
import TopicList from './screens/TopicList.tsx';
import TopicDetail from './screens/TopicDetail.tsx';
import Quiz from './screens/Quiz.tsx';
import Result from './screens/Result.tsx';
import Admin from './screens/Admin.tsx';
import AuthGateScreen from './screens/AuthGateScreen.tsx';
import LeaderboardScreen from './screens/LeaderboardScreen.tsx';
import SpeedHandbookScreen from './screens/SpeedHandbookScreen.tsx';
import StudentLoginModal, { StudentProfile } from './components/StudentLoginModal.tsx';

type ScreenType = 'home' | 'topics' | 'topic-detail' | 'quiz' | 'result' | 'admin' | 'leaderboard' | 'speed-handbook';

export default function App() {
  const [screen, setScreen] = useState<ScreenType>('home');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [quizOptions, setQuizOptions] = useState<{
    topicId: string;
    bloomLevel: string;
    bloomLevels?: string[];
    sourceMode?: 'ai' | 'bank' | 'hybrid';
    count: number;
  } | null>(null);

  const [activeAttemptId, setActiveAttemptId] = useState<string | null>(null);
  const [activeTestCode, setActiveTestCode] = useState<string | null>(null);

  // Student Authentication State
  const [student, setStudent] = useState<StudentProfile | null>(() => {
    try {
      const saved = localStorage.getItem('aptitude_student');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleStudentLogin = (newStudent: StudentProfile) => {
    setStudent(newStudent);
    try {
      localStorage.setItem('aptitude_student', JSON.stringify(newStudent));
    } catch (e) {
      console.error('Failed to save student profile', e);
    }
  };

  const handleStudentLogout = () => {
    setStudent(null);
    try {
      localStorage.removeItem('aptitude_student');
      localStorage.removeItem('aptitude_token');
    } catch (e) {
      console.error('Failed to clear student profile', e);
    }
  };

  // If user is not logged in, show the full login/signup gate as the very starting screen
  if (!student) {
    return <AuthGateScreen onLoginSuccess={handleStudentLogin} />;
  }

  const handleSelectSubject = (id: string) => {
    setSelectedSubjectId(id);
    setScreen('topics');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTopic = (id: string) => {
    setSelectedTopicId(id);
    setScreen('topic-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGeneratePaper = (options: {
    topicId: string;
    bloomLevel: string;
    bloomLevels?: string[];
    sourceMode?: 'ai' | 'bank' | 'hybrid';
    count: number;
  }) => {
    setQuizOptions(options);
    setScreen('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuizComplete = (attemptId: string, testCode?: string) => {
    setActiveAttemptId(attemptId);
    if (testCode) {
      setActiveTestCode(testCode);
    }
    setScreen('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (targetScreen: string) => {
    setScreen(targetScreen as ScreenType);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render the current active screen
  const renderScreen = () => {
    switch (screen) {
      case 'home':
        return (
          <Home
            onSelectSubject={handleSelectSubject}
            onViewLeaderboard={() => setScreen('leaderboard')}
            onViewHandbook={() => setScreen('speed-handbook')}
            onSelectTopic={handleSelectTopic}
          />
        );
      case 'topics':
        return (
          <TopicList
            subjectId={selectedSubjectId || 'subj-aptitude'}
            onSelectTopic={handleSelectTopic}
            onBack={() => setScreen('home')}
          />
        );
      case 'topic-detail':
        return (
          <TopicDetail
            topicId={selectedTopicId || ''}
            onGeneratePaper={handleGeneratePaper}
            onBack={() => setScreen('topics')}
          />
        );
      case 'quiz':
        return (
          <Quiz
            topicId={quizOptions?.topicId || ''}
            bloomLevel={quizOptions?.bloomLevel || 'Apply'}
            bloomLevels={quizOptions?.bloomLevels || ['Apply']}
            sourceMode={quizOptions?.sourceMode || 'ai'}
            count={quizOptions?.count || 10}
            student={student}
            onQuizComplete={handleQuizComplete}
            onBack={() => setScreen('topic-detail')}
            onOpenLogin={() => setIsLoginModalOpen(true)}
          />
        );

      case 'result':
        return (
          <Result
            attemptId={activeAttemptId || ''}
            onNavigateHome={() => setScreen('home')}
            onTryAnotherTopic={() => setScreen('topics')}
            onViewLeaderboard={() => setScreen('leaderboard')}
          />
        );
      case 'leaderboard':
        return (
          <LeaderboardScreen
            currentStudent={student}
            initialTestCode={activeTestCode || undefined}
            onBack={() => setScreen('home')}
            onSelectTopic={(tId) => {
              setSelectedTopicId(tId);
              setScreen('topic-detail');
            }}
          />
        );
      case 'speed-handbook':
        return (
          <SpeedHandbookScreen
            onBack={() => setScreen('home')}
            onSelectTopic={(tId) => {
              setSelectedTopicId(tId);
              setScreen('topic-detail');
            }}
          />
        );
      case 'admin':
        return <Admin />;
      default:
        return <Home onSelectSubject={handleSelectSubject} onViewHandbook={() => setScreen('speed-handbook')} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div>
        <Header
          currentScreen={screen}
          student={student}
          onNavigate={handleNavigate}
          onOpenStudentLogin={() => setIsLoginModalOpen(true)}
        />
        <main className="flex-grow">{renderScreen()}</main>
      </div>

      <StudentLoginModal
        isOpen={isLoginModalOpen}
        currentStudent={student}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleStudentLogin}
        onLogout={handleStudentLogout}
      />

      <Footer />
    </div>
  );
}

