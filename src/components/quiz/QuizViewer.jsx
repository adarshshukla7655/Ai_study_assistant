import React from 'react';
import QuizQuestion from './QuizQuestion';

/**
 * Controller component for the Quiz practice session.
 * 
 * @param {Object} props
 */
export default function QuizViewer({
  fullQuiz = [],
  activeQuizList = [],
  userAnswers,
  selectAnswer,
  submitQuiz,
  isQuizSubmitted,
  resetQuiz,
  incorrectIndices,
  isRetesting,
  startRetest,
  scoreStats
}) {
  // Check if all active questions have been answered before letting user submit
  const allAnswered = activeQuizList.every((q) => {
    const originalIndex = fullQuiz.indexOf(q);
    return userAnswers[originalIndex] !== undefined;
  });

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8 animate-slide-up">
      
      {/* Header and Quiz Status */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-zinc-800 pb-4">
        <div>
          <h3 className="text-xl font-bold text-zinc-100 flex items-center space-x-2">
            <span>📝</span>
            <span>{isRetesting ? 'Practice Quiz (Retest Mode)' : 'Practice Quiz'}</span>
          </h3>
          <p className="text-sm text-zinc-400 mt-1">
            {isRetesting 
              ? `Testing your knowledge on ${activeQuizList.length} previously incorrect questions.`
              : `A short ${activeQuizList.length}-question quiz to evaluate your understanding.`
            }
          </p>
        </div>
        {isRetesting && (
          <button
            onClick={resetQuiz}
            className="mt-3 sm:mt-0 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors uppercase tracking-wider"
          >
            ← Exit Retest
          </button>
        )}
      </div>

      {/* SCORE PANEL (Shown only after submission) */}
      {isQuizSubmitted && (
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border-indigo-500/20 text-center relative overflow-hidden shadow-2xl animate-fade-in">
          {/* Ambient Glows */}
          <div className="absolute top-0 left-1/2 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl -z-10 -translate-x-1/2"></div>
          
          <div className="flex flex-col items-center">
            {/* Score Ring */}
            <div className="relative w-36 h-36 flex items-center justify-center mb-6">
              <svg className="absolute w-full h-full transform -rotate-90">
                {/* Background track circle */}
                <circle 
                  cx="72" cy="72" r="60" 
                  className="stroke-zinc-800" strokeWidth="10" fill="transparent" 
                />
                {/* Foreground score progress */}
                <circle 
                  cx="72" cy="72" r="60" 
                  className={scoreStats.percentage >= 70 ? "stroke-indigo-500" : "stroke-purple-500"} 
                  strokeWidth="10" 
                  fill="transparent" 
                  strokeDasharray={`${2 * Math.PI * 60}`}
                  strokeDashoffset={`${2 * Math.PI * 60 * (1 - scoreStats.percentage / 100)}`}
                  strokeLinecap="round"
                  style={{ transition: 'stroke-dashoffset 0.8s ease-out' }}
                />
              </svg>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-extrabold text-white">
                  {scoreStats.score}
                </span>
                <span className="text-zinc-500 font-bold text-xs uppercase tracking-wider">
                  Out of {scoreStats.total}
                </span>
              </div>
            </div>

            {/* Score Review Copy */}
            <h4 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 to-zinc-300 mb-2">
              {scoreStats.percentage === 100 && '🥇 Perfect score! You\'ve mastered this!'}
              {scoreStats.percentage >= 80 && scoreStats.percentage < 100 && '🌟 Fantastic job!'}
              {scoreStats.percentage >= 50 && scoreStats.percentage < 80 && '👍 Good effort!'}
              {scoreStats.percentage < 50 && '📚 Keep practicing!'}
            </h4>
            <p className="text-zinc-400 text-sm max-w-sm mb-8">
              {scoreStats.percentage === 100 
                ? 'Excellent understanding of the material. You are fully ready for this topic!'
                : 'Review the detailed answers below and retest incorrect questions to build retention.'
              }
            </p>

            {/* Action Panel */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
              {incorrectIndices.length > 0 && (
                <button
                  onClick={startRetest}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-bold tracking-wide shadow-[0_4px_15px_rgba(99,102,241,0.3)] transition-all duration-200 hover:from-indigo-500 hover:to-indigo-400 active:scale-95 flex items-center justify-center space-x-2"
                >
                  <span>🔄</span>
                  <span>Retest Incorrect ({incorrectIndices.length})</span>
                </button>
              )}

              <button
                onClick={resetQuiz}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 font-bold tracking-wide transition-all duration-200 hover:bg-zinc-850 hover:text-white active:scale-95"
              >
                Retake Entire Quiz
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QUIZ QUESTIONS LIST */}
      <div className="space-y-6">
        {activeQuizList.map((q, idx) => {
          const originalIdx = fullQuiz.indexOf(q);
          return (
            <QuizQuestion
              key={originalIdx}
              questionObj={q}
              questionIndex={originalIdx}
              displayNumber={idx + 1}
              selectedOption={userAnswers[originalIdx]}
              isSubmitted={isQuizSubmitted}
              onSelect={selectAnswer}
            />
          );
        })}
      </div>

      {/* SUBMIT BUTTON (Only shown before submission) */}
      {!isQuizSubmitted && (
        <div className="flex justify-center pt-4">
          <button
            onClick={submitQuiz}
            disabled={!allAnswered}
            className="w-full sm:w-auto min-w-[200px] px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-extrabold tracking-wide shadow-[0_4px_15px_rgba(99,102,241,0.3)] transition-all duration-200 hover:from-indigo-500 hover:to-indigo-400 active:scale-95 disabled:opacity-30 disabled:pointer-events-none"
          >
            {allAnswered ? 'Submit Quiz Answers' : 'Answer All Questions to Submit'}
          </button>
        </div>
      )}

    </div>
  );
}
