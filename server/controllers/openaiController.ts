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
