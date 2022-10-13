import con from "../DB"

export type User={
    id?: number;
    firstName: string;
    lastName: string;
    password: string;
}

export class Users{
    async index(): Promise<User[]>{
        try{
        const conn= await con.connect()
        const sql= 'SELECT * FROM users'
        const result= await conn.query(sql)
        conn.release()
        return result.rows
        }catch(err){
        throw new Error(`error: ${err}`)
        }
    }
    
    async show(id: number): Promise<User> {
        try {
          const conn = await con.connect();
          const sql = `SELECT * FROM users WHERE id=($1)`;
          const result = await conn.query(sql, [id]);
          conn.release();
          return result.rows[0];
        } catch (error) {
          throw new Error(`Failed to get the user with the following error: ${error}`);
        }
      }

      async create(u: User): Promise<User> {
        try {
          const conn = await con.connect();
          const sql = 'INSERT INTO users ("firstName", "lastName", "password") VALUES($1, $2, $3) RETURNING *';
          const result = await conn.query(sql, [ u.firstName, u.lastName, u.password ]);
          conn.release();
          return result.rows[0];
        } catch (error) {
          throw new Error(`Failed to add the user with the following error: ${error}`);
        }
      }
    }