import Student, { IStudent } from './../models/student.model';

export const registerStudent = async(student:IStudent) => {
    const studentCreated = await Student.create(student);
    const savedSecretary = await studentCreated.save();
    return savedSecretary;
}