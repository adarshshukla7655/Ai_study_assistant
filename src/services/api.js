import axios from 'axios';

// Configurable backend URL
const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'https://ai-study-assistant-api-9f8v.onrender.com/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Sends notes or topics to the backend for AI processing and study material creation.
 * 
 * @param {string} content - Topic name or notes text
 * @returns {Promise<Object>} The parsed study data structure { title, summary, flashcards, quiz }
 */
export async function generateStudyAssets(content) {
  try {
    const response = await apiClient.post('/study/generate', { content });
    return response.data;
  } catch (error) {
    console.error('API Client Study Generation Error:', error);
    
    // Extract server message or fallback
    const serverMessage = error.response?.data?.error;
    throw new Error(serverMessage || 'Failed to connect to the study assistant backend. Please ensure the server is running.');
  }
}

export default apiClient;
