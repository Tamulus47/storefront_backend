import supertest from 'supertest';
import { app } from '../../server';
import jwt from 'jsonwebtoken';
import { User } from '../../models/Users'; 

const request = supertest(app);

const user: User = {
  firstName:"no",
  lastName:"name",
  password:"123"
};

export let token: string;

let id: string;

export function runuh(){

describe('test users endpoints', () => {
  
    it('test create endpoint', async () => {
      await request.post('/Users').send(user).expect(200).then((res) => {
          token = res.text.replace(/['"]+/g, '');
          const JWT = jwt.verify(token, process.env.SECRET as string) as jwt.JwtPayload;
          id = JWT.user
        })
    });
  
    it('test index endpoint', async () => {
      await request.get('/Users').send({token}).expect(200);
    });

    it('test show endpoint', async () => {
      await request.get(`/Users/${id}`).send(user).send({token}).expect(200);

    });
  })
}