import { daySetTime } from './../utils/dayTime';
import { loginSecretary } from './../services/secretary.services';
import Secretary from '../models/secretary.model';
import { Request , Response } from 'express';
import { handleHttp } from '../utils/error.handle';
import { registerSecretary } from '../services/secretary.services';
export const signupSecretary =  async({body}: Request, res: Response) => {
    try{
        const {token, data} = await registerSecretary(body);
        res.cookie('auth-token', token,).json({data});
    }catch(e){
        handleHttp(res, 'ERROR_SIGNUP_SECRETARY',e);
    }
};

export const signinSecretary = async ({body}: Request, res: Response) => {
    try{
        const {email, password} = body;
        const responseSecretary = await loginSecretary({email, password});

        if(responseSecretary === "CONTRASEÑA_INCORRECTA" || responseSecretary === "EMAIL_INCORRECTO"){
            res.status(400)
            return res.send({"error": responseSecretary});
        } 
        const {token} = responseSecretary;
        
        // sending token
        res.cookie('auth-token', token).json(responseSecretary);
    }catch(e){
        handleHttp(res, 'ERROR_SIGNIN_SECRETARY',e);
    }
    
};

export const profileSecretary = async (req: Request, res: Response) => {
    
    // finding current secretary
    const secretary = await Secretary.findById(req.userId, {password: 0});
    if(!secretary) return res.status(404).json({"error": 'No secretary found'});

    // sending res
    res.json({
        email: secretary.email,
        names: secretary.names,
        _id: secretary._id
    });
};
