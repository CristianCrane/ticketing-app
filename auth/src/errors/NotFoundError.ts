import { BaseError } from "./BaseError";

export class NotFoundError extends BaseError {
  statusCode = 404;

  constructor() {
    super("Route not found");
  }

  serializeErrors(): { message: string; field?: string }[] {
    return [{ message: "Not found" }];
  }
}
