import { Order, Orders, addp } from "../../models/Orders";

const ord= new Orders

const order_test:Order={
    user_id: 1,
    order_status: "active"
}

const Prod:addp={
    Product_quantity: 1,
    order_id: 1,
    Product_id:1  
}

let result:Order;

export function runom(){

describe("test orders model", ()=>{

    beforeAll(async()=>{
        result = await ord.createo(order_test);
    })

    it("create method exist",()=>{
        expect(ord.createo).toBeDefined();
    })

    it("index method exist",()=>{
        expect(ord.index).toBeDefined();
    })

    it("show method exist",()=>{
        expect(ord.show).toBeDefined();
    })

    it("test create method",()=>{
        expect({ user_id: result.user_id, order_status: result.order_status }).toEqual({ user_id: order_test.user_id, order_status: order_test.order_status })
    })

    it("test index method",async()=>{
        const products = await ord.index();
        expect(products).toContain(result)
    })

    it("test add_products method",async()=>{
         const add= await ord.createop(Prod.Product_quantity, Prod.order_id, Prod.Product_id)
         expect({ Product_quantity: add.Product_quantity, Product_id: add.Product_id, order_id:add.order_id }).toEqual({ Product_quantity: Prod.Product_quantity, Product_id: Prod.Product_id, order_id: Prod.order_id })
    })

    it("test show method",async()=>{
        const Product = await ord.show(result.user_id as number);
        expect({ id: Product[0].id, order_status:Product[0].order_status }).toEqual({ id: result.id, order_status: result.order_status });
    })
})
}