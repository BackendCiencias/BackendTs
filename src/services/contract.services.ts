import Student, { IStudent } from './../models/student.model';
import Tutor, { ITutor } from './../models/tutor.model';
import Contract, { IContract } from './../models/contract.model';
import { Types, ObjectId } from 'mongoose';

export const registerContract = async (tutorsDNI:string[], studentsDNI:string[]) => {
    if(!tutorsDNI || tutorsDNI.length == 0) return "TUTORS_DNI_IS_EMPTY";
    if(!studentsDNI || studentsDNI.length == 0) return "STUDENTS_DNI_IS_EMPTY";

    const tutorsId:Types.ObjectId[] = [];
    const tutorsPopulate:ITutor[] = [];
    for(const dni of tutorsDNI){
        const tutorTarget = await Tutor.findOne({"dni": dni});
        if(!tutorTarget) return {message : `Tutor with DNI: ${dni} not founded`};
        // console.log( dni, tutorTarget);
        tutorsId.push(tutorTarget._id)
        tutorsPopulate.push(tutorTarget)
    }
    
    
    const studentsId:Types.ObjectId[] = [];
    const studentsPopulate:IStudent[] = [];
    for(const dni of studentsDNI){
        const studentTarget = await Student.findOne({"dni": dni});
        if(!studentTarget) return {message : `Student with DNI: ${dni} not founded`};
        // console.log( dni, studentTarget);

        studentsId.push(studentTarget._id)
        studentsPopulate.push(studentTarget)
    }
    
    for(const studentAct of studentsPopulate){
        const actTutors = studentAct.tutor;
        const mergedTutors = [...tutorsId, ...actTutors]
        const reducedTutors = mergedTutors.reduce((acc:Types.ObjectId[],item)=>{
            if(!acc.includes(item)) acc.push(item);
            return acc;
        },[]);
        studentAct.tutor = reducedTutors;
        await studentAct.save();
        // console.log("Saved: ", studentAct.dni)
    }

    for(const tutorAct of tutorsPopulate){
        const actStudents = tutorAct.students;
        const mergedStudents = [...studentsId, ...actStudents];
        const reducedStudents = mergedStudents.reduce((acc:Types.ObjectId[], item) => {
            // console.log(item);
            if(!acc.includes(item)) acc.push(item);
            return acc;
        },[]);
        // console.log(tutorAct.dni, ":", reducedStudents);
        tutorAct.students = reducedStudents;
        await tutorAct.save();
        // console.log("Saved: ", tutorAct.dni)
    }

    const modifiedData = {
        students: studentsId,
        tutors: tutorsId
    }

    const createdContract = await Contract.create(modifiedData);
    for(const studentAct of studentsPopulate){
        studentAct.contracts.push(createdContract._id);
        await studentAct.save();
        // console.log("Saved Contracts: ", studentAct.dni)
    }
    // console.log(createdContract);
    return {createdContract}
}