import express, { ErrorRequestHandler, query } from 'express';
import { queryOpenAIChat, queryOpenAIEmbedding } from './controllers/openaiController.js';
import { parseUserQuery } from './controllers/userQueryController.js';
import { queryPineconeDatabase } from './controllers/pineconeController.js';
import cors from 'cors';
import 'dotenv/config';

import { ServerError } from '../types/types.js';

const app = express();

app.use(cors());
app.use(express.json());

app.post('/api',
  parseUserQuery,
  queryOpenAIEmbedding,
  queryPineconeDatabase,
  queryOpenAIChat,
  (_req, res) => {
  res.status(200).json({
    movieRecommendation:
      `${res.locals.movieRecommendation}`,
  });
});

const errorHandler: ErrorRequestHandler = (
  err: ServerError,
  _req,
  res,
  _next
) => {
  const defaultErr: ServerError = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj: ServerError = { ...defaultErr, ...err };
  console.log(errorObj.log);
  res.status(errorObj.status).json(errorObj.message);
};

app.use(errorHandler);

export default app;
