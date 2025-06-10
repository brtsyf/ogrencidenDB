import { ErrorType } from "../types/errorType";

export const errorMiddleware = (err: any, req: any, res: any, next: any) => {
  if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
    return res.status(401).json({ message: ErrorType.UNAUTHORIZED });
  }
  if (err.name === "ValidationError") {
    return res.status(400).json({ message: ErrorType.BAD_REQUEST });
  }
  if (err.name === "NotFoundError") {
    return res.status(404).json({ message: ErrorType.NOT_FOUND });
  }
  if (err.name === "UserNotFoundError") {
    return res.status(404).json({ message: ErrorType.NOT_FOUND });
  }
  if (err.name === "UnauthorizedError") {
    return res.status(401).json({ message: ErrorType.UNAUTHORIZED });
  }
  if (err.name === "BadRequestError") {
    return res.status(400).json({ message: ErrorType.BAD_REQUEST });
  }
  res.status(500).json({ message: ErrorType.INTERNAL_SERVER_ERROR });
};
