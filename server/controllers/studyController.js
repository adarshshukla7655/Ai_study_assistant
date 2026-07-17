import { generateStudyMaterial } from '../services/geminiService.js';

/**
 * Handles the generation of study materials (title, summary, flashcards, quiz).
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
export async function generateStudyContent(req, res) {
  try {
    const { content } = req.body;

    if (!content || typeof content !== 'string' || content.trim().length === 0) {
      return res.status(400).json({
        error: 'Invalid input. Please provide a non-empty "content" string containing your notes or study topic.'
      });
    }

    if (content.trim().length > 10000) {
      return res.status(400).json({
        error: 'Input text is too long. Please limit notes to under 10,000 characters.'
      });
    }

    const studyData = await generateStudyMaterial(content.trim());
    return res.json(studyData);
  } catch (error) {
    console.error('Study Controller Error:', error);
    
    // Provide user-friendly errors depending on failure type
    const statusCode = error.message?.includes('GEMINI_API_KEY') ? 500 : 502;
    return res.status(statusCode).json({
      error: error.message || 'An error occurred while generating study material with the AI. Please try again.'
    });
  }
}
