import React from 'react';

/**
 * Formats a raw text block into readable HTML paragraphs and custom bulleted lists.
 * Supports lines starting with '-', '*', or digits.
 * 
 * @param {string} text - Raw text block from AI
 */
function renderFormattedSummary(text) {
  if (!text) return null;

  const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
  const formattedElements = [];
  let currentListItems = [];
  let keyCounter = 0;

  const flushList = () => {
    if (currentListItems.length > 0) {
      formattedElements.push(
        <ul key={`list-${keyCounter++}`} className="list-none space-y-3 my-4 pl-4 border-l-2 border-indigo-500/30">
          {currentListItems}
        </ul>
      );
      currentListItems = [];
    }
  };

  lines.forEach((line) => {
    // Check if line starts with a list bullet (-, *, or •)
    const bulletMatch = line.match(/^[-*•]\s+(.*)/);
    if (bulletMatch) {
      currentListItems.push(
        <li key={`li-${keyCounter++}`} className="flex items-start text-zinc-300 text-base leading-relaxed">
          <span className="inline-block text-indigo-400 mr-2 mt-[6px] select-none text-xs">◆</span>
          <span>{bulletMatch[1]}</span>
        </li>
      );
    } else {
      flushList();
      formattedElements.push(
        <p key={`p-${keyCounter++}`} className="text-zinc-300 text-base leading-relaxed mb-4">
          {line}
        </p>
      );
    }
  });

  // Flush any remaining list items
  flushList();

  return formattedElements;
}

export default function SummaryCard({ title, summary }) {
  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden animate-slide-up">
      {/* Visual Accent Gradients */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -z-10"></div>

      <div className="flex items-center space-x-3 mb-6">
        <span className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </span>
        <h2 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 to-zinc-300">
          {title || "Study Overview"}
        </h2>
      </div>

      <div className="prose prose-invert max-w-none">
        {renderFormattedSummary(summary)}
      </div>
    </div>
  );
}
