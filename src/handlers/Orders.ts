import express, { Request, Response } from 'express';
import { Order,Orders} from '../models/Orders'

const order= new Orders;

const show = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.user_id);
      const result = await order.show(id);
      res.json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  };

  export const order_route= (app: express.Application)=>{
    app.get('/UserOrders/:user_id', show)
}