import express, {Express, Request, Response} from 'express'
import { PORT } from './secret';

const app: Express = express();

app.get('/check-health', (req: Request, res: Response)=>{
    res.send('Working')
})


app.listen(PORT, ()=>{
    console.log(`app listen on ${PORT}`)
})