import React, { useState } from 'react';
import { generateStudyAssets } from '../services/api';
import { useStudySession } from '../hooks/useStudySession';
import LoadingSpinner from '../components/common/LoadingSpinner';
import SummaryCard from '../components/summary/SummaryCard';
import FlashcardViewer from '../components/flashcard/FlashcardViewer';
import QuizViewer from '../components/quiz/QuizViewer';

export default function StudyDashboard() {
  // Input form state
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Active study data state
  const [studyData, setStudyData] = useState(null);
  const [activeTab, setActiveTab] = useState('summary'); // 'summary' | 'flashcards' | 'quiz'

  // Hook for managing active flashcards and quiz state
  const session = useStudySession(studyData);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setIsLoading(true);
    setError(null);
    session.resetSession();

    try {
      const data = await generateStudyAssets(inputText.trim());
      setStudyData(data);
      setActiveTab('summary'); // default to showing summary card
    } catch (err) {
      setError(err.message || 'Failed to generate study materials. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartOver = () => {
    setStudyData(null);
    setInputText('');
    setError(null);
    session.resetSession();
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 space-y-8 min-h-[80vh]">
      
      {/* INPUT FORM VIEW */}
      {!studyData && !isLoading && (
        <div className="glass-panel rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden animate-slide-up">
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl -z-10"></div>
          
          <div className="max-w-2xl mx-auto text-center space-y-4 mb-8">
            <h2 className="text-3xl font-extrabold text-white">Create Your Study Guide</h2>
            <p className="text-zinc-400 text-sm">
              Enter any notes, lecture transcripts, textbook content, or simply a topic you want to master. Gemini will design custom learning materials for you.
            </p>
          </div>

          <form onSubmit={handleGenerate} className="space-y-6">
            <div className="relative">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Examples:
• 'Binary Search Trees: insertions, deletions, and traversals'
• Paste your biology lecture notes about Cell Mitosis...
• 'Asynchronous JavaScript: Promises, async/await, and the event loop'"
                rows="8"
                className="w-full glass-input rounded-2xl p-5 text-zinc-200 placeholder-zinc-500 font-medium text-base resize-y min-h-[160px]"
                maxLength={10000}
              />
              <div className="absolute bottom-4 right-4 text-xs font-bold text-zinc-500 select-none">
                {inputText.length} / 10000
              </div>
            </div>

            {error && (
              <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-sm flex items-center space-x-2.5">
                <span>⚠️</span>
                <span>{error}</span>
              </div>
            )}

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="w-full sm:w-auto min-w-[240px] px-8 py-4.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-extrabold text-base tracking-wide shadow-[0_4px_15px_rgba(99,102,241,0.35)] transition-all duration-200 hover:from-indigo-500 hover:to-purple-500 active:scale-98 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center space-x-2"
              >
                <span>✨</span>
                <span>Generate Study Assets</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* LOADING SCREEN */}
      {isLoading && <LoadingSpinner />}

      {/* STUDY SESSION WORKSPACE */}
      {studyData && !isLoading && (
        <div className="space-y-6">
          
          {/* Workspace Subheader / Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-zinc-950/40 p-4 rounded-2xl border border-zinc-900">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🧠</span>
              <div>
                <h3 className="font-extrabold text-zinc-100 leading-snug">
                  {studyData.title}
                </h3>
                <p className="text-xs text-zinc-400">AI Generated Study Session</p>
              </div>
            </div>

            <button
              onClick={handleStartOver}
              className="text-xs font-extrabold text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 px-4 py-2.5 rounded-xl transition-all duration-150 active:scale-95 flex items-center space-x-2 self-start sm:self-center"
            >
              <span>←</span>
              <span>Start New Topic</span>
            </button>
          </div>

          {/* TAB SELECTION BAR */}
          <div className="flex border-b border-zinc-800 gap-1 sm:gap-4 overflow-x-auto pb-[1px] select-none">
            <button
              onClick={() => setActiveTab('summary')}
              className={`px-5 py-3.5 font-bold text-sm tracking-wide border-b-2 transition-all duration-150 whitespace-nowrap ${
                activeTab === 'summary'
                  ? 'border-indigo-500 text-indigo-400'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200'
              }`}
            >
              📖 Overview Summary
            </button>
            
            <button
              onClick={() => setActiveTab('flashcards')}
              className={`px-5 py-3.5 font-bold text-sm tracking-wide border-b-2 transition-all duration-150 whitespace-nowrap ${
                activeTab === 'flashcards'
                  ? 'border-indigo-500 text-indigo-400'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200'
              }`}
            >
              🎴 Flashcard Deck ({studyData.flashcards?.length || 0})
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-5 py-3.5 font-bold text-sm tracking-wide border-b-2 transition-all duration-150 whitespace-nowrap ${
                activeTab === 'quiz'
                  ? 'border-indigo-500 text-indigo-400'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200'
              }`}
            >
              📝 Practice Quiz ({studyData.quiz?.length || 0})
            </button>
          </div>

          {/* TAB CONTENTS */}
          <div className="py-4">
            {activeTab === 'summary' && (
              <SummaryCard 
                title={studyData.title}
                summary={studyData.summary}
              />
            )}

            {activeTab === 'flashcards' && (
              <FlashcardViewer 
                flashcards={studyData.flashcards}
                currentCardIndex={session.currentCardIndex}
                isFlipped={session.isFlipped}
                nextCard={session.nextCard}
                prevCard={session.prevCard}
                flipCard={session.flipCard}
              />
            )}

            {activeTab === 'quiz' && (
              <QuizViewer 
                fullQuiz={studyData.quiz}
                activeQuizList={session.activeQuizList}
                userAnswers={session.userAnswers}
                selectAnswer={session.selectAnswer}
                submitQuiz={session.submitQuiz}
                isQuizSubmitted={session.isQuizSubmitted}
                resetQuiz={session.resetQuiz}
                incorrectIndices={session.incorrectIndices}
                isRetesting={session.isRetesting}
                startRetest={session.startRetest}
                scoreStats={session.scoreStats}
              />
            )}
          </div>

        </div>
      )}

    </div>
  );
}
