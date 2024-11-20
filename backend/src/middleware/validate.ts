import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../utils/errors';

export function validateUrl(req: Request, res: Response, next: NextFunction) {
  const { url } = req.body;

  if (!url) {
    throw new CustomError('URL is required', 400);
  }

  try {
    new URL(url);
    next();
  } catch {
    throw new CustomError('Invalid URL format', 400);
  }
}