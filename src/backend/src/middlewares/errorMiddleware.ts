import { Request, Response, NextFunction } from 'express';

const validationErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.name === 'ValidationError') {
    const errors = err.details.map((error: any) => error.message);
    return res.status(400).json({ error: { message: 'Validation error', details: errors } });
  }
  next(err);
};

const databaseErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.name === 'PrismaClientKnownRequestError') {
    return res.status(500).json({ error: { message: 'Database error: ' + err.message } });
  }
  next(err);
};

const unidentifiedErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (!res.headersSent) {
    return res.status(500).json({ error: { message: 'Internal Server Error' } });
  }
};

export { validationErrorHandler, databaseErrorHandler, unidentifiedErrorHandler };
