import { Product, Clothing, Electronic, Furniture } from '../../models/Product';
import { IElectronic, IProduct, ProductType, IFurniture } from '../../constants/Types';
import { Model, Types } from 'mongoose';
import { BadRequestError } from '../../core/Error';
export class ProductFactory {
  static productRegistry: {
    [key: string]: any;
  } = {};

  static registerProduct(type: string, classRef: any) {
    ProductFactory.productRegistry[type] = classRef;
  }
  static async createProduct(type: string, payload: any) {
    console.log(`[ProductFactory] creating Product:: `, payload);
    const productClass = ProductFactory.productRegistry[type];
    if (!productClass) throw new BadRequestError('Invalid Product Types ${type}');
    return new productClass(payload).createProduct();
    switch (type) {
      case ProductType.ELECTRONIC:
        return new ElectronicService(payload).createProduct();
      case ProductType.CLOTHING:
        return new ClothingService(payload).createProduct();
      default:
        throw new BadRequestError('Invalid Product Types ${type}');
    }
  }
}

export class ProductService {
  public product_name: string;
  public product_thub: string;
  public product_description: string;
  public product_price: number;
  public product_quantity: number;
  public product_type: string;
  public product_shop: Types.ObjectId;
  public product_attributes: [];
  constructor({
    product_name,
    product_thub,
    product_description,
    product_price,
    product_quantity,
    product_type,
    product_shop,
    product_attributes,
  }: IProduct) {
    this.product_name = product_name;
    this.product_thub = product_thub;
    this.product_description = product_description;
    this.product_price = product_price;
    this.product_quantity = product_quantity;
    this.product_type = product_type;
    this.product_shop = product_shop;
    this.product_attributes = product_attributes;
  }
  async createProduct(product_id: Types.ObjectId) {
    return await Product.create({ ...this, _id: product_id });
  }
}

export class ClothingService extends ProductService {
  constructor({
    product_name,
    product_thub,
    product_description,
    product_price,
    product_quantity,
    product_type,
    product_shop,
    product_attributes,
  }: IProduct) {
    super({
      product_name,
      product_thub,
      product_description,
      product_price,
      product_quantity,
      product_type,
      product_shop,
      product_attributes,
    });
  }
  async createProduct() {
    const resultClothing = await Clothing.create({
      ...this.product_attributes,
      product_shop: this.product_shop,
    });
    if (!resultClothing) throw new BadRequestError('Create new clothing error');

    const newProduct = await super.createProduct(resultClothing._id);
    if (!newProduct) throw new BadRequestError('Create new product error');

    return newProduct;
  }
}

export class ElectronicService extends ProductService {
  constructor({
    product_name,
    product_thub,
    product_description,
    product_price,
    product_quantity,
    product_type,
    product_shop,
    product_attributes,
  }: IProduct) {
    super({
      product_name,
      product_thub,
      product_description,
      product_price,
      product_quantity,
      product_type,
      product_shop,
      product_attributes,
    });
  }
  async createProduct() {
    const resultElectronic = await Electronic.create({
      ...this.product_attributes,
      product_shop: this.product_shop,
    });
    if (!resultElectronic) throw new BadRequestError('Create new electronic error');
    const newProduct = await super.createProduct(resultElectronic._id);
    if (!newProduct) throw new BadRequestError('Create new product error');

    return newProduct;
  }
}
export class FurnitureService extends ProductService {
  constructor({
    product_name,
    product_thub,
    product_description,
    product_price,
    product_quantity,
    product_type,
    product_shop,
    product_attributes,
  }: IProduct) {
    super({
      product_name,
      product_thub,
      product_description,
      product_price,
      product_quantity,
      product_type,
      product_shop,
      product_attributes,
    });
  }
  async createProduct() {
    const resultFurniture = await Furniture.create({
      ...this.product_attributes,
      product_shop: this.product_shop,
    });
    if (!resultFurniture) throw new BadRequestError('Create new Furniture error');
    const newProduct = await super.createProduct(resultFurniture._id);
    if (!newProduct) throw new BadRequestError('Create new product error');

    return newProduct;
  }
}

ProductFactory.registerProduct(ProductType.FURNITURE, FurnitureService);
ProductFactory.registerProduct(ProductType.CLOTHING, ClothingService);
ProductFactory.registerProduct(ProductType.ELECTRONIC, ElectronicService);
