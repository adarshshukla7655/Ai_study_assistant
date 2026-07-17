import { useState, useEffect } from 'react';

const STUDY_TIPS = [
  "Active recall (testing yourself) is up to 150% more effective than passive re-reading.",
  "Flipping flashcards strengthens neural connections through retrieval practice.",
  "Taking a practice quiz before studying highlights knowledge gaps, making subsequent review more focused.",
  "Spaced repetition leverages the forgetting curve to move facts into long-term memory.",
  "The Feynman Technique: Try explaining this topic to a child. It exposes exactly what you don't understand.",
  "Shorter, focused study sessions (25 mins Pomodoro) prevent cognitive fatigue compared to marathon cramming."
];

export default function LoadingSpinner() {
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex(prev => (prev + 1) % STUDY_TIPS.length);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-8 my-12 animate-fade-in">
      <div className="relative glass-panel rounded-3xl p-10 max-w-lg w-full text-center flex flex-col items-center shadow-2xl">
        {/* Glowing Ambient Lights */}
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl -z-10 animate-pulse"></div>

        {/* Orbit Spinner */}
        <div className="relative w-24 h-24 mb-8 flex items-center justify-center">
          {/* Outer ring */}
          <div className="absolute w-full h-full border-4 border-dashed border-indigo-500/30 rounded-full animate-[spin_10s_linear_infinite]"></div>
          {/* Middle glow ring */}
          <div className="absolute w-20 h-20 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
          {/* Inner pulse */}
          <div className="w-12 h-12 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full blur-[2px] animate-pulse flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.5)]">
            <span className="text-white text-xs font-semibold select-none">AI</span>
          </div>
        </div>

        {/* Loading text */}
        <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 to-purple-200 mb-2">
          Generating Study Session...
        </h3>
        <p className="text-zinc-400 text-sm mb-6 animate-pulse">
          Gemini is synthesizing summary, flashcards, and quiz
        </p>

        {/* Divider */}
        <div className="w-full h-[1px] bg-zinc-800 mb-6"></div>

        {/* Study tip panel */}
        <div className="min-h-[80px] flex flex-col justify-center px-4">
          <span className="text-[10px] uppercase tracking-wider text-indigo-400 font-bold mb-2">
            Did you know?
          </span>
          <p className="text-zinc-300 text-sm italic leading-relaxed transition-all duration-500">
            "{STUDY_TIPS[tipIndex]}"
          </p>
        </div>
      </div>
    </div>
  );
}
