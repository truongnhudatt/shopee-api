import ApiKey from '../../models/ApiKey';
import crypto from 'crypto';
export const findById = async (key: string) => {
  //   const api_key = await ApiKey.create({
  //     key: crypto.randomBytes(64).toString('hex'),
  //     permissions: ['0000'],
  //   });
  //   console.log({ api_key });
  const objKey = await ApiKey.findOne({ key, status: true }).lean();
  return objKey;
};
// 39d1e42eee58f299b0835c8c3d1f04cfe22394fad93461854ca974a96d33ddbb14c8cd617ee6f35a72f3b373c9a9619b994d4a8b64215cd2ea724f6d8ff7fac6
