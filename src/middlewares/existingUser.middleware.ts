import { NextFunction, Request, Response } from "express";
import { existingUser, saveUser } from "../models/auth.model";
import { clerkClient, getAuth } from "@clerk/express";

export const existingUserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const auth = getAuth(req);
  let user = null;

  if (!auth.userId) return next(new Error("Unauthorized"));

  const clerkUser = await clerkClient.users.getUser(auth.userId);

  user = await existingUser(clerkUser.emailAddresses[0].emailAddress);

  if (!user) {
    user = await saveUser(
      clerkUser.emailAddresses[0].emailAddress,
      clerkUser.firstName || "Anonymous"
    );
  }

  (req as any).user = user;
  next();
};
