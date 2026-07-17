import React from 'react';

/**
 * Landing welcome view for the AI Study Assistant.
 * 
 * @param {Object} props
 * @param {Function} props.onStart - Navigates the user to the active Study Dashboard
 */
export default function LandingPage({ onStart }) {
  return (
    <div className="min-h-[85vh] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden animate-fade-in">
      
      {/* Decorative background glows */}
      <div className="absolute top-10 left-1/2 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl -z-10 -translate-x-1/2"></div>
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-3xl -z-10"></div>

      {/* Hero Section */}
      <div className="text-center max-w-3xl space-y-6">
        
        {/* Animated Badge */}
        <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider animate-[pulse_3s_infinite]">
          <span>✨</span>
          <span>Next-Gen Active Learning</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 via-indigo-200 to-purple-200 leading-tight">
          Supercharge Your Learning With <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">Gemini AI</span>
        </h1>

        {/* Hero Subtitle */}
        <p className="text-zinc-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
          Transform any notes, topics, or articles into interactive study summaries, 3D flashcard decks, and targeted practice quizzes in seconds.
        </p>

        {/* Primary CTA button */}
        <div className="pt-6">
          <button
            onClick={onStart}
            className="px-8 py-4.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 text-white font-extrabold text-lg tracking-wide shadow-[0_4px_25px_rgba(99,102,241,0.4)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_4px_30px_rgba(168,85,247,0.5)] active:scale-[0.98] flex items-center justify-center space-x-3 mx-auto"
          >
            <span>Start Studying Now</span>
            <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Grid of Key Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full mt-20">
        
        {/* Feature 1: Intelligent Summaries */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 flex flex-col space-y-4 hover:border-indigo-500/20 transition-all">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center text-2xl shadow-inner">
            📚
          </div>
          <h3 className="text-lg font-bold text-zinc-100">AI Study Summaries</h3>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Gemini synthesizes complex texts into concise, bulleted core concepts so you grasp key frameworks instantly.
          </p>
        </div>

        {/* Feature 2: 3D Flashcards */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 flex flex-col space-y-4 hover:border-indigo-500/20 transition-all">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center text-2xl shadow-inner">
            🎴
          </div>
          <h3 className="text-lg font-bold text-zinc-100">Interactive 3D Cards</h3>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Test active recall with sleek, tactile cards. Use keyboard shortcuts (arrows & space) for a seamless review flow.
          </p>
        </div>

        {/* Feature 3: Smart Quiz Retesting */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 flex flex-col space-y-4 hover:border-indigo-500/20 transition-all">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-2xl shadow-inner">
            🎯
          </div>
          <h3 className="text-lg font-bold text-zinc-100">Retest Incorrect Answers</h3>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Take instant tests, check grading, and instantly launch a retry quiz isolating only the questions you missed.
          </p>
        </div>

      </div>

    </div>
  );
}
