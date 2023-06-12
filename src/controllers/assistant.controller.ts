import { modifyPayment, registerPayment } from '../services/payment.services';
import { registerAssistant, getAllAssistants, findAssistantById, findAssistantByDNI, modifyAssistant} from '../services/assistant.services';
import { Request , Response } from 'express';
import { handleHttp } from '../utils/error.handle';
import { loginAssistant } from './../services/assistant.services';
import Assistant, { IAssistant } from './../models/assistant.model';
import { createAttendanceToday, studentAttendanceSign } from './../services/attendance.services';

export const createAssistant =  async({body}: Request, res: Response) => {
    try{
        const {payments} = body;
        if(!payments) return res.status(400).send({"error": "MISSING_PAYMENTS"});
        const responseAssistant = await registerAssistant(body);
        console.log('already created assistant')
        const responsePayments = await registerPayment(payments, responseAssistant._id);
        console.log('already created payments')
        const actAssistant = await findAssistantById(responseAssistant._id);
        res.send({actAssistant, email:responseAssistant.email, password:responseAssistant.password});
        // res.send({message: "Success"});
    }catch(e){
        handleHttp(res, 'ERROR_SIGNUP_ASSISTANT',e);
    }
};

export const signinAssistant = async ({body}: Request, res: Response) => {
    try{
        const {email, password} = body;
        const responseAssistant = await loginAssistant({email, password});

        if(responseAssistant === "CONTRASEÑA_INCORRECTA" || responseAssistant === "EMAIL_INCORRECTO"){
            res.status(400)
            return res.send({"error": responseAssistant});
        } 
        const {token} = responseAssistant;
        
        // sending token
        res.cookie('auth-token', token).json(responseAssistant);
    }catch(e){
        handleHttp(res, 'ERROR_SIGNIN_ASSISTANT',e);
    }    
};

export const profileAssistant = async (req: Request, res: Response) => {
    
    // finding current secretary
    const secretary = await Assistant.findById(req.userId, {password: 0});
    if(!secretary) return res.status(404).json({"error": 'No secretary found'});

    // sending res
    res.json({
        email: secretary.email,
        names: secretary.names,
        _id: secretary._id
    });
};

// export const updateAssistant =  async({body}: Request, res: Response) => {
//     try{
//         const {payments} = body;
//         const responseAssistant = await modifyAssistant(body);
//         const responsePensions = await modifyPayment(payments, responseAssistant._id);
//         // if(responsePayments == "ERROR_FINDING_ASSISTANT") return res.status(400).send({"error": responsePayments});
//         const actAssistant = await findAssistantById(responseAssistant._id);
//         res.send(actAssistant);
//         // res.send({message: "Success"});
//     }catch(e){
//         handleHttp(res, 'ERROR_SIGNUP_ASSISTANT',e);
//     }
// };

export const getAssistants =  async(req: Request, res: Response) => {
    try{
        const responseAssistants = await getAllAssistants();
        res.send(responseAssistants);
    }catch(e){
        handleHttp(res, 'ERROR_GETALL_ASSISTANT',e);
    }
};

export const getAssistantsById =  async(req: Request, res: Response) => {
    try{
        const responseAssistants = await findAssistantById(req.params.assistant_id);
        res.send(responseAssistants);
    }catch(e){
        handleHttp(res, 'ERROR_ASSISTANT_ID',e);
    }
};

export const getAssistantsByDNI =  async({body}: Request, res: Response) => {
    try{
        const responseAssistants = await findAssistantByDNI(body.dni);
        if(responseAssistants == "NOT_ASSISTANT_FOUNDED_BY_DNI"){
            return res.status(400).send({error: responseAssistants});
        }
        res.send(responseAssistants);
    }catch(e){
        handleHttp(res, 'ERROR_ASSISTANT_DNI',e);
    }
};

export const createAttendance =  async({body}: Request, res: Response) => {
    try{
        const responseAttendance = await createAttendanceToday(body);
        // if(responseAttendance == "ALREADY_CREATE_ATTENDANCE"){
        //     return res.status(400).send({error: responseAttendance});
        // }
        res.send(responseAttendance);
    }catch(e){
        handleHttp(res, 'ERROR_ASSISTANT_CREATE_ATTENDANCE',e);
    }
};

export const studentAttendance =  async({body}: Request, res: Response) => {
    try{
        const responseAssistants = await studentAttendanceSign(body.dni);
        // if(responseAssistants == "ALREADY_CREATE_ATTENDANCE"){
        //     return res.status(400).send({error: responseAssistants});
        // }
        res.send(responseAssistants);
    }catch(e){
        handleHttp(res, 'ERROR_STUDENT_ATTENDANCE',e);
    }
};