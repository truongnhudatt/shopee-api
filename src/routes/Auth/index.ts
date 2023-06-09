import express, { Router } from 'express';
import AuthController from '../../controllers/Auth';
import { asyncHandler } from '../../middlewares/HandlerError/index';
import { authentication } from '../../helpers/Auth';

const route: Router = express.Router();

route.post('/shop/signup', asyncHandler(AuthController.signUp));
route.post('/shop/login', asyncHandler(AuthController.login));
route.use(authentication);

route.post('/shop/logout', asyncHandler(AuthController.logout));

export default route;
