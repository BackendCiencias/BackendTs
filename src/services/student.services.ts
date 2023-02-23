import { createPassword, createEmail } from './../utils/stringPreprocesor';
import { ObjectId, Types } from 'mongoose';
import Student, { IStudent } from './../models/student.model';


export const registerStudent = async(student:IStudent) => {
    // if(!student.dni) return "MISSSING_DNI";
    // const isAlready = await Student.findOne({"dni": student.dni});
    // if(isAlready) return "STUDENT";
    const {dni, names} = student;
    const {name1, name2, surname1, surname2} = names;
    const createdEmail:string =  createEmail(name1, surname1, surname2);
    // const createdEmail:string = "alumno2madero@cienciasperu.edu.pe";
    const okEmail = await Student.find({email: createdEmail}).select('email')
    console.log(okEmail);
    const createdPassword:string = createPassword(dni,name1, name2, surname1, surname2);
    student.email = createdEmail;
    student.password = createdPassword;
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