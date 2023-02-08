import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express"
interface IPayload{
    _id: string;
    ist: number;
    exp: number;
}

export const TokenValidation = (req : Request, res: Response ,next: NextFunction) => {
    const token = req.header('auth-token');
    if(!token) return res.status(401).json('Acces denied');
    
    const payload = jwt.verify(token, process.env.TOKEN_SECRET || 'tokentest') as IPayload;
    req.secretaryId = payload._id;

    next();
}