import { modifyPayment, registerPayment } from './../services/payment.services';
import { registerTeacher, getAllTeachers, findTeacherById, findTeacherByDNI, modifyTeacher} from './../services/teacher.services';
import { Request , Response } from 'express';
import { handleHttp } from '../utils/error.handle';
export const createTeacher =  async({body}: Request, res: Response) => {
    try{
        const {payments} = body;
        if(!payments) return res.status(400).send({"error": "MISSING_PAYMENTS"});
        const responseTeacher = await registerTeacher(body);
        console.log('already created teacher')
        const responsePayments = await registerPayment(payments, responseTeacher._id);
        console.log('already created payments')
        const actTeacher = await findTeacherById(responseTeacher._id);
        res.send(actTeacher);
        // res.send({message: "Success"});
    }catch(e){
        handleHttp(res, 'ERROR_SIGNUP_TEACHER',e);
    }
};

// export const updateTeacher =  async({body}: Request, res: Response) => {
//     try{
//         const {payments} = body;
//         const responseTeacher = await modifyTeacher(body);
//         const responsePensions = await modifyPayment(payments, responseTeacher._id);
//         // if(responsePayments == "ERROR_FINDING_TEACHER") return res.status(400).send({"error": responsePayments});
//         const actTeacher = await findTeacherById(responseTeacher._id);
//         res.send(actTeacher);
//         // res.send({message: "Success"});
//     }catch(e){
//         handleHttp(res, 'ERROR_SIGNUP_TEACHER',e);
//     }
// };

export const getTeachers =  async(req: Request, res: Response) => {
    try{
        const responseTeachers = await getAllTeachers();
        res.send(responseTeachers);
    }catch(e){
        handleHttp(res, 'ERROR_GETALL_TEACHER',e);
    }
};

export const getTeachersById =  async(req: Request, res: Response) => {
    try{
        const responseTeachers = await findTeacherById(req.params.teacher_id);
        res.send(responseTeachers);
    }catch(e){
        handleHttp(res, 'ERROR_TEACHER_ID',e);
    }
};

export const getTeachersByDNI =  async({body}: Request, res: Response) => {
    try{
        const responseTeachers = await findTeacherByDNI(body.dni);
        if(responseTeachers == "NOT_TEACHER_FOUNDED_BY_DNI"){
            return res.status(400).send({error: responseTeachers});
        }
        res.send(responseTeachers);
    }catch(e){
        handleHttp(res, 'ERROR_TEACHER_DNI',e);
    }
};