import { ValidationError } from "express-validator";
import { BaseError } from "./BaseError";

export class RequestValidationError extends BaseError {
  statusCode = 400;
  errors: ValidationError[];

  constructor(errors: ValidationError[]) {
    super("Request validation error");
    this.errors = errors;
  }

  serializeErrors() {
    return this.errors.map((err) => ({
      message: err.msg,
      ...(err.type === "field" && { field: err.path }),
    }));
  }
}
