import supertest from 'supertest';
import { app } from '../../server';
import { Product } from '../../models/Products';
import { token } from './UsersSpec';

const request = supertest(app);

const test_product: Product = {
  name:"mouse",
  price:("100" as unknown) as number
};

let product: Product;

export function runph(){

describe('test products endpoints', () => {

    it('test create endpoint', async () => {
      await request.post('/Products').set('Authorization', token).send(test_product).expect(200).then((res) => {
        product = res.body;
      })
    });

    it('test index endpoint', async () => {
        await request.get('/Products').expect(200);
    });
  
    it('test show endpoint', async () => {
      await request.get(`/Products/${product.id}`).expect(200);
    });
  })
}