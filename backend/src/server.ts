import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import dotenv from 'dotenv';
import apiRouter from './routes/api';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security Middlewares
app.use(helmet({
  crossOriginResourcePolicy: false, // Allow frontend to request images from static uploads
}));

// CORS Configuration
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3100',
  process.env.FRONTEND_URL
].filter(Boolean) as string[];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded assets statically
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Root route: redirect to frontend if available, otherwise show API info
app.get('/', (req, res) => {
  const frontendUrl = process.env.FRONTEND_URL;
  if (frontendUrl) return res.redirect(frontendUrl);
  res.json({ message: 'API Server - available routes under /api', health: true });
});

// Bind API Routes
app.use('/api', apiRouter);

// Global Error Handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled Error:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {},
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`=============================================`);
  console.log(`🚀 API Server running on: http://localhost:${PORT}`);
  console.log(`📁 Uploads serving from:  http://localhost:${PORT}/uploads`);
  console.log(`=============================================`);
});
