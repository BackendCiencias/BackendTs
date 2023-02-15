import { findTutorByDNI, getAllTutors, registerTutor } from './../services/tutor.services';
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

export const getTutorsByDNI =  async({body}: Request, res: Response) => {
    try{
        const responseTutors = await findTutorByDNI(body.dni);
        res.send(responseTutors);
    }catch(e){
        handleHttp(res, 'ERROR_TUTOR_DNI',e);
    }
};

export const getTutors =  async(req: Request, res: Response) => {
    try{
        const responseTutors = await getAllTutors();
        res.send(responseTutors);
    }catch(e){
        handleHttp(res, 'ERROR_GETALL_STUDENT',e);
    }
};