import express, { Router } from 'express';
import AuthController from '../../controllers/Auth';
import { asyncHandler } from '../../middlewares/HandlerError/index';
import { authenticationv2 } from '../../helpers/Auth';

const route: Router = express.Router();

route.post('/shop/signup', asyncHandler(AuthController.signUp));
route.post('/shop/login', asyncHandler(AuthController.login));
route.use(authenticationv2);

route.post('/shop/logout', asyncHandler(AuthController.logout));
route.post('/shop/refreshtoken', asyncHandler(AuthController.handlerRefreshToken));

export default route;
