import { Request , Response } from 'express';
import { handleHttp } from '../utils/error.handle';
import { createAttendanceToday, studentAttendanceSign, todayAttendance } from './../services/attendance.services';

export const createAttendance =  async({body}: Request, res: Response) => {
    try{
        const responseAttendance = await createAttendanceToday(body);
        if(responseAttendance == "ERROR_ALREADY_CREADTED_ATTENDANCE"){
            return res.status(400).send({error: responseAttendance});
        }
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

export const getTodayAttendance = async({body}: Request, res: Response) => {
    try {
        const responseAssistants = await todayAttendance();
        // if(responseAssistants == "ALREADY_CREATE_ATTENDANCE"){
        //     return res.status(400).send({error: responseAssistants});
        // }
        res.send(responseAssistants);
    }catch(e){
        handleHttp(res, 'ERROR_GET_TODAY_ATTENDANCE',e);
    }
}