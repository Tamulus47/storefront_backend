import con from "../DB"

export type Product={
  id?: number;
  name: string;
  price: number;
}

export class Products{
  
  async index(): Promise<Product[]>{
    try{
      const conn= await con.connect()
      const sql= 'SELECT * FROM Products'
      const result= await conn.query(sql)
      conn.release()
      return result.rows
    }catch(err){
      throw new Error(`error: ${err}`)
    }
  } 

  async show(id: number): Promise<Product> {
    try {
      const conn = await con.connect();
      const sql = `SELECT * FROM Products WHERE id=($1)`;
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Failed to get the product with the following error: ${error}`);
    }
  }

  async create(p: Product): Promise<Product> {
    try {
      const conn = await con.connect();
      const sql = 'INSERT INTO Products (name, price) VALUES($1, $2) RETURNING *';
      const result = await conn.query(sql, [ p.name, p.price ]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Failed to add the product with the following error: ${error}`);
    }
  }
}