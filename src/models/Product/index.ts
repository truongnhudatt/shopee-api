import { model, Schema } from 'mongoose';
import { IProduct, ProductType, IClothing, IElectronic, IFurniture } from '../../constants/Types';

const ProductSchema = new Schema(
  {
    product_name: { type: String, required: true },
    product_thub: { type: String, required: true },
    product_description: { type: String },
    product_price: { type: Number, required: true },
    product_quantity: { type: Number, required: true },
    product_type: { type: String, required: true, enum: Object.values(ProductType) },
    product_shop: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    product_attributes: { type: Schema.Types.Mixed, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'Products',
  }
);

const Product = model<IProduct>('Product', ProductSchema);

const ClothingSchema = new Schema(
  {
    brand: { type: String, required: true },
    size: { type: String },
    material: { type: String },
    product_shop: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'Clothes',
  }
);
const Clothing = model<IClothing>('Clothing', ClothingSchema);

const ElectronicSchema = new Schema(
  {
    manufacturer: { type: String, required: true },
    model: { type: String },
    color: { type: String },
    product_shop: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'Clothes',
  }
);

const Electronic = model<IElectronic>('Electronic', ElectronicSchema);

const FurnitureSchema = new Schema(
  {
    brand: { type: String, required: true },
    size: { type: String },
    material: { type: String },
    product_shop: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'Furnitures',
  }
);

const Furniture = model<IFurniture>('Furniture', FurnitureSchema);

export { Product, Clothing, Electronic, Furniture };
