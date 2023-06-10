import express, { Router } from 'express';
import { asyncHandler } from '../../middlewares/HandlerError/index';
import { authenticationv2 } from '../../helpers/Auth';
import ProductController from '../../controllers/Product';
const shopRouter: Router = express.Router();

shopRouter.use(authenticationv2);

shopRouter.post('/create', asyncHandler(ProductController.createProduct));

export default shopRouter;
