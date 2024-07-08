import { Request , Response } from 'express';
import { handleHttp } from '../utils/error.handle';
import { markAttendance, studentPoputaleAttendance} from './../services/attendance.services';
import { studentsByGradeAndSection } from './../services/student.services';

export const studentAttendance =  async({body}: Request, res: Response) => {
    try{
        const responseAssistants = await markAttendance(body.dni);
        res.send(responseAssistants);
    }catch(e){
        res.status(400).send({error: e});
    }
};

export const attendanceByGradeAndSection = async({body}:Request, res: Response) => {
    try{
        const {grade, section, collegue, month} = body;
        const responseStudents = await studentsByGradeAndSection(grade, section, collegue);
        const populatedAttendance = await Promise.all(
            responseStudents.map(async (student) => await studentPoputaleAttendance(student, month))
        );
        res.send(populatedAttendance);
    }catch(e){
        res.status(400).send({error: e});
    }
}