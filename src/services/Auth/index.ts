import UserShop from '../../models/Auth';
import bcrypt from 'bcrypt';
import { UserRole, KeyStore } from '../../constants/Types';
import crypto from 'crypto';
import KeyTokenService from '../KeyToken';
import { createKeyPair, createTokenPair } from '../../utils/Auth';
import { getInfoData } from '../../utils';
import { AuthFailureError, BadRequestError } from '../../core/Error';
import { findByEmail } from '../Shop';
import { Types } from 'mongoose';
export interface AuthRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  status: number;
  message: string | undefined;
  metadata?: Object;
}
export default class AuthService {
  static signUp = async ({ email, password }: AuthRequest) => {
    console.log(`[AuthService]:: Sign Up:`);
    const checkUserExists = await UserShop.findOne({ email }).lean();
    if (checkUserExists) {
      throw new BadRequestError('User already signed up');
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await UserShop.create({ email, password: hashPassword, role: UserRole.USER });
    if (newUser) {
      const privateKey1 = crypto.randomBytes(64).toString('hex');
      const publicKey1 = crypto.randomBytes(64).toString('hex');
      const keyStorage = await KeyTokenService.createKeyToken1({
        user: newUser._id,
        publicKey: publicKey1,
        privateKey: privateKey1,
      });
      if (!keyStorage) {
        throw new BadRequestError('keyStorage / Internal Server Error');
      }
      const tokens = await createTokenPair(
        {
          userId: newUser._id,
          email: newUser.email,
          password: newUser.password,
        },
        publicKey1,
        privateKey1
      );
      console.log(`Created token successfully:: `, tokens);
      const metadata = {
        ...getInfoData({ fields: ['_id', 'email', 'role', 'status'], object: newUser }),
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      };
      return metadata;
      // const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
      //   modulusLength: 4096,
      //   publicKeyEncoding: { type: 'pkcs1', format: 'pem' },
      //   privateKeyEncoding: { type: 'pkcs1', format: 'pem' },
      // });
      // const publicKeyString = await KeyTokenService.createKeyToken({
      //   user: newUser._id,
      //   publicKey,
      // });
      // if (!publicKeyString) {
      //   return { status: 400, message: 'Invalid' };
      // }
      // console.log({ publicKeyString });
      // const tokens = await createTokenPair(
      //   {
      //     userId: newUser._id,
      //     email: newUser.email,
      //     password: newUser.password,
      //   },
      //   publicKeyString,
      //   privateKey
      // );
      // console.log(`Created token successfully:: `, tokens);
      // return {
      //   status: 200,
      //   message: 'User created successfully',
      //   metadata: {
      //     newUser: getInfoData({ fields: ['_id', 'email', 'role', 'status'], object: newUser }),
      //     tokens,
      //   },
      // };
    }
  };

  static login = async ({
    email,
    password,
    refreshToken,
  }: {
    email: string;
    password: string;
    refreshToken?: string;
  }) => {
    console.log(`[AuthService]:: Login:`, { email, password, refreshToken });
    const foundShop = await findByEmail({ email });
    if (!foundShop) {
      throw new BadRequestError('User not found');
    }
    const matchPassword = await bcrypt.compare(password, foundShop.password as string);
    if (!matchPassword) {
      throw new AuthFailureError('Authentication failed');
    }
    const { privateKey, publicKey } = await createKeyPair();
    const tokens = await createTokenPair(
      {
        userId: foundShop._id,
        email: foundShop.email,
        password: foundShop.password,
      },
      publicKey,
      privateKey
    );
    await KeyTokenService.createKeyToken1({
      user: foundShop._id,
      publicKey,
      privateKey,
      refreshToken: tokens.refreshToken,
    });
    console.log(`Created token successfully:: `, tokens);
    const metadata = {
      ...getInfoData({ fields: ['_id', 'email', 'role', 'status'], object: foundShop }),
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
    return metadata;
  };

  static logout = async (keyStoreId: any) => {
    console.log(`[AuthService]:: Logout:`, keyStoreId);
    return await KeyTokenService.removeKeyById(keyStoreId);
  };
}
