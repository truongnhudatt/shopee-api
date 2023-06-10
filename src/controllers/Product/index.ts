import { SuccessResponse } from '../../core/Success';
import { Request, Response, NextFunction } from 'express';
import { httpStatusCode } from '../../utils/httpStatusCode';
import { ProductFactory } from '../../services/Product';

export default class ProductController {
  static createProduct = async (req: Request, res: Response, next: NextFunction) => {
    const success = new SuccessResponse(
      'Product created',
      httpStatusCode.StatusCodes.OK,
      httpStatusCode.ReasonPhrases.OK,
      await ProductFactory.createProduct(req.body.product_type, {
        ...req.body,
        product_shop: req.user.userId,
      })
    );
    return res.status(success.status).json({
      ...success,
    });
  };
}
