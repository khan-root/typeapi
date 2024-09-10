import express, {Express} from 'express'
import { PORT } from './secret';
import rootRouter from './routes';
import { PrismaClient } from '@prisma/client';
import { errorMiddleware } from './middlewares/errors';
import { signupSchema } from './schemas/users';

const app: Express = express();
app.use(express.json())

app.use('/api', rootRouter)


export const prismaClient = new PrismaClient({
    log:['query']
}).$extends({
    query:{
        user:{
            create({args, query}){
                args.data = signupSchema.parse(args.data)
                return query(args)
            }
        }
    }
})

app.use(errorMiddleware)

app.listen(PORT, ()=>{
    console.log(`app listen on ${PORT}`)
})