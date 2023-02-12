import { registerTutor } from './../services/tutor.services';
import { Request , Response } from 'express';
import { handleHttp } from '../utils/error.handle';
export const createTutor =  async({body}: Request, res: Response) => {
    try{
        const responseTutor = await registerTutor(body);
        res.send(responseTutor);
    }catch(e){
        handleHttp(res, 'ERROR_SIGNUP_TUTOR',e);
    }
};