import { Request , Response } from 'express';
import { handleHttp } from '../utils/error.handle';
import { markAttendance, studentPoputaleAttendance} from './../services/attendance.services';
import { findStudentByDNI, studentsByGradeAndSection } from './../services/student.services';
import { IStudent } from 'models/student.model';

export const studentAttendance =  async({body}: Request, res: Response) => {
    try{
        const responseAssistants = await markAttendance(body.dni);
        res.send(responseAssistants);
    }catch(e){
        res.status(400).send({error: e});
    }
};

function compareStudents(student1: IStudent, student2: IStudent) {
    const { surname1: s1, surname2: s2, name1: n1, name2: n2 } = student1.names;
    const { surname1: s1Other, surname2: s2Other, name1: n1Other, name2: n2Other } = student2.names;

    return (
        s1.localeCompare(s1Other) ||
        s2.localeCompare(s2Other) ||
        n1.localeCompare(n1Other) ||
        n2.localeCompare(n2Other)
    );
}


export const attendanceByGradeAndSection = async({body}:Request, res: Response) => {
    try{
        const {grade, section, collegue, month} = body;
        const responseStudents = await studentsByGradeAndSection(grade, section, collegue);
        console.log(responseStudents)
        const sortedStudents = responseStudents.sort(compareStudents);

        const populatedAttendance = await Promise.all(
            responseStudents.map(async (student) => await studentPoputaleAttendance(student, month))
        );
        res.status(200).send(populatedAttendance);
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