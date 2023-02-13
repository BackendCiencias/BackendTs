import { registerPension } from './../services/pension.services';
import { registerStudent, getAllStudents } from './../services/student.services';
import { Request , Response } from 'express';
import { handleHttp } from '../utils/error.handle';
export const createStudent =  async({body}: Request, res: Response) => {
    try{
        const {pensions} = body;
        const responseStudent = await registerStudent(body);
        const responsePensions = await registerPension(pensions);
        res.send({responseStudent, responsePensions});
    }catch(e){
        handleHttp(res, 'ERROR_SIGNUP_STUDENT',e);
    }
};

export const getStudents =  async(req: Request, res: Response) => {
    try{
        const responseStudents = await getAllStudents();
        res.send(responseStudents);
    }catch(e){
        handleHttp(res, 'ERROR_GETALL_STUDENT',e);
    }
};