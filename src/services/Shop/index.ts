import UserShop from '../../models/Auth';

export const findByEmail = async ({
  email,
  select = {
    email: 1,
    password: 1,
    role: 1,
  },
}: {
  email: string;
  select?: any;
}) => {
  return await UserShop.findOne({ email }).select(select).lean();
};
