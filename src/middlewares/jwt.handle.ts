import Role, { IRole } from './../models/role.model';
import Director, { IDirector } from './../models/director.model';
import Secretary, { ISecretary } from './../models/secretary.model';
import { IPayload } from '../interfaces/payload';
import { handleHttp } from '../utils/error.handle';
import {sign, verify} from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express"
const JWT_TOKEN = process.env.JWT_SECRET || 'tokentest';

export const generateToken = (_id:string) => {
   const jwt = sign({_id}, JWT_TOKEN,{
    expiresIn: 60 * 60 *2,
   });
   return jwt;
}
export const verifyToken = (req : Request, res: Response ,next: NextFunction) => {
    // const token = req.cookies["auth-token"];
    // console.log(token);
    const jwtByUser = req.headers.authorization || '';
    const token =jwtByUser.split(' ').pop();
    // console.log(token);
    if(!token) return res.status(401).json({"error": 'TOKEN_MISSING'});
    try{
        const payload = verify(token, JWT_TOKEN) as IPayload;
        req.userId = payload._id;
        next();
    }catch(e){
        handleHttp(res, 'ERROR_VERIFICATION_TOKEN',e);
    }
}

export const isDirector = async (req : Request, res: Response ,next: NextFunction) => {
    const director = await Director.findById(req.userId);
    if(!director) return res.status(401).json({"error": 'UNAUTHORIZED'});
    const roles = await Role.find({_id: {$in: director.roles}})
    for(let i = 0; i < roles.length; i++){
        if(roles[i].name === 'director'){
            next();            
            return;
        }
    }
    return res.status(401).json({"error": 'Require Director Role'});
    next();
}

export const isSecretary = async (req : Request, res: Response ,next: NextFunction) => {
    const secretary = await Secretary.findById(req.userId);
    if(!secretary) return res.status(401).json({"error": 'UNAUTHORIZED'});
    const roles = await Role.find({_id: {$in: secretary.roles}});
    for(let i = 0; i < roles.length; i++){
        if(roles[i].name === 'secretary'){
            next();            
            return;
        }
    }
    return res.status(401).json({"error": 'Require Secretary Role'});
    next();
}

export const isStudent = async (req : Request, res: Response ,next: NextFunction) => {
}