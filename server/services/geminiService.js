import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey });

const studySchema = {
  type: 'OBJECT',
  properties: {
    title: {
      type: 'STRING',
      description: 'A concise and clear title for the study topic, e.g., "Binary Search Trees".'
    },
    summary: {
      type: 'STRING',
      description: 'A rich, multi-sentence academic summary of the topic. Use structured bullet points where helpful.'
    },
    flashcards: {
      type: 'ARRAY',
      description: 'A list of 5-8 high-quality study flashcards, focused on core terms, syntax, or concepts.',
      items: {
        type: 'OBJECT',
        properties: {
          question: {
            type: 'STRING',
            description: 'A conceptual question or term to define.'
          },
          answer: {
            type: 'STRING',
            description: 'A concise, informative answer explaining the term or concept.'
          }
        },
        required: ['question', 'answer']
      }
    },
    quiz: {
      type: 'ARRAY',
      description: 'A multiple choice test consisting of 5-8 conceptual questions.',
      items: {
        type: 'OBJECT',
        properties: {
          question: {
            type: 'STRING',
            description: 'The quiz question testing deep comprehension of the topic.'
          },
          options: {
            type: 'ARRAY',
            items: { type: 'STRING' },
            description: 'Exactly four plausible options to choose from.'
          },
          correctAnswer: {
            type: 'INTEGER',
            description: 'The 0-based index (0, 1, 2, or 3) of the correct choice inside the options array.'
          }
        },
        required: ['question', 'options', 'correctAnswer']
      }
    }
  },
  required: ['title', 'summary', 'flashcards', 'quiz']
};

/**
 * Generates study content based on a provided notes or topic prompt.
 * Enforces JSON response types using the above OpenAPI schema definition.
 * 
 * @param {string} promptText 
 * @returns {Promise<Object>} The parsed study JSON content
 */
export async function generateStudyMaterial(promptText) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY environment variable is not defined.');
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: `Generate comprehensive study notes, flashcards, and a quiz based on the user's input: "${promptText}". Ensure content is production-quality, accurate, and optimized for internship-level learning.`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: studySchema,
      },
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error('Empty response received from Gemini API.');
    }

    return JSON.parse(responseText);
  } catch (error) {
    console.error('Gemini Service API Call Error:', error);
    throw error;
  }
}
