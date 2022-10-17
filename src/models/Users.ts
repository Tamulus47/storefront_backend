import con from "../DB"
import bcrypt from 'bcrypt';

export type User={
    id?: number;
    firstName: string;
    lastName: string;
    password: string;
}

const { PEPPER, SALT_ROUNDS } = process.env;

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
    
    async show(id: number, password: string): Promise<User | null> {
      try {
        const conn = await con.connect();
        const sql = 'SELECT * FROM users WHERE id=($1)';
        const result = await conn.query(sql, [id]);
        const user = result.rows[0];
        if (user) {
          if (bcrypt.compareSync(password + PEPPER, user.password)) {
            return user;
          }else{
            throw new Error("password is incorrect")
          }
        }else{
          throw new Error("id or password is incorrect")
        }
      } catch (error) {
        throw new Error(`Failed to show user with the following error: ${error}`);
      }
    }

    async test_show(id: number): Promise<User>{
      try {
        const conn = await con.connect();
        const sql = 'SELECT * FROM users WHERE id=($1)';
        const result = await conn.query(sql, [id]);
        return result.rows[0];
      }catch (error) {
          throw new Error(`Failed to show user with the following error: ${error}`);
        }
      }

      async create(u: User): Promise<User> {
        try {
          const conn = await con.connect();
          const sql = 'INSERT INTO users ("firstName", "lastName", "password") VALUES($1, $2, $3) RETURNING *'
          const hashed_password=bcrypt.hashSync(u.password + PEPPER, Number(SALT_ROUNDS))
          const result = await con.query(sql, [ u.firstName, u.lastName, hashed_password ]);
          conn.release();
          return result.rows[0];
        } catch (error) {
          throw new Error(`Failed to add the user with the following error: ${error}`);
        }
      }
    }