import { Request, Response } from 'express';
import Product from '../../models/product';

export const getProducts = async (req: Request, res: Response): Promise<void | Response> => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        res.json(product);
    } catch (error) {  
        res.status(500).json({ error });
    }
}

export const createProduct = async (req: Request, res: Response) => {
  const { name, price, description } = req.body;
  try {
    const product = new Product({ name, price, description });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, price, description } = req.body;
  try {
    const product = await Product.findByIdAndUpdate(id, { name, price, description }, { new: true });
    res.json(product);
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error });
  }
};