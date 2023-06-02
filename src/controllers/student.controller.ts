import { updateVacancies } from './../services/classroom.services';
import { registerPension } from './../services/pension.services';
import { registerStudent, getAllStudents, findStudentById, findStudentByDNI, loginStudent} from './../services/student.services';
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