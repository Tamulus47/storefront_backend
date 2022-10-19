import supertest from 'supertest';
import { app } from '../../server';
import { Order } from '../../models/Orders';
import { token } from './UsersSpec';

const request = supertest(app);

const test_order: Order = {
    user_id: 1,
    order_status: "active"
};

type prod_type={
    order_id: number
    Product_id: number;
    Product_quantity :number;
}

const order_product: prod_type={
    order_id: 1, 
    Product_id: 1,
    Product_quantity:5 
}

export function runoh(){

describe('test orders endpoints', () => {

    it('test createo endpoint', async () => {
        await request.post('/orders').send(test_order).expect(200)
    });

    it('test index endpoint', async () => {
        await request.get('/orders').expect(200);
    });
    
    it('test show endpoint', async () => {
        await request.get(`/orders/${test_order.user_id}`).send({token}).expect(200);
    });

    it('test createop endpoint', async () => {
        await request.post(`/order/${order_product.order_id}/product`).send(order_product).expect(200);
    });
})
}