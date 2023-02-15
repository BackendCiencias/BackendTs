import { ObjectId, Types } from 'mongoose';
import Student, { IStudent } from './../models/student.model';


export const registerStudent = async(student:IStudent) => {
    // if(!student.dni) return "MISSSING_DNI";
    // const isAlready = await Student.findOne({"dni": student.dni});
    // if(isAlready) return "STUDENT";

    const studentCreated = await Student.create(student);
    const savedStudent = await studentCreated.save();
    return savedStudent;
}

export const findStudentById = async(studentId:string) => {
    const studentTarget = await Student.findById(studentId, {password: 0});
    if(!studentTarget) return "NOT_STUDENT_FOUNDED_BY_ID";
    return studentTarget;
}

export const findStudentByDNI = async(studentDNI:string) => {
    console.log(studentDNI);
    const studentTarget = await Student.findOne({"dni": studentDNI});
    if(!studentTarget) return "NOT_STUDENT_FOUNDED_BY_DNI";
    return studentTarget;
}

export const getAllStudents  = async () =>{
    const allStudent= await Student.find();
    return allStudent;
}