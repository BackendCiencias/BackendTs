import { loginSecretary } from './../services/secretary.services';
import Secretary from '../models/secretary.model';
import { Request , Response } from 'express';
import jwt from 'jsonwebtoken';
import { handleHttp } from '../utils/error.handle';
import { registerSecretary } from '../services/secretary.services';
export const signup =  async({body}: Request, res: Response) => {
    try{
        const {_id, email, names}= await registerSecretary(body);
        const token:string = jwt.sign({_id: _id}, process.env.TOKEN_SECRET || 'tokentest' );
        res.cookie('auth-token',token).json({_id, email, names});

    }catch(e){
        handleHttp(res, 'ERROR_SIGNUP_SECRETARY',e);
    }
};

export const signin = async ({body}: Request, res: Response) => {
    try{
        const {email, password} = body;
        const responseSecretary = await loginSecretary({email, password});

        if(responseSecretary === "PASSWORD_INCORRECT" || responseSecretary === "EMAIL_INCORRECT"){
            res.status(400)
            return res.send(responseSecretary);
        } 
        const {token, data} = responseSecretary;

        // sending token
        res.cookie('auth-token', token).json(data);
    }catch(e){
        handleHttp(res, 'ERROR_SIGNIN_SECRETARY',e);
    }
    
};

export const profile = async (req: Request, res: Response) => {
    
    // finding current secretary
    const secretary = await Secretary.findById(req.secretaryId, {password: 0});
    if(!secretary) return res.status(404).json('No secretary found');

    // sending res
    res.json({
        email: secretary.email,
        names: secretary.names,
        _id: secretary._id
    });
};
