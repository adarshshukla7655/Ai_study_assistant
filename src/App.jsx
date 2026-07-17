import { useState } from 'react';
import LandingPage from './pages/LandingPage';
import StudyDashboard from './pages/StudyDashboard';

function App() {
  const [view, setView] = useState('landing'); // 'landing' | 'dashboard'

  return (
    <div className="min-h-screen flex flex-col justify-between antialiased selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {/* HEADER NAVBAR */}
      <header className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-900 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          
          {/* Logo / Home Action */}
          <button 
            onClick={() => setView('landing')}
            className="flex items-center space-x-2.5 outline-none group text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-xl shadow-[0_0_15px_rgba(99,102,241,0.3)] transition-transform group-hover:scale-105">
              🎓
            </div>
            <div>
              <span className="block font-black text-white text-base tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 to-zinc-300">
                StudyAI
              </span>
              <span className="block text-[10px] text-zinc-500 font-bold uppercase tracking-widest leading-none">
                Gemini Assistant
              </span>
            </div>
          </button>

          {/* Navigation links */}
          <nav className="flex items-center space-x-6">
            <button
              onClick={() => setView('landing')}
              className={`text-sm font-bold transition-all duration-150 ${
                view === 'landing' ? 'text-indigo-400' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setView('dashboard')}
              className={`text-sm font-bold transition-all duration-150 ${
                view === 'dashboard' ? 'text-indigo-400' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Dashboard
            </button>
          </nav>

        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="flex-grow">
        {view === 'landing' ? (
          <LandingPage onStart={() => setView('dashboard')} />
        ) : (
          <StudyDashboard />
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-zinc-950 border-t border-zinc-900 py-6 px-6 text-center text-xs text-zinc-500 font-medium">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} StudyAI Assistant. All rights reserved.</p>
          <div className="flex space-x-4 text-zinc-600">
            <span>Powered by Gemini 2.5 Flash</span>
            <span>•</span>
            <span>React + Tailwind</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
