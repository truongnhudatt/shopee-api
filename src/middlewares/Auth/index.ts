import { Request, Response, NextFunction } from 'express';
import { findById } from '../../services/ApiKey';
const HEADER = {
  API_KEY: 'x-api-key',
  AUTHORIZATION: 'authorization',
  AUTHORIZATION_TOKEN: 'authorization-token',
  AUTHORIZATION_TOKEN_TYPE: 'authorization-token-type',
  AUTHORIZATION_SCHEME: 'authorization-scheme',
  AUTHORIZATION_SCHEME_TYPE: 'authorization-scheme-type',
};
interface ObjKey {
  key: string;
  status: boolean;
  permissions: string[];
}

declare global {
  namespace Express {
    interface Request {
      objKey?: ObjKey;
    }
  }
}

export const apiKey = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const key = req.headers[HEADER.API_KEY]?.toString();
    if (!key) {
      return res.status(403).json({
        status: 403,
        message: 'Forbidden',
      });
    }
    // check objkey
    const objKey = await findById(key);
    if (!objKey) {
      return res.status(403).json({
        status: 403,
        message: 'Forbidden',
      });
    }
    req.objKey = objKey;
    return next();
  } catch (error) {}
};

export const checkPermission = (permissions: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.objKey?.permissions) {
      return res.status(403).json({
        message: 'Permission denied',
      });
    }
    console.log(`Permissions:: `, req.objKey.permissions);
    const validPermissions = req.objKey.permissions.includes(permissions);
    if (!validPermissions) {
      return res.status(403).json({
        message: 'Permission denied',
      });
    }
    return next();
  };
};
