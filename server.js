// server/server.js

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import tripRoutes from './routes/tripRoutes.js';
import itineraryRoutes from './routes/ItineraryRoutes.js';
import logisticsRoutes from './routes/LogisticsRoutes.js';


dotenv.config();
connectDB(); // Connect to MongoDB

const app = express();

// Middlewares
app.use(cors());
app.use(express.json({ type: '*/*' })); // To parse JSON bodies

// Routes
app.use('/api/v1/auth', authRoutes); // Signup & Login API
app.use('/api/v1/trips', tripRoutes);
app.use('/api/v1/itinerary', itineraryRoutes);
app.use('/api/v1/logistics', logisticsRoutes);

// Default route for testing
app.get('/', (req, res) => {
  res.send(' Travel Planner Backend Running');
});

app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
