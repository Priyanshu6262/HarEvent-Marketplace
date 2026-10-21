import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import vendorRoutes from './routes/vendorRoutes.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Middleware - enable for all origins on public read-only API
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'OPTIONS'],
    optionsSuccessStatus: 200,
  })
);

app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ success: true, message: 'HarEvent API is running.' });
});

// API Routes
app.use('/api/vendors', vendorRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found.` });
});

// Centralised error handler (must be last)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`✅  HarEvent backend running at http://localhost:${PORT}`);
});
