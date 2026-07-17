import { useEffect } from 'react';
import Flashcard from './Flashcard';

/**
 * Controller component for the Flashcard study deck carousel.
 * Handles keyboard events (Left/Right arrows, Space) for smooth study sessions.
 * 
 * @param {Object} props
 */
export default function FlashcardViewer({
  flashcards = [],
  currentCardIndex,
  isFlipped,
  nextCard,
  prevCard,
  flipCard
}) {
  const totalCards = flashcards.length;
  const activeCard = flashcards[currentCardIndex];

  // Add keyboard controls for interactive accessibility
  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key } = event;
      if (key === 'ArrowRight') {
        nextCard();
      } else if (key === 'ArrowLeft') {
        prevCard();
      } else if (key === ' ') {
        // Prevent default space page-scrolling behavior
        event.preventDefault();
        flipCard();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentCardIndex, isFlipped, nextCard, prevCard, flipCard]);

  if (totalCards === 0) {
    return (
      <div className="glass-panel rounded-3xl p-8 text-center text-zinc-400">
        No flashcards generated.
      </div>
    );
  }

  const progressPercent = Math.round(((currentCardIndex + 1) / totalCards) * 100);

  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto space-y-6 animate-slide-up">
      {/* Progress Bar */}
      <div className="w-full flex flex-col space-y-2">
        <div className="flex justify-between items-center text-xs text-zinc-400">
          <span>Session Progress</span>
          <span className="font-bold text-indigo-400">{progressPercent}%</span>
        </div>
        <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* The 3D Flashcard */}
      <Flashcard 
        question={activeCard.question}
        answer={activeCard.answer}
        isFlipped={isFlipped}
        onClick={flipCard}
      />

      {/* Navigation Controls */}
      <div className="flex items-center justify-between w-full px-2">
        <button
          onClick={prevCard}
          disabled={currentCardIndex === 0}
          className="flex items-center space-x-2 px-5 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 font-medium transition-all duration-200 hover:bg-zinc-800 active:scale-95 disabled:opacity-30 disabled:pointer-events-none"
          aria-label="Previous Flashcard"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          <span className="hidden sm:inline">Back</span>
        </button>

        <span className="text-sm font-semibold text-zinc-300 tracking-wider">
          {currentCardIndex + 1} / {totalCards}
        </span>

        <button
          onClick={nextCard}
          disabled={currentCardIndex === totalCards - 1}
          className="flex items-center space-x-2 px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-medium shadow-[0_4px_15px_rgba(99,102,241,0.25)] transition-all duration-200 hover:from-indigo-500 hover:to-indigo-400 active:scale-95 disabled:opacity-30 disabled:pointer-events-none"
          aria-label="Next Flashcard"
        >
          <span className="hidden sm:inline">Next</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Shortcut instructions */}
      <div className="hidden sm:flex items-center space-x-1.5 text-[11px] text-zinc-500 select-none">
        <kbd className="px-1.5 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-zinc-400">←</kbd>
        <kbd className="px-1.5 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-zinc-400">→</kbd>
        <span className="text-zinc-600">to navigate,</span>
        <kbd className="px-3 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-zinc-400">Space</kbd>
        <span className="text-zinc-600">to flip</span>
      </div>
    </div>
  );
}
