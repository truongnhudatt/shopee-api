import { CustomError } from '../../constants/Types';
import { httpStatusCode } from '../../utils/httpStatusCode';
class ErrorResponse extends Error {
  private status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export class ConflictRequestError extends ErrorResponse {
  constructor(
    message: string = httpStatusCode.ReasonPhrases.CONFLICT,
    status: number = httpStatusCode.StatusCodes.CONFLICT
  ) {
    super(message, status);
  }
}

export class BadRequestError extends ErrorResponse {
  constructor(
    message: string = httpStatusCode.ReasonPhrases.BAD_REQUEST,
    status: number = httpStatusCode.StatusCodes.BAD_REQUEST
  ) {
    super(message, status);
  }
}

export class AuthFailureError extends ErrorResponse {
  constructor(
    message: string = httpStatusCode.ReasonPhrases.UNAUTHORIZED,
    status: number = httpStatusCode.StatusCodes.UNAUTHORIZED
  ) {
    super(message, status);
  }
}

export class NotFoundError extends ErrorResponse {
  constructor(
    message: string = httpStatusCode.ReasonPhrases.NOT_FOUND,
    status: number = httpStatusCode.StatusCodes.NOT_FOUND
  ) {
    super(message, status);
  }
}
