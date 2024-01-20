export abstract class BaseError extends Error {
  abstract statusCode: number;

  protected constructor(message: string) {
    super(message);
  }

  abstract serializeErrors(): { message: string; field?: string }[];
}
