import React, { useState, useEffect } from 'react';
import LottoGenerator from './components/LottoGenerator';
import CommentSection from './components/CommentSection';
import InquiryForm from './components/InquiryForm';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Check system preference or local storage
    const stored = localStorage.getItem('lotto-theme') as 'light' | 'dark' | null;
    if (stored) {
      setTheme(stored);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('lotto-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="wrap">
      <header>
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <h1>Lotto Gen</h1>
          <button 
            onClick={toggleTheme}
            className="theme-toggle-btn"
            aria-label="테마 변경"
            style={{ 
              position: 'absolute', 
              right: 0,
              background: 'transparent',
              border: '1px solid var(--border)',
              color: 'var(--text)',
              padding: '8px 12px',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            {theme === 'light' ? '◐' : '◑'}
          </button>
        </div>
      </header>

      <LottoGenerator />
      <CommentSection />
      <InquiryForm />

      <footer>
        &copy; 2026 Lotto Gen. All rights reserved.
      </footer>
    </div>
  );
}

export default App;