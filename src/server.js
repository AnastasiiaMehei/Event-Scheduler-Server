import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import eventsRouter from './routers/event.js';
import { UPLOAD_DIR } from './constants/index.js';
import { env } from './utils/env.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

const whitelist = [
  'http://localhost:5173',
  'https://event-scheduler-liard.vercel.app'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

const PORT = Number(env('PORT', '3001'));

export function setupServer() {
  const app = express();

  app.use(cors(corsOptions)); // Correctly set up CORS
  app.get('/', (req, res) => {
    res.json({
      message: 'Hello dear user!',
    });
  });

  app.use('/uploads', express.static(UPLOAD_DIR));
  app.use(cookieParser());
  app.use(eventsRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
