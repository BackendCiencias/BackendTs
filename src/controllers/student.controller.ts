import { registerPension } from './../services/pension.services';
import { registerStudent, getAllStudents, findStudentById, findStudentByDNI } from './../services/student.services';
import { Request , Response } from 'express';
import { handleHttp } from '../utils/error.handle';
export const createStudent =  async({body}: Request, res: Response) => {
    try{
        const {pensions} = body;
        const responseStudent = await registerStudent(body);
        // if(responseStudent == "MISSSING_DNI") return res.status(400).send({"error": responseStudent});
        const responsePensions = await registerPension(pensions, responseStudent._id);
        if(responsePensions == "ERROR_FINDING_STUDENT") return res.status(400).send({"error": responsePensions});
        // res.send({responseStudent, responsePensions});
        res.send({message: "Success"});
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

export const getStudentsById =  async(req: Request, res: Response) => {
    try{
        const responseStudents = await findStudentById(req.params.student_id);
        res.send(responseStudents);
    }catch(e){
        handleHttp(res, 'ERROR_STUDENT_ID',e);
    }
};

export const getStudentsByDNI =  async({body}: Request, res: Response) => {
    try{
        const responseStudents = await findStudentByDNI(body.dni);
        res.send(responseStudents);
    }catch(e){
        handleHttp(res, 'ERROR_STUDENT_DNI',e);
    }
};