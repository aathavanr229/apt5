import React, { useState } from 'react';
import { UserCheck, X, GraduationCap, ArrowRight, ShieldCheck, UserPlus, LogIn, AlertCircle } from 'lucide-react';

export interface StudentProfile {
  name: string;
  roll: string;
  email?: string;
  department: string;
}

interface StudentLoginModalProps {
  isOpen: boolean;
  currentStudent: StudentProfile | null;
  onClose: () => void;
  onLogin: (student: StudentProfile) => void;
  onLogout: () => void;
}

export default function StudentLoginModal({
  isOpen,
  currentStudent,
  onClose,
  onLogin,
  onLogout,
}: StudentLoginModalProps) {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [name, setName] = useState('');
  const [roll, setRoll] = useState('');
  const [password, setPassword] = useState('');
  const [department, setDepartment] = useState('Computer Science & Engineering');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'login') {
        if (!roll.trim()) {
          setError('Please enter your Roll/Registration Number or Email Address.');
          setLoading(false);
          return;
        }

        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ identifier: roll.trim(), password: password.trim() || 'password123' })
        });
        const data = await res.json();

        if (!res.ok || !data.success) {
          setError(data.error || 'Login failed. Please check your roll number or email.');
          setLoading(false);
          return;
        }

        onLogin({
          name: data.user.name,
          roll: data.user.roll,
          email: data.user.email,
          department: data.user.department
        });
        onClose();
      } else {
        // Sign Up
        if (!name.trim() || !roll.trim() || !password.trim()) {
          setError('Please fill in Full Name, Roll Number, and Password to Sign Up.');
          setLoading(false);
          return;
        }

        const res = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: name.trim(),
            roll: roll.trim(),
            email: `${roll.trim().toLowerCase()}@kongu.edu`,
            department,
            password: password.trim()
          })
        });
        const data = await res.json();

        if (!res.ok || !data.success) {
          setError(data.error || 'Signup failed. Please try again.');
          setLoading(false);
          return;
        }

        onLogin({
          name: data.user.name,
          roll: data.user.roll,
          email: data.user.email,
          department: data.user.department
        });
        onClose();
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = (demoRoll: string, demoPassword = 'password123') => {
    setRoll(demoRoll);
    setPassword(demoPassword);
    setMode('login');
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/60 backdrop-blur-xs animate-fadeIn">
      <div className="paper-sheet w-full max-w-md rounded-2xl p-6 sm:p-8 shadow-2xl relative border border-beige">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-olive hover:text-ink p-1 rounded-lg hover:bg-cream transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-rust/10 text-rust rounded-xl border border-rust/20">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-serif text-xl font-bold text-ink">Student Portal</h3>
            <p className="text-xs text-olive">Assessment Hall Ticket &amp; Scorecard Access</p>
          </div>
        </div>

        {currentStudent ? (
          <div className="bg-cream/50 border border-beige rounded-xl p-4 my-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xxs font-mono uppercase text-olive font-bold">Currently Active Student</span>
              <span className="inline-flex items-center gap-1 text-xxs font-sans text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-semibold">
                <ShieldCheck className="h-3 w-3" /> Active Session
              </span>
            </div>
            <div>
              <p className="font-serif text-base font-bold text-ink">{currentStudent.name}</p>
              <p className="font-mono text-xs text-rust font-semibold">Roll No: {currentStudent.roll}</p>
              <p className="text-xs text-olive mt-0.5">{currentStudent.department}</p>
            </div>
            <div className="pt-2 border-t border-beige flex gap-3">
              <button
                type="button"
                onClick={onLogout}
                className="flex-1 py-2 px-3 text-xs font-sans font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors cursor-pointer"
              >
                Sign Out
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2 px-3 text-xs font-sans font-semibold text-paper bg-rust hover:bg-rust-dark rounded-lg transition-colors cursor-pointer"
              >
                Continue Assessment
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Mode Selector Tabs */}
            <div className="flex bg-cream/70 p-1 rounded-xl border border-beige mb-4">
              <button
                type="button"
                onClick={() => { setMode('login'); setError(''); }}
                className={`flex-1 py-1.5 text-xs font-sans font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  mode === 'login'
                    ? 'bg-paper text-ink shadow-xs border border-beige'
                    : 'text-olive hover:text-ink'
                }`}
              >
                <LogIn className="h-3.5 w-3.5 text-rust" />
                Log In
              </button>
              <button
                type="button"
                onClick={() => { setMode('signup'); setError(''); }}
                className={`flex-1 py-1.5 text-xs font-sans font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  mode === 'signup'
                    ? 'bg-paper text-ink shadow-xs border border-beige'
                    : 'text-olive hover:text-ink'
                }`}
              >
                <UserPlus className="h-3.5 w-3.5 text-rust" />
                Sign Up
              </button>
            </div>

            {error && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl mb-4 flex flex-col gap-2">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
                  <span className="font-semibold">{error}</span>
                </div>
                {error.includes('Sign Up') && mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => { setMode('signup'); setError(''); }}
                    className="self-end text-xs text-rust hover:underline font-bold"
                  >
                    Click here to Sign Up →
                  </button>
                )}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-sans font-bold text-ink mb-1 uppercase tracking-wider">
                    Full Name <span className="text-rust">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Aathavan R"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-paper border border-beige rounded-lg px-3 py-2 text-sm text-ink focus:outline-none focus:border-rust"
                    required={mode === 'signup'}
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-sans font-bold text-ink mb-1 uppercase tracking-wider">
                  Roll / Register Number <span className="text-rust">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. 24CSE101"
                  value={roll}
                  onChange={(e) => setRoll(e.target.value)}
                  className="w-full bg-paper border border-beige rounded-lg px-3 py-2 font-mono text-sm text-ink focus:outline-none focus:border-rust uppercase"
                  required
                />
              </div>

              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-sans font-bold text-ink mb-1 uppercase tracking-wider">
                    Department / Branch
                  </label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full bg-paper border border-beige rounded-lg px-3 py-2 text-xs text-ink focus:outline-none focus:border-rust"
                  >
                    <option value="Computer Science & Engineering">Computer Science &amp; Engineering</option>
                    <option value="Electronics & Communication">Electronics &amp; Communication</option>
                    <option value="Electrical & Electronics">Electrical &amp; Electronics</option>
                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Civil Engineering">Civil Engineering</option>
                  </select>
                </div>
              )}

              <div>
                <label className="block text-xs font-sans font-bold text-ink mb-1 uppercase tracking-wider">
                  Password <span className="text-rust">*</span>
                </label>
                <input
                  type="password"
                  placeholder="Enter your security password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-paper border border-beige rounded-lg px-3 py-2 text-sm text-ink focus:outline-none focus:border-rust"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-rust hover:bg-rust-dark disabled:opacity-50 text-paper font-sans font-semibold text-sm py-2.5 rounded-lg border border-rust shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                {mode === 'login' ? (
                  <>
                    <LogIn className="h-4 w-4" />
                    {loading ? 'Authenticating...' : 'Student Log In'}
                  </>
                ) : (
                  <>
                    <UserPlus className="h-4 w-4" />
                    {loading ? 'Creating Account...' : 'Create Student Account'}
                  </>
                )}
              </button>

              {/* Demo Accounts helper */}
              <div className="pt-3 border-t border-beige mt-4">
                <p className="text-xxs font-mono uppercase text-olive font-bold mb-1.5">
                  Pre-registered Registered Demo Accounts:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleQuickDemo('24CSE101')}
                    className="text-xxs font-mono bg-cream hover:bg-beige border border-beige px-2 py-1 rounded-md text-ink hover:text-rust transition-colors cursor-pointer"
                  >
                    24CSE101 (Aathavan)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickDemo('24ECE042')}
                    className="text-xxs font-mono bg-cream hover:bg-beige border border-beige px-2 py-1 rounded-md text-ink hover:text-rust transition-colors cursor-pointer"
                  >
                    24ECE042 (Priyadharshini)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickDemo('24MECH018')}
                    className="text-xxs font-mono bg-cream hover:bg-beige border border-beige px-2 py-1 rounded-md text-ink hover:text-rust transition-colors cursor-pointer"
                  >
                    24MECH018 (Karthik)
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

