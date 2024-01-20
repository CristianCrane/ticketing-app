import { BaseError } from "./base-error";

export class DatabaseConnectionError extends BaseError {
  statusCode = 500;
  reason = "Error connecting to database";

  constructor(message: string) {
    super(message);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
