import type { Request, Response } from "express";
import { NextFunction } from "express";
import {
  BadRequestError,
  InternalServerError,
  NotfoundError,
} from "../helpers/api-erros";
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/client";

export function PrismaErrorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (error instanceof PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2025":
        throw new NotfoundError("Tarefa não Encontrada");
      default:
        throw new InternalServerError();
    }
  }

  if (error instanceof PrismaClientValidationError)
    throw new BadRequestError(
      "Alguns parâmetros estão com tipgaem incorreta ou algun parâmetro obrigatório está ausente.",
    );

  if (error instanceof PrismaClientInitializationError)
    throw new InternalServerError("Não foi possíel iniciar o servidor");

  if (
    error instanceof PrismaClientUnknownRequestError ||
    error instanceof PrismaClientRustPanicError
  )
    throw new InternalServerError();

  next(error);
}
