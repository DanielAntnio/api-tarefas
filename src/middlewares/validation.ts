import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../helpers/api-erros";
import { fieldHasContent } from "../helpers/utils";
import { prisma } from "../config/prismaClient";
import { taskKeysFiltered } from "../helpers/const";

type Params = Partial<Record<(typeof taskKeysFiltered)[number], boolean>>;

export default function validateBody(
  params: Params | (keyof Params)[] = taskKeysFiltered,
) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!(req.body instanceof Object))
      throw new BadRequestError("Deve fornecer body.");

    const isArray = Array.isArray(params);
    const keys = isArray ? params : (Object.keys(params) as (keyof Params)[]);

    keys.forEach((key) => {
      const value = req.body[key];

      if (!fieldHasContent(value)) {
        if (!isArray && params[key])
          throw new BadRequestError(`O campo ${key} é obrigatório`);

        return;
      }

      const expectedFiedlType = prisma.task.fields[key].typeName;
      const isSameType = expectedFiedlType.toLowerCase() !== typeof value;

      if (isSameType)
        throw new BadRequestError(
          `O campo ${key} deve ser do tipo ${expectedFiedlType}`,
        );
    });

    next();
  };
}
