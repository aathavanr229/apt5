import React, { useState } from 'react';
import { StudentProfile } from '../components/StudentLoginModal.tsx';
import { LogIn, UserPlus, GraduationCap, ShieldCheck, AlertCircle, BookOpen, KeyRound, User, Hash, Building2, Mail, Users } from 'lucide-react';

interface AuthGateScreenProps {
  onLoginSuccess: (student: StudentProfile) => void;
}

export default function AuthGateScreen({ onLoginSuccess }: AuthGateScreenProps) {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [name, setName] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [email, setEmail] = useState('');
  const [roll, setRoll] = useState('');
  const [department, setDepartment] = useState('Computer Science & Engineering');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      if (mode === 'login') {
        if (!identifier.trim() || !password.trim()) {
          setError('Please enter your Roll Number or Email Address and Password.');
          setLoading(false);
          return;
        }

        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            identifier: identifier.trim(),
            password: password.trim()
          })
        });

        const data = await res.json();
        if (!res.ok || !data.success) {
          setError(data.error || 'Authentication failed. Please verify your credentials.');
          setLoading(false);
          return;
        }

        const profile: StudentProfile = {
          name: data.user.name,
          roll: data.user.roll,
          email: data.user.email,
          department: data.user.department
        };

        onLoginSuccess(profile);
      } else {
        // Sign Up
        if (!name.trim() || !roll.trim() || !password.trim()) {
          setError('Full Name, Roll Number, and Password are required to create your account.');
          setLoading(false);
          return;
        }

        const res = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: name.trim(),
            roll: roll.trim(),
            email: email.trim() || `${roll.trim().toLowerCase()}@kongu.edu`,
            department,
            password: password.trim()
          })
        });

        const data = await res.json();
        if (!res.ok || !data.success) {
          setError(data.error || 'Account creation failed.');
          setLoading(false);
          return;
        }

        const profile: StudentProfile = {
          name: data.user.name,
          roll: data.user.roll,
          email: data.user.email,
          department: data.user.department
        };

        setSuccessMsg('Account created successfully! Logging you into the portal...');
        setTimeout(() => {
          onLoginSuccess(profile);
        }, 600);
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected network error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoFill = (demoId: string, demoPassword = 'password123') => {
    setMode('login');
    setIdentifier(demoId);
    setPassword(demoPassword);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-paper flex flex-col justify-between selection:bg-rust selection:text-paper">
      {/* Top institution bar */}
      <header className="border-b border-beige/80 bg-paper py-4 px-6 sm:px-12 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 bg-rust rounded-lg flex items-center justify-center text-paper font-serif font-bold text-lg shadow-xs">
            AF
          </div>
          <div>
            <h1 className="font-serif text-base sm:text-lg font-bold text-ink tracking-tight">
              Aptitude Forge
            </h1>
            <p className="text-xxs font-sans text-olive">
              Examination, Assessment &amp; Live Ranking Portal
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-sans text-olive">
          <Users className="h-4 w-4 text-rust" />
          <span className="hidden sm:inline">Universal Multi-User Access (Email / Roll No)</span>
        </div>
      </header>

      {/* Main Authentication Card */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md bg-paper border border-beige/90 rounded-2xl p-6 sm:p-8 shadow-md">
          {/* Card Header */}
          <div className="text-center mb-6">
            <div className="inline-flex p-3 bg-rust/10 text-rust rounded-xl border border-rust/15 mb-3">
              <GraduationCap className="h-7 w-7" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-ink">
              {mode === 'login' ? 'Student Sign In' : 'Create Student Account'}
            </h2>
            <p className="text-xs text-olive mt-1">
              {mode === 'login' 
                ? 'Sign in with your Email Address or Roll Number to take tests and view class rankings' 
                : 'Anyone can register with an email or roll number to participate in tests and leaderboard'}
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex bg-cream/70 p-1 rounded-xl border border-beige mb-5">
            <button
              type="button"
              onClick={() => { setMode('login'); setError(null); setSuccessMsg(null); }}
              className={`flex-1 py-2 text-xs font-sans font-bold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                mode === 'login'
                  ? 'bg-paper text-ink shadow-xs border border-beige'
                  : 'text-olive hover:text-ink'
              }`}
            >
              <LogIn className="h-4 w-4 text-rust" />
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setMode('signup'); setError(null); setSuccessMsg(null); }}
              className={`flex-1 py-2 text-xs font-sans font-bold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                mode === 'signup'
                  ? 'bg-paper text-ink shadow-xs border border-beige'
                  : 'text-olive hover:text-ink'
              }`}
            >
              <UserPlus className="h-4 w-4 text-rust" />
              Sign Up
            </button>
          </div>

          {/* Feedback messages */}
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl mb-4 flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold">{error}</p>
                {error.includes('Sign Up') && mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => { setMode('signup'); setError(null); }}
                    className="text-xxs text-rust hover:underline font-bold mt-1 inline-block"
                  >
                    Click here to register your student account now →
                  </button>
                )}
              </div>
            </div>
          )}

          {successMsg && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl mb-4 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
              <span className="font-semibold">{successMsg}</span>
            </div>
          )}

          {/* Auth Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-sans font-bold text-ink mb-1 uppercase tracking-wider">
                  Full Name <span className="text-rust">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-4 w-4 text-olive" />
                  <input
                    type="text"
                    placeholder="e.g. Aathavan R"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-paper border border-beige rounded-lg pl-9 pr-3 py-2 text-sm text-ink focus:outline-none focus:border-rust"
                    required={mode === 'signup'}
                  />
                </div>
              </div>
            )}

            {mode === 'login' ? (
              <div>
                <label className="block text-xs font-sans font-bold text-ink mb-1 uppercase tracking-wider">
                  Email Address or Roll Number <span className="text-rust">*</span>
                </label>
                <div className="relative">
                  <Hash className="absolute left-3 top-2.5 h-4 w-4 text-olive" />
                  <input
                    type="text"
                    placeholder="e.g. 24CSE101 or student@kongu.edu"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="w-full bg-paper border border-beige rounded-lg pl-9 pr-3 py-2 font-mono text-sm text-ink focus:outline-none focus:border-rust"
                    required
                  />
                </div>
                <p className="text-xxxs text-olive mt-1">
                  You can sign in using your college Roll Number or registered Email.
                </p>
              </div>
            ) : (
              <>
                <div>
                  <label className="block text-xs font-sans font-bold text-ink mb-1 uppercase tracking-wider">
                    Roll / Registration Number <span className="text-rust">*</span>
                  </label>
                  <div className="relative">
                    <Hash className="absolute left-3 top-2.5 h-4 w-4 text-olive" />
                    <input
                      type="text"
                      placeholder="e.g. 24CSE101"
                      value={roll}
                      onChange={(e) => setRoll(e.target.value)}
                      className="w-full bg-paper border border-beige rounded-lg pl-9 pr-3 py-2 font-mono text-sm text-ink uppercase focus:outline-none focus:border-rust"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-sans font-bold text-ink mb-1 uppercase tracking-wider">
                    Email Address (Optional)
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-olive" />
                    <input
                      type="email"
                      placeholder="e.g. student@kongu.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-paper border border-beige rounded-lg pl-9 pr-3 py-2 text-sm text-ink focus:outline-none focus:border-rust"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-sans font-bold text-ink mb-1 uppercase tracking-wider">
                    Department
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-2.5 h-4 w-4 text-olive" />
                    <select
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full bg-paper border border-beige rounded-lg pl-9 pr-3 py-2 text-xs text-ink focus:outline-none focus:border-rust cursor-pointer"
                    >
                      <option value="Computer Science & Engineering">Computer Science &amp; Engineering</option>
                      <option value="Electronics & Communication">Electronics &amp; Communication</option>
                      <option value="Electrical & Electronics">Electrical &amp; Electronics</option>
                      <option value="Mechanical Engineering">Mechanical Engineering</option>
                      <option value="Information Technology">Information Technology</option>
                      <option value="Civil Engineering">Civil Engineering</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-sans font-bold text-ink mb-1 uppercase tracking-wider">
                Password <span className="text-rust">*</span>
              </label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-2.5 h-4 w-4 text-olive" />
                <input
                  type="password"
                  placeholder="Enter your security password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-paper border border-beige rounded-lg pl-9 pr-3 py-2 text-sm text-ink focus:outline-none focus:border-rust"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-rust hover:bg-rust-dark disabled:opacity-50 text-paper font-sans font-semibold text-sm py-3 rounded-lg border border-rust shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer mt-3"
            >
              {loading ? (
                <span>Processing...</span>
              ) : mode === 'login' ? (
                <>
                  <LogIn className="h-4 w-4" />
                  <span>Sign In &amp; Enter Portal</span>
                </>
              ) : (
                <>
                  <UserPlus className="h-4 w-4" />
                  <span>Create Account &amp; Enter Portal</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Sample Student Accounts */}
          <div className="mt-6 pt-4 border-t border-beige">
            <p className="text-xxs font-mono uppercase text-olive font-bold mb-2 text-center">
              Quick Sample Accounts (Click to test):
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleDemoFill('24CSE101')}
                className="text-left bg-cream/50 hover:bg-cream border border-beige p-2 rounded-lg transition-colors cursor-pointer"
              >
                <p className="font-mono text-xs font-bold text-rust">24CSE101</p>
                <p className="text-xxs text-ink truncate">Aathavan R</p>
              </button>
              <button
                type="button"
                onClick={() => handleDemoFill('priyadharshini.24ece@kongu.edu')}
                className="text-left bg-cream/50 hover:bg-cream border border-beige p-2 rounded-lg transition-colors cursor-pointer"
              >
                <p className="font-mono text-xs font-bold text-rust truncate">Priyadharshini</p>
                <p className="text-xxs text-ink truncate">24ECE042 (Email)</p>
              </button>
              <button
                type="button"
                onClick={() => handleDemoFill('karthik.24mech@kongu.edu')}
                className="text-left bg-cream/50 hover:bg-cream border border-beige p-2 rounded-lg transition-colors cursor-pointer"
              >
                <p className="font-mono text-xs font-bold text-rust truncate">Karthik V</p>
                <p className="text-xxs text-ink truncate">24MECH018 (Email)</p>
              </button>
            </div>
            <p className="text-xxxs text-olive text-center mt-2">
              Password for all sample accounts: <span className="font-mono font-bold text-ink">password123</span>
            </p>
          </div>
        </div>
      </main>

      {/* Institutional Footer */}
      <footer className="border-t border-beige/80 bg-cream/30 py-4 text-center text-xs text-olive">
        &copy; {new Date().getFullYear()} Aptitude Forge. Universal Institutional Assessment Portal.
      </footer>
    </div>
  );
}
