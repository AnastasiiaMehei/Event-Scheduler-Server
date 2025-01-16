import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import eventsRouter from './routers/event.js';
import { UPLOAD_DIR } from './constants/index.js';
import { env } from './utils/env.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
const whitelist = [
    'https://event-scheduler-liard.vercel.app/'
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
  app.use(cors(corsOptions));
  app.use('/uploads', express.static(UPLOAD_DIR));
  app.use(cookieParser());
  // app.use((req, res, next) => {
  //   res.setHeader('Access-Control-Allow-Credentials', 'true');
  //   next();
  // });
  app.use(eventsRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
