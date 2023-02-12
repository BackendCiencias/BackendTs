import { registerStudent } from './../services/student.services';
import { Request , Response } from 'express';
import { handleHttp } from '../utils/error.handle';
export const createStudent =  async({body}: Request, res: Response) => {
    try{
        const responseStudent = await registerStudent(body);
        res.send(responseStudent);
    }catch(e){
        handleHttp(res, 'ERROR_SIGNUP_STUDENT',e);
    }
};