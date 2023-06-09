import { httpStatusCode } from '../../utils/httpStatusCode';
import { Response } from 'express';
export class SuccessResponse {
  public message: string;
  public status: number;
  public reasons: string;
  public metadata?: any;
  constructor(message: string, status: number, reasons: string, metadata: any = {}) {
    this.message = message;
    this.status = status;
    this.reasons = reasons;
    this.metadata = metadata;
  }

  send(res: Response): void {
    res.status(this.status).json({
      message: this.message,
      reasons: this.reasons,
      metadata: this.metadata,
    });
  }
}

export class Ok extends SuccessResponse {
  constructor({ message, metadata }: { message: string; metadata: any }) {
    super(message, httpStatusCode.StatusCodes.OK, httpStatusCode.ReasonPhrases.OK, metadata);
  }
  send(res: Response): void {
    super.send(res);
  }
}

export class Created extends SuccessResponse {
  constructor({ message, metadata }: { message: string; metadata: any }) {
    super(
      message,
      httpStatusCode.StatusCodes.CREATED,
      httpStatusCode.ReasonPhrases.CREATED,
      metadata
    );
  }
  send(res: Response): void {
    super.send(res);
  }
}
