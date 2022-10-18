import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import { product_route } from './handlers/Products'
import { user_route } from './handlers/Users'
import { order_route } from './handlers/Orders'
import cors from 'cors'

export const app: express.Application = express()
const address: string = "127.0.0.1:8080"
app.use(bodyParser.json())

app.get('/', function (_req: Request, res: Response) {
    res.send('Hello World!')
})

app.listen(8080, function () {
    console.log(`starting app on: ${address}`)
})

const CorsOptions={
    optionsSuccessStatus:200
}

app.use(cors(CorsOptions))

product_route(app);
user_route(app);
order_route(app);