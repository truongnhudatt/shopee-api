import mongoose from 'mongoose';
import config from '../config/config';
import { countConnections } from '../helpers/check-connection';

const MONGODB_URI = config.mongoDBConn || 'mongodb://localhost:27017';
console.log(MONGODB_URI);

export default class Database {
  private static instance: Database;
  private connection: mongoose.Connection;
  private constructor() {
    if (1 == 1) {
      mongoose.set('debug', true);
      mongoose.set('debug', { color: true });
    }

    mongoose.connect(MONGODB_URI, {
      maxPoolSize: 50,
    });

    this.connection = mongoose.connection;

    this.connection.once('open', () => {
      countConnections();
      console.log(`Connection established`);
    });

    this.connection.on('error', (err) => {
      console.error(err);
    });
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public getConnection(): mongoose.Connection {
    return this.connection;
  }
}
