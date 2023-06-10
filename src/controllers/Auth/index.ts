import { Request, Response, NextFunction } from 'express';
import AuthService from '../../services/Auth';
import { Ok, Created, SuccessResponse } from '../../core/Success';
import { KeyStore } from '../../constants/Types';
import { NotFoundError } from '../../core/Error';
export default class AuthController {
  static signUp = async (req: Request, res: Response, next: NextFunction) => {
    console.log(`[AuthController]:: Sign Up:`, req.body);
    const created = new Created({
      message: `User ${req.body.email} created successfully`,
      metadata: await AuthService.signUp(req.body),
    });
    console.log({ created });
    return res.status(created.status).json({
      message: created.message,
      metadata: created.metadata,
    });
  };

  static login = async (req: Request, res: Response, next: NextFunction) => {
    console.log(`[AuthController]:: Login:`, req.body);
    const ok = new Ok({
      message: `User ${req.body.email} logged in successfully`,
      metadata: await AuthService.login(req.body),
    });
    console.log({ ok });
    return res.status(ok.status).json({
      message: ok.message,
      metadata: ok.metadata,
    });
  };

  static logout = async (req: Request, res: Response, next: NextFunction) => {
    console.log(`[AuthController]:: Logout:`, req.keyStore?._id);
    const ok = new Ok({
      message: `User ${req.keyStore?.user} logged out successfully`,
      metadata: await AuthService.logout(req.keyStore._id),
    });
    console.log({ ok });
    return res.status(ok.status).json({
      message: ok.message,
      metadata: ok.metadata,
    });
  };

  static handlerRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
    // const ok = new Ok({
    //   message: `User ${req.keyStore?.user} refreshed token successfully`,
    //   metadata: await AuthService.handlerRefreshToken(req.body.refreshToken),
    // });
    const ok = new Ok({
      message: `User ${req.keyStore?.user} refreshed token successfully`,
      metadata: await AuthService.handlerRefreshTokenv2({
        refreshToken: req.refreshtoken,
        user: req.user,
        keyStore: req.keyStore,
      }),
    });
    return res.status(ok.status).json({
      message: ok.message,
      metadata: ok.metadata,
    });
  };
}
