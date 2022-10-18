import { Product,Products } from "../../models/Products";

const product= new Products;

const ProductTest:Product={
    name: "phone",
    price: ("$1,000.00" as unknown) as number
}

let result:Product;

export function runpm(){

describe("test products model",()=>{
    
    beforeAll(async()=>{
        result = await product.create(ProductTest);
    })

    it("create method exist",()=>{
        expect(product.create).toBeDefined();
    })

    it("index method exist",()=>{
        expect(product.index).toBeDefined();
    })

    it("show method exist",()=>{
        expect(product.show).toBeDefined();
    })

    it("test create method",()=>{
        expect({ name: result.name, price: result.price }).toEqual({ name: ProductTest.name, price: ProductTest.price })
    })

    it("test index method",async()=>{
        const products = await product.index();
        expect(products).toContain(result)
    })

    it("test show method",async()=>{
        const Product = await product.show(result.id as number);
        expect(Product).toEqual(result);
    })
})
}