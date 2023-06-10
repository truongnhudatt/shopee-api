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

export enum ProductType {
  ELECTRONIC = 'Electronic',
  CLOTHING = 'Clothing',
  FURNITURE = 'Furniture',
}

export interface IProduct {
  product_name: string;
  product_thub: string;
  product_description: string;
  product_price: number;
  product_quantity: number;
  product_type: ProductType;
  product_shop: Types.ObjectId;
  product_attributes?: any;
}

export interface IClothing extends IProduct {
  brand: string;
  size: string;
  material: string;
}
export interface IElectronic extends IProduct {
  manufacturer: string;
  model: string;
  color: string;
}

export interface IFurniture extends IProduct {
  brand: string;
  size: string;
  material: string;
}
