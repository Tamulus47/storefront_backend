import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import { product_route } from './models/Products' 

const app: express.Application = express()
const address: string = "127.0.0.1:8080"
app.use(bodyParser.json())

app.get('/', function (_req: Request, res: Response) {
    res.send('Hello World!')
})

app.listen(8080, function () {
    console.log(`starting app on: ${address}`)
})

product_route(app)