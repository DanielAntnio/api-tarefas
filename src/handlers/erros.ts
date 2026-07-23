import type { Request, Response } from "express";
import { NextFunction } from "express";
import { ApiError } from "../helpers/api-erros";

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
