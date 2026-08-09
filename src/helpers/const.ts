import { Prisma } from "../../generated/prisma/client";
import { prisma } from "../config/prismaClient";

export const taskKeys = Object.keys(
  prisma.task.fields,
) as (keyof Prisma.TaskFieldRefs)[];

export const taskKeysFiltered = taskKeys.filter(
  (key) => key !== "id" && key !== "createdAt",
);
