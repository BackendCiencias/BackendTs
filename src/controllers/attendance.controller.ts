import { Request , Response } from 'express';
import { handleHttp } from '../utils/error.handle';
import { markAttendance, studentPoputaleAttendance} from './../services/attendance.services';
import { findStudentByDNI, studentsByGradeAndSection } from './../services/student.services';

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

export const attendanceByStudent = async({body}:Request, res: Response) => {
    try{
        const { dni, month } = body;
        const responseStudent = await findStudentByDNI(dni);
        console.log("STUDENT", responseStudent);
        const responseAttendance = await studentPoputaleAttendance(responseStudent, month);
        res.status(200).send(responseAttendance);
    }catch(e){
        res.status(400).send({error: e});
    }
}