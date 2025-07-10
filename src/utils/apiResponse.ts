import { NextFunction, Response, Request } from "express";
import { getErrorMessage } from "./helpers";

const apiResponse = {
  success: (res: Response, statusCode = 200, message: string = "Success", data: null | any = null) => {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  },

  error: (res: Response, message: string = "Something went wrong", error?: Error, statusCode = 500) => {
    if (error) {
      const errorMessage = getErrorMessage(error);

      return res.status(statusCode).json({ success: false, message: errorMessage });
    }

    return res.status(statusCode).json({ success: false, message });
  },

  unprocessableEntity: (res: Response, message: string = "Unprocessable Entity", details: null | any = null) => {
    return res.status(422).json({
      success: false,
      message,
      ...(details ? { details } : {}),
    });
  },

  badRequest: (res: Response, message: string = "Something went wrong") => {
    return res.status(400).json({
      success: false,
      message,
    });
  },

  notFound: (res: Response, message: string = "Task not found") => {
    return res.status(404).json({
      success: false,
      message,
    });
  },

  unauthorized: (res: Response, message: string = "Unauthorized access") => {
    return res.status(401).json({
      success: false,
      message,
    });
  },
};

export const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default apiResponse;
