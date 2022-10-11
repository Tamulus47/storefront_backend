import express, { Request, Response } from 'express';
import { User,Users} from '../models/Users'

const user= new Users;

const index = async (_req: Request, res: Response) => {
    const result = await user.index()
    res.json(result)
  }

  const show = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const result = await user.show(id);
      res.json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  };

  const create = async (req: Request, res: Response) => {
    try {
      const { firstName, lastName, password } = req.body;
      const u: User = { firstName, lastName, password };
      const result = await user.create(u);
      res.json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  };

  export const user_route= (app: express.Application)=>{
    app.get('/Users', index)
    app.get('/Users/:id', show)
    app.post('/Users', create)
}