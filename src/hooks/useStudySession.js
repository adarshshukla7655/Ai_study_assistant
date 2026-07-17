import { useState, useMemo } from 'react';

/**
 * Custom React Hook to manage a student's study session states (flashcards & quiz).
 * 
 * @param {Object} studyData - The active study assets object { flashcards, quiz }
 */
export function useStudySession(studyData) {
  // Flashcard states
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Quiz states
  const [userAnswers, setUserAnswers] = useState({}); // { [questionIdx]: selectedOptionIdx }
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
  const [isRetesting, setIsRetesting] = useState(false);
  const [incorrectIndices, setIncorrectIndices] = useState([]);

  const flashcards = studyData?.flashcards || [];
  const fullQuiz = studyData?.quiz || [];

  // Navigation handlers for flashcards
  const nextCard = () => {
    if (currentCardIndex < flashcards.length - 1) {
      setIsFlipped(false);
      setCurrentCardIndex(prev => prev + 1);
    }
  };

  const prevCard = () => {
    if (currentCardIndex > 0) {
      setIsFlipped(false);
      setCurrentCardIndex(prev => prev - 1);
    }
  };

  const flipCard = () => {
    setIsFlipped(prev => !prev);
  };

  // Selection handler for quiz
  const selectAnswer = (questionIndex, optionIndex) => {
    if (isQuizSubmitted) return; // Prevent changing answers after submission
    setUserAnswers(prev => ({
      ...prev,
      [questionIndex]: optionIndex,
    }));
  };

  // Submit the quiz and calculate wrong answers
  const submitQuiz = () => {
    const activeQuestions = isRetesting 
      ? fullQuiz.filter((_, idx) => incorrectIndices.includes(idx))
      : fullQuiz;

    const wrongList = [];
    activeQuestions.forEach((q) => {
      // Find the index of this question in the full quiz array
      const originalIdx = fullQuiz.indexOf(q);
      const userAnswer = userAnswers[originalIdx];
      if (userAnswer !== q.correctAnswer) {
        wrongList.push(originalIdx);
      }
    });

    setIncorrectIndices(wrongList);
    setIsQuizSubmitted(true);
  };

  // Reset the quiz back to the beginning
  const resetQuiz = () => {
    setUserAnswers({});
    setIsQuizSubmitted(false);
    setIsRetesting(false);
    setIncorrectIndices([]);
  };

  // Set up the retest flow: clear answers only for the incorrect questions
  const startRetest = () => {
    const clearedAnswers = { ...userAnswers };
    incorrectIndices.forEach(idx => {
      delete clearedAnswers[idx];
    });
    
    setUserAnswers(clearedAnswers);
    setIsQuizSubmitted(false);
    setIsRetesting(true);
  };

  // Filter the quiz questions based on whether we are in retest mode
  const activeQuizList = useMemo(() => {
    if (!isRetesting) return fullQuiz;
    return fullQuiz.filter((_, idx) => incorrectIndices.includes(idx));
  }, [isRetesting, fullQuiz, incorrectIndices]);

  // Calculate score based on active questions
  const scoreStats = useMemo(() => {
    const targetQuestions = isRetesting
      ? fullQuiz.filter((_, idx) => incorrectIndices.includes(idx))
      : fullQuiz;

    if (targetQuestions.length === 0) return { score: 0, total: 0, percentage: 0 };

    let correctCount = 0;
    targetQuestions.forEach((q) => {
      const originalIdx = fullQuiz.indexOf(q);
      if (userAnswers[originalIdx] === q.correctAnswer) {
        correctCount++;
      }
    });

    return {
      score: correctCount,
      total: targetQuestions.length,
      percentage: Math.round((correctCount / targetQuestions.length) * 100),
    };
  }, [isRetesting, fullQuiz, userAnswers, incorrectIndices]);

  // Reset everything when switching topics
  const resetSession = () => {
    setCurrentCardIndex(0);
    setIsFlipped(false);
    resetQuiz();
  };

  return {
    // Flashcards
    currentCardIndex,
    isFlipped,
    setIsFlipped,
    nextCard,
    prevCard,
    flipCard,
    flashcardsCount: flashcards.length,

    // Quiz
    userAnswers,
    selectAnswer,
    submitQuiz,
    isQuizSubmitted,
    resetQuiz,
    incorrectIndices,
    isRetesting,
    startRetest,
    activeQuizList,
    scoreStats,
    
    // Global
    resetSession
  };
}
