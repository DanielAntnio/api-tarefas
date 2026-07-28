import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../helpers/api-erros";

export default function validateBody(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (!(req.body instanceof Object))
    throw new BadRequestError("Deve fornecer body.");
  next();
}
