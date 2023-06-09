import { AuthFailureError, NotFoundError } from '../../core/Error';
import { asyncHandler } from '../../middlewares/HandlerError';
import { Request, Response, NextFunction, Express } from 'express';
import KeyTokenService from '../../services/KeyToken';
import { Types } from 'mongoose';
import jwt, { decode } from 'jsonwebtoken';
import { KeyStore } from '../../constants/Types';
const HEADER = {
  API_KEY: 'x-api-key',
  AUTHORIZATION: 'authorization',
  CLIENT_ID: 'x-client-id',
};

declare global {
  namespace Express {
    interface Request {
      keyStore: KeyStore;
    }
  }
}

export const authentication = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.headers[HEADER.CLIENT_ID];
    if (!userId) throw new AuthFailureError('Invalid Request');
    console.log(`Authentication userId:: `, userId);
    const keyStore: KeyStore | undefined = (await KeyTokenService.findByUserId(
      new Types.ObjectId(userId as string)
    )) as KeyStore | undefined;
    if (!keyStore) throw new NotFoundError('Not found keyStore');
    console.log(`Authentication keystore:: `, keyStore.publicKey);
    const accessToken = req.headers[HEADER.AUTHORIZATION] as string;
    console.log(`Authentication logout access Token::`, accessToken);
    if (!accessToken) throw new AuthFailureError('Invalid Request');
    try {
      const decode = jwt.verify(accessToken, keyStore.publicKey, (err, decoded) => {
        if (err) {
          console.log(`Error decoding:: `, err);
          throw new AuthFailureError(`Authentication error`);
        } else {
          console.log(`Authentication user decoded::`, decoded);
          req.keyStore = keyStore;
          return next();
        }
      });
    } catch (error) {
      throw error;
    }
  }
);
