import { BaseError } from "./base-error";

export class NotAuthorizedError extends BaseError {
  statusCode = 401;

  constructor() {
    super("Not authorized");
  }

  serializeErrors(): { message: string; field?: string }[] {
    return [{ message: this.message }];
  }
}
