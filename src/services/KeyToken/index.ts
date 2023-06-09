import { Types, ObjectId } from 'mongoose';
import KeyToken from '../../models/Key';
export interface KeyToken {
  user: Types.ObjectId;
  publicKey: string;
  privateKey: string;
  refreshToken?: string;
}

export default class KeyTokenService {
  //   static createKeyToken = async ({ user, publicKey }: KeyToken) => {
  //     try {
  //       const tokens = await KeyToken.create({ user, publicKey });
  //       return tokens ? tokens.publicKey : null;
  //     } catch (error) {}
  //   };
  static createKeyToken1 = async ({ user, publicKey, privateKey, refreshToken }: KeyToken) => {
    // try {
    //   const tokens = await KeyToken.create({ user, publicKey, privateKey });
    //   return tokens ? tokens.publicKey : null;
    // } catch (error) {}
    const filter = { user },
      update = { publicKey, privateKey, refreshTokenUsed: [], refreshToken },
      options = { upsert: true, new: true };
    const tokens = await KeyToken.findOneAndUpdate(filter, update, options);
    return tokens ? tokens.publicKey : null;
  };

  static findByUserId = async (userId: Types.ObjectId) => {
    const result = await KeyToken.findOne({ user: userId }).lean();
    return result || undefined;
  };

  static removeKeyById = async (id: Types.ObjectId) => {
    const delKey = await KeyToken.deleteOne({ _id: id });
    console.log(`Deactivate :: `, delKey);
    return delKey;
  };

  static findByRefreshTokenUsed = async (refreshToken: string) => {
    return await KeyToken.findOne({ refreshTokenUsed: refreshToken });
  };

  static deleteKeyById = async (userId: Types.ObjectId) => {
    return await KeyToken.deleteOne({ user: userId });
  };
  static findByRefreshToken = async (refreshToken: string) => {
    return await KeyToken.findOne({ refreshToken });
  };
}
