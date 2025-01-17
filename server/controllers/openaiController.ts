<<<<<<< HEAD
import { RequestHandler } from 'express'
import { ServerError } from '../../types/types'

export const queryOpenAIEmbedding: RequestHandler = async (_req, res, next) => {
    const { userQuery } = res.locals
    if (!userQuery) {
        const error: ServerError = {
            log: 'queryOpenAIEmbedding did not receive a user query',
            status: 500,
            message: { err: 'An error occurred before querying OpenAI' },
        }
        return next(error)
    }

    res.locals.embedding = [0, 1, 2]
    return next()
}

export const queryOpenAIChat: RequestHandler = async (_req, res, next) => {
    const { userQuery, pineconeQueryResult } = res.locals
    if (!userQuery) {
        const error: ServerError = {
            log: 'queryOpenAIChat did not receive a user query',
            status: 500,
            message: { err: 'An error occurred before querying OpenAI' },
        }
        return next(error)
    }
    if (!pineconeQueryResult) {
        const error: ServerError = {
            log: 'queryOpenAIChat did not receive pinecone query results',
            status: 500,
            message: { err: 'An error occurred before querying OpenAI' },
        }
        return next(error)
    }

    res.locals.movieRecommendation =
        'Wishmaster - A malevolent genie wreaks havoc after being freed, leading to a battle between his dark desires and those trying to stop him.'
    return next()
}
=======
import { RequestHandler } from 'express';
import { ServerError } from '../../types/types';
import OpenAI from "openai";
import 'dotenv/config';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const queryOpenAIEmbedding: RequestHandler = async (_req, res, next) => {
  const { userQuery } = res.locals;
  console.log('userQuery:', userQuery);
  
  if (!userQuery) {
    const error: ServerError = {
      log: 'queryOpenAIEmbedding did not receive a user query',
      status: 500,
      message: { err: 'An error occurred before querying OpenAI' },
    };
    return next(error);
  }

  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: userQuery,
    encoding_format: 'float',
  })

  res.locals.embeddings = response.data[0].embedding; // [0, 1, 2]
  console.log('embedding:', res.locals.embeddings);
 
  return next();
};

export const queryOpenAIChat: RequestHandler = async (_req, res, next) => {
  const { userQuery, startYear, endYear, pineconeQueryResult, goodMovieOptions } = res.locals;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
        { role: "system", 
          content: "You are a huge film buff on the same level as Roger Ebert. Your goal is to not recommend the best movies, but to recommend the movie that best fits with what the user is wanting to watch based on their pompt. Your response should only include the title of the movie you choose to recommend and a very brief description or teaser of what the movie is about." 
        },
        {
            role: "user",
            content: `Please recommend a movie that fits this description: ${userQuery}. Limit your response  to movies that have been released between the years ${startYear} and ${endYear}.`,
          },
          {
          role: "user",
          content: `A really good response would be a movie similar to any of these movies that are titles found in this array: ${goodMovieOptions}`,
        },
      ],
    });

    console.log('Response from OpenAI: ', completion.choices[0].message);
    const movieRecommendation = completion.choices[0].message;
    
    if (!userQuery) {
      const error: ServerError = {
        log: 'queryOpenAIChat did not receive a user query',
        status: 500,
        message: { err: 'An error occurred before querying OpenAI' },
      };
      return next(error);
    }
    if (!pineconeQueryResult) {
      const error: ServerError = {
        log: 'queryOpenAIChat did not receive pinecone query results',
        status: 500,
        message: { err: 'An error occurred before querying OpenAI' },
      };
      return next(error);
    }
    
    console.log('movieRecommendation:', movieRecommendation);
    
    res.locals.movieRecommendation = `Here is a great option for you tonight: ${movieRecommendation.content}`;
    
    // res.locals.movieRecommendation =
    // 'Wishmaster - A malevolent genie wreaks havoc after being freed, leading to a battle between his dark desires and those trying to stop him.';
    
    return next();
  };
  
>>>>>>> d0faee2ba83701646726ce86d6c7f12764ee5354
