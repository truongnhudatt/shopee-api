import { config } from 'dotenv';
config();
export default {
  port: process.env.PORT,

  //db
  mongoDBConn: process.env.MONGODB_URI,
  // development

  dev: {
    app: {
      port: process.env.DEV_PORT,
    },
    db: {
      host: process.env.DEV_APP_HOST,
      port: process.env.DEV_APP_PORT,
      name: process.env.DEV_APP_NAME,
      user: process.env.DEV_APP_USER,
      pass: process.env.DEV_APP_PASS,
    },
  },
  //production
  prouction: {
    app: {
      port: process.env.PRO_PORT,
    },
    db: {
      host: process.env.PRO_APP_HOST,
      port: process.env.PRO_APP_PORT,
      name: process.env.PRO_APP_NAME,
      user: process.env.PRO_APP_USER,
      pass: process.env.PRO_APP_PASS,
    },
  },
};
