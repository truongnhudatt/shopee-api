import express, { Router, Request, Response, NextFunction } from 'express';
import route from './Auth';
import { apiKey, checkPermission } from '../middlewares/Auth';
import shopRouter from './Shop';
const router: Router = express.Router();

router.use(apiKey);

router.use(checkPermission('0000'));

router.use('/api/v1', route);
router.use('/api/v1/product', shopRouter);

export default router;
