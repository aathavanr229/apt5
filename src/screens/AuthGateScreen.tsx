import React, { useState } from 'react';
import { StudentProfile } from '../components/StudentLoginModal.tsx';
import { LogIn, UserPlus, GraduationCap, ShieldCheck, AlertCircle, KeyRound, User, Hash, Building2, Mail, CheckCircle2, RefreshCw } from 'lucide-react';

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
  const [verificationCode, setVerificationCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [sendingCode, setSendingCode] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Real-time institutional domain validation for sign-up email
  const getEmailWarning = (inputEmail: string): string | null => {
    if (!inputEmail.trim()) return null;
    const clean = inputEmail.trim().toLowerCase();
    if (!clean.includes('@')) return null;
    const isKongu = /@(?:[a-zA-Z0-9-]+\.)*kongu\.(?:edu|ac\.in)$/i.test(clean);
    if (!isKongu) {
      return 'Only official Kongu Engineering College emails (@kongu.edu or @kongu.ac.in) are permitted.';
    }
    return null;
  };

  const emailWarning = mode === 'signup' ? getEmailWarning(email) : null;

  const handleSendCode = async () => {
    setError(null);
    setSuccessMsg(null);
    const targetEmail = email.trim() || (roll.trim() ? `${roll.trim().toLowerCase()}@kongu.edu` : '');
    if (!targetEmail) {
      setError('Please provide your official college Roll Number or Email Address first.');
      return;
    }
    const warning = getEmailWarning(targetEmail);
    if (warning) {
      setError(warning);
      return;
    }

    setSendingCode(true);
    try {
      const res = await fetch('/api/auth/send-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: targetEmail, roll: roll.trim() }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || 'Failed to dispatch verification code.');
      } else {
        setCodeSent(true);
        setSuccessMsg('Verification code dispatched to your official institutional email.');
      }
    } catch (err: any) {
      setError(err.message || 'Network error while requesting verification code.');
    } finally {
      setSendingCode(false);
    }
  };

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
            password: password.trim(),
          }),
        });

        const data = await res.json();
        if (!res.ok || !data.success) {
          setError(data.error || 'Authentication failed. Please verify your credentials.');
          setLoading(false);
          return;
        }

        if (data.token) {
          try {
            localStorage.setItem('aptitude_token', data.token);
          } catch (e) {
            console.warn('Failed to store session token:', e);
          }
        }

        const profile: StudentProfile = {
          name: data.user.name,
          roll: data.user.roll,
          email: data.user.email,
          department: data.user.department,
        };

        onLoginSuccess(profile);
      } else {
        // Sign Up
        if (!name.trim() || !roll.trim() || !password.trim()) {
          setError('Full Name, Roll Number, and Password are required to create your account.');
          setLoading(false);
          return;
        }

        const targetEmail = email.trim() || `${roll.trim().toLowerCase()}@kongu.edu`;
        const warning = getEmailWarning(targetEmail);
        if (warning) {
          setError(warning);
          setLoading(false);
          return;
        }

        const res = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: name.trim(),
            roll: roll.trim(),
            email: targetEmail,
            department,
            password: password.trim(),
            verificationCode: verificationCode.trim() || undefined,
          }),
        });

        const data = await res.json();
        if (!res.ok || !data.success) {
          setError(data.error || 'Account creation failed.');
          setLoading(false);
          return;
        }

        if (data.token) {
          try {
            localStorage.setItem('aptitude_token', data.token);
          } catch (e) {
            console.warn('Failed to store session token:', e);
          }
        }

        const profile: StudentProfile = {
          name: data.user.name,
          roll: data.user.roll,
          email: data.user.email,
          department: data.user.department,
        };

        setSuccessMsg('Institutional account verified & created! Entering portal...');
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
              Kongu Engineering College Assessment &amp; Live Ranking Portal
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-sans text-olive">
          <ShieldCheck className="h-4 w-4 text-rust" />
          <span className="hidden sm:inline">Institutional Verification (@kongu.edu / @kongu.ac.in)</span>
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
              {mode === 'login' ? 'Student Sign In' : 'Institutional Registration'}
            </h2>
            <p className="text-xs text-olive mt-1">
              {mode === 'login'
                ? 'Sign in with your Roll Number or official college email to begin assessments.'
                : 'Only official @kongu.edu or @kongu.ac.in student emails are authorized.'}
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex bg-cream/70 p-1 rounded-xl border border-beige mb-5">
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setError(null);
                setSuccessMsg(null);
              }}
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
              onClick={() => {
                setMode('signup');
                setError(null);
                setSuccessMsg(null);
              }}
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
                    onClick={() => {
                      setMode('signup');
                      setError(null);
                    }}
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
                    placeholder="e.g. 24CSE101 or 24cse101@kongu.edu"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="w-full bg-paper border border-beige rounded-lg pl-9 pr-3 py-2 font-mono text-sm text-ink focus:outline-none focus:border-rust"
                    required
                  />
                </div>
                <p className="text-xxxs text-olive mt-1">
                  Sign in using your college Roll Number or registered institutional Email.
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
                    Institutional Email (@kongu.edu / @kongu.ac.in)
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-olive" />
                    <input
                      type="email"
                      placeholder={roll ? `${roll.toLowerCase()}@kongu.edu` : 'e.g. student.24cse@kongu.edu'}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full bg-paper border ${
                        emailWarning ? 'border-rose-400 bg-rose-50/20' : 'border-beige'
                      } rounded-lg pl-9 pr-3 py-2 text-sm text-ink focus:outline-none focus:border-rust`}
                    />
                  </div>
                  {emailWarning ? (
                    <p className="text-xxs text-rose-600 font-semibold mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3 inline shrink-0" />
                      {emailWarning}
                    </p>
                  ) : (
                    <p className="text-xxxs text-olive mt-1">
                      Must be an official Kongu email ending with @kongu.edu or @kongu.ac.in.
                    </p>
                  )}
                </div>

                {/* Email Verification OTP Section */}
                <div className="p-3 bg-cream/50 rounded-xl border border-beige space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-sans font-bold text-ink uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-rust" />
                      Email Verification Code
                    </label>
                    <button
                      type="button"
                      onClick={handleSendCode}
                      disabled={sendingCode || !!emailWarning}
                      className="text-xxs font-sans font-bold text-rust hover:text-rust-dark disabled:opacity-50 flex items-center gap-1 cursor-pointer"
                    >
                      {sendingCode ? (
                        <>
                          <RefreshCw className="h-3 w-3 animate-spin" />
                          Sending...
                        </>
                      ) : codeSent ? (
                        'Resend Code'
                      ) : (
                        'Send Code'
                      )}
                    </button>
                  </div>
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="Enter 6-digit verification code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                    className="w-full bg-paper border border-beige rounded-lg px-3 py-2 text-sm font-mono tracking-widest text-ink focus:outline-none focus:border-rust"
                  />
                  <p className="text-xxxs text-olive">
                    Click &apos;Send Code&apos; to dispatch an institutional OTP to your college email.
                  </p>
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
              disabled={loading || (mode === 'signup' && !!emailWarning)}
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
                  <span>Verify &amp; Create Institutional Account</span>
                </>
              )}
            </button>
          </form>
        </div>
      </main>

      {/* Institutional Footer */}
      <footer className="border-t border-beige/80 bg-cream/30 py-4 text-center text-xs text-olive">
        &copy; {new Date().getFullYear()} Kongu Engineering College — Aptitude Forge Assessment Portal.
      </footer>
    </div>
  );
}
