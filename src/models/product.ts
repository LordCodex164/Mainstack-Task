import mongoose, { Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  price: number;
  description: string;
}

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
});

export default mongoose.model<IProduct>('Product', productSchema);