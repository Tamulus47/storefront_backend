import { runom } from "./models/OrdersSpec";
import { runum } from "./models/UsersSpec";
import { runpm } from "./models/ProductsSpec";
import { runph } from "./handlers/ProductsSpec";
import { runuh } from "./handlers/UsersSpec";
import { runoh } from "./handlers/OrdersSpec";

async function run_models(){
    new Promise((resolve)=>{resolve(runum())}).then(()=>{runpm()}).finally(()=>{runom()})
}
    
async function run_handlers(){
    await run_models().then(()=>{runuh()}).then(()=>{runph()}).finally(()=>{runoh()}) 
}
    
run_handlers()