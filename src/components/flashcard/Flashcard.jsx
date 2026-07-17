import React from 'react';

/**
 * Presentational component for a 3D flippable flashcard.
 * 
 * @param {Object} props
 * @param {string} props.question
 * @param {string} props.answer
 * @param {boolean} props.isFlipped
 * @param {Function} props.onClick
 */
export default function Flashcard({ question, answer, isFlipped, onClick }) {
  return (
    <div 
      className="perspective-1000 w-full max-w-lg h-[320px] cursor-pointer group focus:outline-none"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className={`relative w-full h-full preserve-3d transition-transform duration-500 ease-out select-none ${
        isFlipped ? 'rotate-y-180' : ''
      }`}>
        
        {/* FRONT SIDE (Question) */}
        <div className="absolute inset-0 w-full h-full backface-hidden glass-panel rounded-3xl p-8 flex flex-col justify-between items-center shadow-2xl transition-all duration-300 group-hover:border-indigo-500/40">
          <div className="w-full flex justify-between items-center text-xs tracking-wider text-indigo-400 font-bold uppercase">
            <span>Flashcard</span>
            <span className="flex items-center space-x-1">
              <span className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-ping"></span>
              <span>Question</span>
            </span>
          </div>

          <div className="my-auto">
            <h3 className="text-xl sm:text-2xl font-semibold text-zinc-100 leading-snug">
              {question}
            </h3>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest group-hover:text-indigo-400/80 transition-colors">
              Click or Press Space to Reveal
            </span>
          </div>
        </div>

        {/* BACK SIDE (Answer) */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-gradient-to-br from-indigo-950/40 to-purple-950/40 backdrop-blur-xl border border-indigo-500/30 rounded-3xl p-8 flex flex-col justify-between items-center shadow-2xl transition-all duration-300 group-hover:border-purple-500/50">
          <div className="w-full flex justify-between items-center text-xs tracking-wider text-purple-400 font-bold uppercase">
            <span>Concept Solved</span>
            <span>Answer</span>
          </div>

          <div className="my-auto overflow-y-auto max-h-[160px] pr-2">
            <p className="text-zinc-200 text-base sm:text-lg leading-relaxed">
              {answer}
            </p>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest group-hover:text-purple-400/80 transition-colors">
              Click to Flip Back
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
