import express, {Express} from 'express'
import { PORT } from './secret';
import rootRouter from './routes';
import { PrismaClient } from '@prisma/client';

const app: Express = express();
app.use(express.json())

app.use('/api', rootRouter)


export const prismaClient = new PrismaClient({
    log:['query']
})


app.listen(PORT, ()=>{
    console.log(`app listen on ${PORT}`)
})