import mongoose, { Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true 
  },
  description: { 
    type: String, 
    required: true
   },
  imageUrl: { 
    type: String, 
  },
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  }
});

export default mongoose.model<IProduct>('Product', productSchema);