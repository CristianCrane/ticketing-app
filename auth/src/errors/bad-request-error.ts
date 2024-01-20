import { BaseError } from "./base-error";

export class BadRequestError extends BaseError {
  statusCode = 400;

  constructor(message: string) {
    super(message);
  }

  serializeErrors(): { message: string; field?: string }[] {
    return [{ message: this.message }];
  }
}
