import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export const schemaValidator = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.safeParse(req.body);
    if (error) {
      next(new Error(error.message));
    }
    next();
  };
};
