import Student, { IStudent } from './../models/student.model';

export const registerStudent = async(student:IStudent) => {
    const studentCreated = await Student.create(student);
    const savedSecretary = await studentCreated.save();
    return savedSecretary;
}

export const getAllStudents  = async () =>{
    const allStudent= await Student.find();
    return allStudent;
}