import { Request, Response } from 'express';

/**
 * @todo use https://github.com/davidbanham/express-async-errors
 * @param callback
 */
export const asyncHandler = (callback: (request: Request, response: Response) => void) => async (request: Request, response: Response) => {

    try {
        await callback(request, response)
    } catch (err) {
        response.status(500);
        response.send(err.toString());
    }

};

