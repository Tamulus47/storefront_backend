import express, { Request, Response } from 'express';
import { Order, Orders} from '../models/Orders';
import jwt from 'jsonwebtoken'

const order = new Orders;

const index = async (req: Request, res: Response) => {
  try {
    const result= await order.index()
    res.json(result);
  } catch (error) {
    res.status(500).json(error);
  }  
}

const show = async (req: Request, res: Response) => {
  try {
    const user_id: number= parseInt(req.params.id);
    jwt.verify(req.body.token, process.env.SECRET as string);
    const result= await order.show(user_id)
    res.json(result);
  } catch (error) {
    res.status(500).json(error);
  }  
}

const createo = async (req: Request, res: Response) => {
  try {
    const { user_id, order_status }=req.body
    const o:Order={ user_id, order_status }
    const result= await order.createo(o)
    res.json(result);
  } catch (error) {
    res.status(500).json(error);
  }
}

const createop = async (req: Request, res: Response) => {
  const order_id: number= parseInt(req.params.id);
  const Product_id:number = req.body.Product_id
  const Product_quantity:number= parseInt(req.body.Product_quantity)
    try {
      const result= await order.createop(Product_quantity, order_id, Product_id)
      res.json(result);
    } catch (error) {
      res.status(500).json(error);
    }  
}

export const order_route= (app: express.Application)=>{
    app.get('/orders', index)
    app.get('/orders/:id', show)
    app.post('/orders', createo)
    app.post('/order/:id/product', createop)
}