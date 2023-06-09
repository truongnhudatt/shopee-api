import { model, Schema, Document } from 'mongoose';

interface IApiKey extends Document {
  key: string;
  status: boolean;
  permissions: string[];
}

const ApiKeySchema: Schema<IApiKey> = new Schema<IApiKey>(
  {
    key: { type: String, required: true, unique: true },
    status: {
      type: Boolean,
      default: true,
    },
    permissions: {
      type: [String],
      required: true,
      enum: ['0000', '1111', '2222'],
    },
  },
  { timestamps: true, versionKey: false, collection: 'ApiKeys' }
);

const ApiKey = model<IApiKey>('ApiKey', ApiKeySchema);

export default ApiKey;
