import { clerkClient, requireAuth } from "@clerk/express";
import { Request, Response, Router } from "express";
import { existingUserMiddleware } from "../middlewares/existingUser.middleware";
import { __dirname } from "../index";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const users = await clerkClient.users.getUserList();

  res.json(users);
});

router.get(
  "/home",
  requireAuth({ signInUrl: "/error" }),
  existingUserMiddleware,
  (req: Request, res: Response) => {
    res.status(200).json({ message: "Home" });
  }
);

export default router;
