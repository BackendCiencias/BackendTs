import {sign, verify} from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express"
const JWT_TOKEN = process.env.JWT_SECRET || 'tokentest';

interface IPayload{
    id: string;
    ist: number;
    exp: number;
}

export const generateToken = (id:string) => {
   const jwt = sign({id}, JWT_TOKEN,{
    expiresIn: 60 * 60 *24
   });
   return jwt;
}
export const verifyToken = (req : Request, res: Response ,next: NextFunction) => {
    const token = req.cookies["auth-token"];
    if(!token) return res.status(401).json('Acces denied');
    
    const payload = verify(token, JWT_TOKEN) as IPayload;
    req.secretaryId = payload.id;

    next();
}

