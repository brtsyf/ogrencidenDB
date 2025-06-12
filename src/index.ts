import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { requireAuth } from "@clerk/express";

//Routers
import advertRouter from "./routers/advert.router";
import chatRouter from "./routers/chat.router";
import authRouter from "./routers/auth.router";
//Middlewares
import { errorMiddleware } from "./middlewares/error.middleware";
import { existingUserMiddleware } from "./middlewares/existingUser.middleware";
//Swagger
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: { title: "Ogrenciden API", version: "1.0.0" },
  },
  apis: ["./src/routers/*.router.ts"],
};
const swaggerSpec = swaggerJSDoc(options);

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
  "/advert",
  requireAuth({ signInUrl: "/auth/sign-in" }),
  existingUserMiddleware,
  advertRouter
);
app.use(
  "/chat ",
  requireAuth({ signInUrl: "/auth/sign-in" }),
  existingUserMiddleware,
  chatRouter
);
app.use("/", authRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(errorMiddleware);

app.listen(3001, () => {
  console.log(
    "Server is running on port 3000 && Swagger is working on http://localhost:3000/api-docs"
  );
});
