import con from "../DB"

export type Order={
    id?: number;
    user_id: number;
    order_status:string;
}

export type addp={
  Product_quantity:number;
  order_id:number;
  Product_id:number;
}

  export class Orders{

    async index(): Promise<Order[]>{
      try{
      const conn= await con.connect()
      const sql= 'SELECT * FROM orders'
      const result= await conn.query(sql)
      conn.release()
      return result.rows
      }catch(err){
      throw new Error(`error: ${err}`)
      }
  }
  
  async show(userid: number): Promise<Order[]> {
      try {
        const conn = await con.connect();
        const sql = `SELECT id,order_status FROM orders WHERE user_id=($1)`;
        const result = await conn.query(sql, [userid]);
        conn.release();
        return result.rows;
      } catch (error) {
        throw new Error(`Failed to get the order with the following error: ${error}`);
      }
    }

    async createo(o: Order): Promise<Order> {
      try {
        const conn = await con.connect();
        const sql = 'INSERT INTO orders (user_id, order_status) VALUES($1, $2) RETURNING *';
        const result = await conn.query(sql, [ o.user_id, o.order_status ]);
        conn.release();
        return result.rows[0];
      } catch (error) {
        throw new Error(`Failed to add the order with the following error: ${error}`);
      }
    }

    async createop(Product_quantity: number, order_id: number, Product_id: number): Promise<addp> {
      try {
        const conn = await con.connect();
        const sql = 'INSERT INTO orders_products ("Product_quantity", "Product_id", order_id) VALUES($1, $2, $3) RETURNING *';
        const result = await conn.query(sql, [ Product_quantity, Product_id, order_id ]);
        conn.release();
        return result.rows[0]
      } catch (error) {
        throw new Error(`Failed to get the order with the following error: ${error}`);
      }
    }
}