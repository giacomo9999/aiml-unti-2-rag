import { Request, Response, NextFunction } from 'express';
import { parseUserQuery } from './userQueryController';

describe('parseNaturalLanguageQuery', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      body: {},
    };
    res = {
      locals: {},
    };
    next = jest.fn();
  });

  it('should call next with an error if userQuery is not provided', async () => {
    await parseUserQuery(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith({
      log: 'User query not provided',
      status: 400,
      message: { err: 'An error occurred while parsing the user query' },
    });
  });

  it('should call next with an error if naturalLanguageQuery is not a string', async () => {
    req.body.userQuery = 123;

    await parseUserQuery(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith({
      log: 'User query is not a string',
      status: 400,
      message: { err: 'An error occurred while parsing the user query' },
    });
  });

  it('should set res.locals.naturalLanguageQuery and call next if naturalLanguageQuery is valid', async () => {
    req.body.userQuery = 'valid query';

    await parseUserQuery(req as Request, res as Response, next);

    expect(res.locals!.userQuery).toBe('valid query');
    expect(next).toHaveBeenCalledWith();
  });
});
