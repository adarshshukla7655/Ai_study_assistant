import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import studyRoutes from './routes/study.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middlewares
app.use(cors({
  origin: '*', // For development, allow requests from any host (e.g. Vite frontend)
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Routes
app.use('/api/study', studyRoutes);

// Health Check Endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    geminiKeyConfigured: !!process.env.GEMINI_API_KEY
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({
    error: 'An internal server error occurred.'
  });
});

app.listen(PORT, () => {
  console.log(`=============================================`);
  console.log(` AI Study Assistant Backend running on PORT ${PORT}`);
  console.log(` Health check: http://localhost:${PORT}/health`);
  console.log(`=============================================`);
});
