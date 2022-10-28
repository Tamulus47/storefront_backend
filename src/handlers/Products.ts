import express, { Request, Response } from 'express';
import { Product,Products } from '../models/Products';
import jwt from 'jsonwebtoken'

const product= new Products;

const index = async (req: Request, res: Response) => {
  try {
    jwt.verify(req.body.token, process.env.SECRET as string);
    const result = await product.index()
    res.json(result)
  } catch (error) {
    res.status(500).json(error);
  }
  }

  const show = async (req: Request, res: Response) => {
    try {
      jwt.verify(req.body.token, process.env.SECRET as string);
      const id = Number(req.params.id);
      const result = await product.show(id);
      res.json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  };

  const create = async (req: Request, res: Response) => {
    try {
      jwt.verify(req.body.token, process.env.SECRET as string);
      const { name, price } = req.body;
      const p: Product = { name, price };
      const result = await product.create(p);
      res.json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  };

  export const product_route= (app: express.Application)=>{
    app.get('/Products', index)
    app.get('/Products/:id', show)
    app.post('/Products', create)
}