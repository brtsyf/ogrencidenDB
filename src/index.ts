import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/error.middleware";
import authRouter from "./routers/auth.router";
import path from "path";
import { fileURLToPath } from "url";
import chatRouter from "./routers/chat.router";
import { requireAuth } from "@clerk/express";
import { existingUserMiddleware } from "./middlewares/existingUser.middleware";
dotenv.config();

const app = express();

const filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(filename);

app.use(morgan("dev"));
app.use(helmet());
app.use(cookieParser());
app.use(
  cors({
    origin: ["*", "http://localhost:3000", "http://localhost:8080"],
    credentials: true,
  })
);
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  "/chat ",
  requireAuth({ signInUrl: "/auth/sign-in" }),
  existingUserMiddleware,
  chatRouter
);
app.use("/", authRouter);

app.use(errorMiddleware);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
