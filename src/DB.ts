import dotenv from "dotenv"
import { Pool } from "pg"

dotenv.config()

const {
DB_host,
DB_name,
DB_test_name,
DB_user,
DB_ps,
ENV
 } = process.env

 let con;
 
if(ENV === "test"){
   con = new Pool({
       host:DB_host,
       database:DB_test_name,
       user:DB_user,
       password:DB_ps
    })}

if(ENV === "dev"){
   con = new Pool({
    host:DB_host,
    database:DB_name,
    user:DB_user,
    password:DB_ps
 })}

 export default con as Pool