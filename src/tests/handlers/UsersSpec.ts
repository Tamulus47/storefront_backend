import supertest from 'supertest';
import { app } from '../../server';
import { JwtPayload, verify } from 'jsonwebtoken';
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
          const SECRET = process.env.SECRET as string;
          const JWT = verify(token, SECRET) as JwtPayload;
          id = JWT.user.id
        })
    });
  
    it('test index endpoint', async () => {
      await request.get('/Users').set('Authorization', token).expect(200);
    });

    it('test show endpoint', async () => {
      await request.get(`/Users/${id}`).send(user).set('Authorization', token).expect(200);
    });
  })
}