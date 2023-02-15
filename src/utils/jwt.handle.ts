import { handleHttp } from '../utils/error.handle';
import {sign, verify} from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express"
const JWT_TOKEN = process.env.JWT_SECRET || 'tokentest';

interface IPayload{
    _id: string;
    ist: number;
    exp: number;
}

export const generateToken = (_id:string) => {
   const jwt = sign({_id}, JWT_TOKEN,{
    expiresIn: 60 * 60 *2,
   });
   return jwt;
}
export const verifyToken = (req : Request, res: Response ,next: NextFunction) => {
    const token = req.cookies["auth-token"];
    console.log(token);
    if(!token) return res.status(401).json({"error": 'TOKEN_MISSING'});
    try{
        const payload = verify(token, JWT_TOKEN) as IPayload;
        req.secretaryId = payload._id;
        next();
    }catch(e){
        handleHttp(res, 'ERROR_VERIFICATION_TOKEN',e);
    }
    
}


// export const verifyToken = (jwt:string) => {
//     const isCorrect = verify(jwt, JWT_TOKEN);
//     return isCorrect;
// }

