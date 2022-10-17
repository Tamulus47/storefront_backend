import express, { Request, Response } from 'express';
import { User,Users} from '../models/Users'
import { verify_auth, gen_token } from "../helpers/JWT-helper";

const user= new Users;

const index = async (req: Request, res: Response) => {
  try {
  verify_auth(req)
  const result = await user.index()
  res.json(result)
  } catch (error) {
    res.status(500).json(error);
  }}

  const show = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      verify_auth(req, id);
      const { password } = req.body;
      const result = await user.show(id,password);
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
      const JWT = gen_token(Number(result.id));
      res.json(JWT);
    } catch (error) {
      res.status(500).json(error);
    }
  };

  export const user_route= (app: express.Application)=>{
    app.get('/Users', index)
    app.get('/Users/:id', show)
    app.post('/Users', create)
}