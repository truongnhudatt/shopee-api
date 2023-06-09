import jwt from 'jsonwebtoken';
import crypto from 'crypto';
export const createTokenPair = async (payload: any, publicKey: string, privateKey: string) => {
  const accessToken = await jwt.sign(payload, publicKey, {
    expiresIn: '2 days',
  });
  const refreshToken = await jwt.sign(payload, privateKey, {
    expiresIn: '7 days',
  });
  jwt.verify(accessToken, publicKey, (err, decoded) => {
    if (err) {
      console.log(`Error signing:: `, err);
    } else {
      console.log(`Successfully signed:: `, decoded);
    }
  });
  return { accessToken, refreshToken };
};

export const createKeyPair = async () => {
  const privateKey = await crypto.randomBytes(64).toString('hex');
  const publicKey = await crypto.randomBytes(64).toString('hex');
  return { privateKey, publicKey };
};
