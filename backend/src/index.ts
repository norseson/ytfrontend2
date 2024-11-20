import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { convertRouter } from './routes/convert';
import { setupCleanup } from './utils/cleanup';
import { errorHandler } from './middleware/error';
import { logger } from './utils/logger';

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  methods: ['GET', 'POST'],
  credentials: true,
}));

app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // limit each IP to 10 requests per windowMs
  message: { error: 'Too many requests, please try again later.' },
});

app.use('/api', limiter);

// Routes
app.use('/api/convert', convertRouter);

// Error handling
app.use(errorHandler);

// Start cleanup service
setupCleanup();

// Start server
app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});