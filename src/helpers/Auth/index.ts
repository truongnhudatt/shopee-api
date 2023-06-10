import { AuthFailureError, NotFoundError } from '../../core/Error';
import { asyncHandler } from '../../middlewares/HandlerError';
import { Request, Response, NextFunction, Express } from 'express';
import KeyTokenService from '../../services/KeyToken';
import { Types } from 'mongoose';
import jwt from 'jsonwebtoken';
import { KeyStore } from '../../constants/Types';
import { JwtPayload } from 'jsonwebtoken';
const HEADER = {
  API_KEY: 'x-api-key',
  AUTHORIZATION: 'authorization',
  CLIENT_ID: 'x-client-id',
  REFRESHTOKEN: 'refreshtoken',
};

interface IAuthUser {
  _id: Types.ObjectId;
  email: string;
  password: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      keyStore: KeyStore;
      user: JwtPayload;
      refreshtoken: string;
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
      jwt.verify(accessToken, keyStore.publicKey, (err, decoded) => {
        if (err) {
          console.log(`Error decoding:: `, err);
          throw new AuthFailureError(`Authentication error`);
        } else {
          console.log(`Authentication user decoded::`, decoded);
          if ((typeof decoded === 'object' && (decoded.userId as string)) === (userId as string)) {
            req.keyStore = keyStore;
            return next();
          }
        }
      });
    } catch (error) {
      throw error;
    }
  }
);

export const authenticationv2 = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.headers[HEADER.CLIENT_ID] as string;
    console.log(`[Helper Authentication v2] userId::`, userId);
    if (!userId) throw new AuthFailureError('[Authenticationv2] Invalid Request userId');

    const keyStore = (await KeyTokenService.findByUserId(
      new Types.ObjectId(userId as string)
    )) as any;
    if (!keyStore) throw new NotFoundError('No KeyTokenStore found');
    console.log(`[Helper Authentication v2] keyStore::`, keyStore);

    if (req.headers[HEADER.REFRESHTOKEN]) {
      try {
        const refreshToken = req.headers[HEADER.REFRESHTOKEN] as string;
        console.log(`[Helper Authenticationv2] refreshToken::`, refreshToken);
        jwt.verify(refreshToken, keyStore.privateKey, (err: any, decoded: any) => {
          if (err)
            throw new AuthFailureError(
              '[Helper Authenticationv2] Failed to refresh token because cannot verify token'
            );
          if ((typeof decoded === 'object' && (decoded.userId as string)) === userId) {
            console.log(`[Helper Authenticationv2] decoded user`, decoded);
            req.keyStore = keyStore;
            req.user = decoded as JwtPayload;
            req.refreshtoken = refreshToken;
            return next();
          }
        });
      } catch (error) {
        throw error;
      }
    } else {
      const accessToken = req.headers[HEADER.AUTHORIZATION] as string;
      if (!accessToken)
        throw new AuthFailureError('[Authenticationv2] Invalid Request missing access token');
      try {
        jwt.verify(accessToken, keyStore.publicKey, (err: any, decoded: any) => {
          if (err) throw new AuthFailureError(err.message);
          if ((typeof decoded === 'object' && (decoded.userId as string)) === userId) {
            req.keyStore = keyStore;
            req.user = decoded as JwtPayload;
            return next();
          }
        });
      } catch (error) {
        throw error;
      }
    }
  }
);

export const verifyJwt = async (token: string, keySecret: string) => {
  return await jwt.verify(token, keySecret);
};
