import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import cors from 'cors';
import Database from './database';
import router from './routes';
import { Request, Response, ErrorRequestHandler, NextFunction } from 'express';
import { CustomError } from './constants/Types';
const initDb = Database.getInstance().getConnection();
const app = express();
app.use(
  cors({
    credentials: true,
  })
);
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);
app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error('Not Found');
  (error as any).status = 404;
  next(error);
});
app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
  // Xử lý lỗi và gọi hàm next() hoặc trả về phản hồi lỗi
  const status = err.status || 500;
  return res.status(404).json({ message: err.message });
});
export default app;
