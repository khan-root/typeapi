import { NextFunction, Request, Response } from "express"
import { prismaClient } from ".."
import { compareSync, hashSync } from "bcrypt"
import * as jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../secret"
import { BadRequestException } from "../exceptions/bad-request"
import { ErrorCodes } from "../exceptions/root"
export const signup = async(req: Request, res: Response, next: NextFunction)=>{

    const {email, password, name} = req.body
    
    let user = await  prismaClient.user.findFirst({where: {email}})

    if(user){
        return next(new BadRequestException('User Already Exists', ErrorCodes.USER_ALREADY_EXISTS))
    }
    user = await prismaClient.user.create({
        data: {
            name,
            email, 
            password: hashSync(password, 10)
        }
    })
    res.json(user)
}


export const login = async(req: Request, res:Response, next:NextFunction)=>{
    const {email, password} = req.body 
    let user = await prismaClient.user.findFirst({where: {email}})

    if(!user){
        return next(new BadRequestException('User Not Exists', ErrorCodes.USER_NOT_FOUND))
    }

    if(!compareSync(password, user.password)){
        // throw Error ("Incorrect Password")
       return next(new BadRequestException('Incorrect Password', ErrorCodes.INCORRECT_PASSWORD))
    }

    const token = jwt.sign({
        userId: user.id,

    }, JWT_SECRET)

    res.json({...user, token})
}