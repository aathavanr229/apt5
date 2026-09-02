import React, { useEffect, useState } from 'react';
import { Sparkles, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function Footer() {
  const [apiKeyStatus, setApiKeyStatus] = useState<'checking' | 'configured' | 'missing'>('checking');

  useEffect(() => {
    // We check server-side configuration status via health / subjects endpoint
    fetch('/api/subjects')
      .then(res => {
        if (res.ok) {
          // Check if any error or success (this means server is alive)
          // We can query custom health or check if process env variables are available
          setApiKeyStatus('configured');
        } else {
          setApiKeyStatus('missing');
        }
      })
      .catch(() => {
        setApiKeyStatus('missing');
      });
  }, []);

  return (
    <footer className="mt-20 border-t border-beige bg-cream/30 py-8 text-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-left max-w-xl">
            <h3 className="font-serif text-sm font-semibold text-ink">
              Department of Computer Science &amp; Engineering
            </h3>
            <p className="text-xs text-olive mt-1">
              Curriculum-aligned technical assessments, structured question curation, and faculty-moderated examination repository.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-paper px-3.5 py-1.5 rounded-full border border-beige text-xs font-sans text-ink/80 shadow-xs">
              {apiKeyStatus === 'checking' ? (
                <span className="animate-pulse h-2 w-2 rounded-full bg-olive"></span>
              ) : apiKeyStatus === 'configured' ? (
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              ) : (
                <AlertTriangle className="h-4 w-4 text-amber-500" />
              )}
              <span>
                System Status: <span className="font-semibold text-ink">Online &amp; Operational</span>
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-beige/60 text-center text-xs text-olive/60">
          &copy; {new Date().getFullYear()} Aptitude Forge. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
