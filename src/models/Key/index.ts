import { model, Types, Schema } from 'mongoose';

const KeyTokenSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      required: true,
      ref: 'User',
    },
    publicKey: {
      type: String,
      required: true,
    },
    privateKey: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    refreshTokenUsed: {
      type: Array<String>,
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'Keys',
  }
);

const KeyToken = model('KeyToken', KeyTokenSchema);
export default KeyToken;
