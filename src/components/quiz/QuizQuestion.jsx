import React from 'react';

/**
 * Component representing a single multiple choice quiz question.
 * 
 * @param {Object} props
 * @param {Object} props.questionObj - Question data { question, options, correctAnswer }
 * @param {number} props.questionIndex - Original array index of the question
 * @param {number} props.displayNumber - Display number (e.g., Question 1)
 * @param {number|undefined} props.selectedOption - User selected option index (0-3)
 * @param {boolean} props.isSubmitted - Whether the quiz has been submitted
 * @param {Function} props.onSelect - Option selection handler (questionIndex, optionIndex) => void
 */
export default function QuizQuestion({
  questionObj,
  questionIndex,
  displayNumber,
  selectedOption,
  isSubmitted,
  onSelect
}) {
  const { question, options = [], correctAnswer } = questionObj;

  return (
    <div className="glass-panel rounded-2xl p-6 sm:p-8 transition-all duration-300 border-zinc-800 shadow-md">
      <div className="flex items-center space-x-2.5 mb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-md">
          Question {displayNumber}
        </span>
        {isSubmitted && (
          selectedOption === correctAnswer ? (
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md flex items-center space-x-1">
              <span>✓</span> <span>Correct</span>
            </span>
          ) : (
            <span className="text-xs font-bold text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-md flex items-center space-x-1">
              <span>✗</span> <span>Incorrect</span>
            </span>
          )
        )}
      </div>

      <h4 className="text-lg font-semibold text-zinc-100 mb-6 leading-snug">
        {question}
      </h4>

      <div className="grid grid-cols-1 gap-3">
        {options.map((option, idx) => {
          const isSelected = selectedOption === idx;
          const isCorrect = idx === correctAnswer;
          
          let buttonStyles = "glass-input text-left p-4 rounded-xl text-zinc-300 font-medium transition-all duration-150 border-zinc-850 hover:bg-zinc-800/50 hover:border-zinc-700 active:scale-[0.99]";
          let feedbackIcon = null;

          if (isSubmitted) {
            // Disable active scaling or focus styles when submitted
            buttonStyles = "text-left p-4 rounded-xl font-medium border text-sm transition-all duration-150 cursor-default select-none ";
            
            if (isCorrect) {
              buttonStyles += "bg-emerald-500/10 border-emerald-500/50 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.15)]";
              feedbackIcon = (
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500 text-black font-extrabold text-xs select-none">
                  ✓
                </span>
              );
            } else if (isSelected && !isCorrect) {
              buttonStyles += "bg-rose-500/10 border-rose-500/50 text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.15)]";
              feedbackIcon = (
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-rose-500 text-white font-extrabold text-xs select-none">
                  ✗
                </span>
              );
            } else {
              buttonStyles += "bg-zinc-950/20 border-zinc-850 text-zinc-500 opacity-60";
            }
          } else {
            // Normal selection styling
            if (isSelected) {
              buttonStyles = "text-left p-4 rounded-xl font-medium text-white border transition-all duration-150 border-indigo-500 bg-indigo-500/10 shadow-[0_0_15px_rgba(99,102,241,0.25)]";
            }
          }

          return (
            <button
              key={idx}
              type="button"
              disabled={isSubmitted}
              onClick={() => onSelect(questionIndex, idx)}
              className={`flex items-center justify-between w-full outline-none focus:ring-2 focus:ring-indigo-500/30 ${buttonStyles}`}
            >
              <div className="flex items-center space-x-3 pr-2">
                <span className={`inline-flex items-center justify-center w-6 h-6 rounded-lg text-xs font-bold border transition-colors select-none ${
                  isSelected && !isSubmitted
                    ? 'bg-indigo-500 border-indigo-400 text-white'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                }`}>
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="leading-snug">{option}</span>
              </div>
              {feedbackIcon}
            </button>
          );
        })}
      </div>
    </div>
  );
}
