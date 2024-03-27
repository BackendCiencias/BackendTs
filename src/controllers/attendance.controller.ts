import { Request , Response } from 'express';
import { handleHttp } from '../utils/error.handle';
import { markAttendance } from './../services/attendance.services';

export const studentAttendance =  async({body}: Request, res: Response) => {
    try{
        const responseAssistants = await markAttendance(body.dni);
        res.send(responseAssistants);
    }catch(e){
        res.status(400).send(e.message);
    }
};