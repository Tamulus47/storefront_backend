import con from "../DB"

export type Order={
    id?: number;
    product_id: number;
    product_quantity: number;
    user_id: number;
    order_status:string;
}

export class Orders{
    async show(id: number): Promise<Order[]> {
        try {
          const conn = await con.connect();
          const sql = `SELECT * FROM orders WHERE user_id=($1)`;
          const result = await conn.query(sql, [id]);
          conn.release();
          return result.rows
        } catch (error) {
          throw new Error(`Failed to get the order with the following error: ${error}`);
        }
      }
    }