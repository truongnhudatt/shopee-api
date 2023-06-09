import { model, Types, Schema } from 'mongoose';
import { IUser, UserRole, UserStatus } from '../../constants/Types';
const userShopSchema: Schema = new Schema(
  {
    avatar: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    username: {
      type: String,
      trim: true,
      lowercase: true,
      sparse: true,
      unique: true,
    },
    email: { type: String, required: true, lowercase: true, trim: true, unique: true },
    emailVerified: { type: Boolean, default: false },
    password: { type: String, required: true },
    resetPasswordToken: { type: String },
    phone: { type: String },
    role: {
      type: String,
      enum: [UserRole.ADMIN, UserRole.USER],
      default: UserRole.USER,
      required: true,
    },
    status: {
      type: String,
      enum: [UserStatus.ACTIVE, UserStatus.INACTIVE],
      default: UserStatus.INACTIVE,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    collection: 'Users',
  }
);

const UserShop = model<IUser>('User', userShopSchema);

export default UserShop;
