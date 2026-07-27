import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../helpers/api-erros";
import { fieldHasContent } from "../helpers/utils";

export default function validateBody(paramKeys: string[] = []) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!(req.body instanceof Object))
      throw new BadRequestError("Deve fornecer body.");

    paramKeys.forEach((key) => {
      const param = req.body[key];

      if (!fieldHasContent(param))
        throw new BadRequestError(`Parámetro ${key} é obrigatório.`);
    });

    next();
  };
}
