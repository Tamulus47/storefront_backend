import express, { Request, Response } from 'express';
import { User,Users} from '../models/Users'
import jwt from 'jsonwebtoken'

const user= new Users;

const index = async (req: Request, res: Response) => {
  try {
    jwt.verify(req.body.token, process.env.SECRET as string);
    const result = await user.index()
    res.json(result)
  } catch (error) {
    res.status(500).json(error);
  }}

  const show = async (req: Request, res: Response) => {
    try {
      jwt.verify(req.body.token, process.env.SECRET as string)
      const id = Number(req.params.id)
      const password = req.body.password
      const tokenpl= jwt.verify(req.body.token, process.env.SECRET as string) as jwt.JwtPayload
      if(tokenpl.user === id){
        const result = await user.show(id,password);
        res.json(result);
      }else{
        throw new Error("token id doesn't match")
      }
    } catch (error) {
      res.status(500).json(error);
    }
  };

  const create = async (req: Request, res: Response) => {
    try {
      const { firstName, lastName, password } = req.body;
      const u: User = { firstName, lastName, password };
      const result = await user.create(u);
      const token = jwt.sign({ user:  result.id }, process.env.SECRET as string)
      res.json(token);
    } catch (error) {
      res.status(500).json(error);
    }
  };

  export const user_route= (app: express.Application)=>{
    app.get('/Users', index)
    app.get('/Users/:id', show)
    app.post('/Users', create)
}