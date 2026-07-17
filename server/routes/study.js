import express from 'express';
import { generateStudyContent } from '../controllers/studyController.js';

const router = express.Router();

// Generate study material from notes/topics
router.post('/generate', generateStudyContent);

export default router;
