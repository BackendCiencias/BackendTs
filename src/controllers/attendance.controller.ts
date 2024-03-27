import { Request , Response } from 'express';
import { handleHttp } from '../utils/error.handle';
import { markAttendance } from './../services/attendance.services';

export const studentAttendance =  async({body}: Request, res: Response) => {
    try{
        const responseAssistants = await markAttendance(body.dni);
        if(responseAssistants == "ALREADY_SIGN_STUDENT_ATTENDANCE"){
            return res.status(400).send({error: responseAssistants});
        }
        res.send(responseAssistants);
    }catch(e){
        handleHttp(res, 'ERROR_STUDENT_ATTENDANCE',e);
    }
};