import type { Request, Response } from "express";
import { NextFunction } from "express";

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number = 400) {
    super(message);
    this.status = status;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

export function ErrorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  return res
    .status(error instanceof ApiError ? error.status : 400)
    .json({ erro: error.message });
}
