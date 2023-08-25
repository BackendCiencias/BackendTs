import { updateVacancies } from './../services/classroom.services';
import { modifyPension, registerPension } from './../services/pension.services';
import { registerStudent, findAllStudents, findStudentById, findStudentByDNI, loginStudent, registerStudentSpecial, modifyStudent} from './../services/student.services';
import { checkVacancies } from '../services/classroom.services';
import { Request , Response } from 'express';
import { handleHttp } from '../utils/error.handle';
export const createStudent =  async({body}: Request, res: Response) => {
    try{
        const {pensions} = body;
        const okVacancies = await checkVacancies(body.grade, body.collegue); 
        if(okVacancies == "Invalid grade and collegue") return res.status(400).send({error: okVacancies});
        if(!okVacancies) return res.status(400).send({error: "Sold out vacancies"})

        const responseStudent = await registerStudent(body);
        if(responseStudent){
            const {_id, grade, collegue} = responseStudent;
            await updateVacancies(_id, grade, collegue)
        }

        // if(responseStudent == "MISSSING_DNI") return res.status(400).send({"error": responseStudent});
        const responsePensions = await registerPension(pensions, responseStudent._id);
        // if(responsePensions == "ERROR_FINDING_STUDENT") return res.status(400).send({"error": responsePensions});
        const actStudent = await findStudentById(responseStudent._id);
        res.send({actStudent, email: responseStudent.email, password: responseStudent.password});
        // res.send({message: "Success"});
    }catch(e){
        handleHttp(res, 'ERROR_SIGNUP_STUDENT',e);
    }
};

export const createBulkStudents =  async({body}: Request, res: Response) => {
    try{
        const responseStudent = await registerStudentSpecial();
        res.status(200).send(responseStudent);
    }catch(e){
        handleHttp(res, 'ERROR_SIGNUP_SPECIAL_BULK_STUDENTS',e);
    }
};

export const getStudents =  async(req: Request, res: Response) => {
    try{
        const responseStudents = await findAllStudents();
        res.send(responseStudents);
    }catch(e){
        handleHttp(res, 'ERROR_GETALL_STUDENT',e);
    }
};

export const getStudentsByParamId =  async(req: Request, res: Response) => {
    try{
        const responseStudents = await findStudentById(req.params.student_id);
        res.send(responseStudents);
    }catch(e){
        handleHttp(res, 'ERROR_STUDENT_PARAM_ID',e);
    }
};

export const getStudentsById = async ({body}: Request, res: Response) => {
    try{
        const responseStudents = await findStudentById(body.student_id);
        res.send(responseStudents);
    }catch(e){
        handleHttp(res, 'ERROR_STUDENT_ID',e);
    }
};

export const getStudentsByDNI =  async({body}: Request, res: Response) => {
    try{
        const responseStudents = await findStudentByDNI(body.dni);
        if(responseStudents == "NOT_STUDENT_FOUNDED_BY_DNI"){
            return res.status(400).send({error: responseStudents});
        }
        res.send(responseStudents);
    }catch(e){
        handleHttp(res, 'ERROR_STUDENT_DNI',e);
    }
};

export const signinStudent = async ({body}: Request, res: Response) => {
    try{
        const {email, password} = body;
        const responseStudent = await loginStudent({email, password});
        console.log("bien")

        if(responseStudent === "CONTRASEÑA_INCORRECTA" || responseStudent === "EMAIL_INCORRECTO"){
            res.status(400)
            return res.send({"error": responseStudent});
        } 
        const {token} = responseStudent;
        
        // sending token
        res.cookie('auth-token', token).json(responseStudent);
    }catch(e){
        handleHttp(res, 'ERROR_SIGNIN_STUDENT',e);
    }
    
};

export const modifyStudentData = async ({body}: Request, res: Response) => {
    try{
        const {email, password} = body;
        const modStudent = await modifyStudent();
        const modPension = await modifyPension();
    }catch(e){
        handleHttp(res, 'ERROR_MODIFY_STUDENT',e);
    }
};