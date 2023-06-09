import { Types, Document } from 'mongoose';
import { Request } from 'express';
export enum UserRole {
  ADMIN = 'Admin',
  USER = 'User',
}
export enum UserStatus {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
}
export interface IUser extends Document {
  _id: Types.ObjectId;
  email: String;
  password: String;
  role: UserRole;
}

export interface IAuthRequest extends Request {
  user: IUser;
}

export interface CustomError extends Error {
  status: number;
  message: string;
}

export interface KeyStore {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  publicKey: string;
  privateKey: string;
  refreshToken: string;
  refreshTokenUsed: string[];
}
