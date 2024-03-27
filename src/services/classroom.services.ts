import { Types } from 'mongoose';
import Classroom, { IClassroom } from './../models/classroom.model';

interface ISimplyClassroom{
    grade: string;
    collegue: string;
    capacity: number;
    ocuped: number;
}

export const updateVacancies  = async(studentId:Types.ObjectId, studentGrade:string, studentCollegue:string) =>{
    try {
        const findedClassroom = await Classroom.findOne({grade: studentGrade, collegue: studentCollegue});
        if(!findedClassroom) console.log("Not Found Classroom", studentGrade, "Student", studentId);
        findedClassroom?.students.push(studentId);
        findedClassroom?.save();
        return "updateVacancies";
    } catch (e) {
        return {error: "ERROR_UPDATE_VACANCIES", e}
    }
}
export const checkVacancies = async(studentGrade:string, studentCollegue:string) => {
    const okClassroom = await Classroom.findOne({grade: studentGrade, collegue: studentCollegue});
    if(!okClassroom) return "Invalid grade and collegue";
    const {capacity, students} = okClassroom;
    return (capacity - students.length) > 0;
}

export const getAllVacancies  = async () =>{
    const allClassroom= await Classroom.find();
    const spreadClassroom:ISimplyClassroom[] = [];

    allClassroom.forEach(element => {
        const {grade, collegue, capacity, students} = element;
        const ocuped = students.length;
        spreadClassroom.push({grade, collegue, capacity, ocuped})
    });
    return spreadClassroom;
}

export const getVacanciesByCollegue =async (collegue:string) => {
    console.log(collegue);
    if(!collegue || collegue == "undefined") return "MISSING_COLLEGUE_ARGUMENT";
    const keyWords:string[] = [];
    if(collegue == "Cimas"){
        keyWords.push("Colegio Cimas");
    }else if (collegue == "Ciencias"){
        keyWords.push("Ciencias Aplicadas");
        keyWords.push("Ciencias Secundaria");
    }else {
        return {error:"Collegue not found"}
    }
    const allClassroom = await Classroom.find({"collegue": keyWords});
    const iniClassroom:ISimplyClassroom[] = [];
    const primClassroom:ISimplyClassroom[] = [];
    const secClassroom:ISimplyClassroom[] = [];
    allClassroom.forEach(element => {
    const {grade, collegue, capacity, students} = element;
    const ocuped = students.length;
        if(grade.includes("inicial")){
            iniClassroom.push({grade, collegue, capacity, ocuped})
        }
        else if(grade.includes("primaria")){
            primClassroom.push({grade, collegue, capacity, ocuped})
        }
        else{
            secClassroom.push({grade, collegue, capacity, ocuped})
        }
    });
    return {"Inicial": iniClassroom, "Primaria": primClassroom, "Secundaria": secClassroom}
}

export const addVacancies = async (grade:string, collegue:string, cant:number) => {
    const findedClassroom = await Classroom.findOne({grade, collegue});
    if(!findedClassroom) return "Invalid grade or collegue";
    const {capacity} = findedClassroom;
    console.log(capacity, cant)
    findedClassroom.capacity = capacity+cant;
    await findedClassroom.save();
    return "Added Vacancies"
}

export const registerVacancies  = async (classroomArr:IClassroom[]) =>{
    return "Desactivado :P";
    let x = 0;
    try {
        for(let classroom of classroomArr ){
            console.log(`element ${x++}`, classroom.grade);
            const classroomCreated = await Classroom.create(classroom);
            if(!classroomCreated) return "ERROR_CREATE_CLASSROOM";
        }
    } catch (e) {
        return {error: "ERROR_CREATE_CLASSROOM_BULK", reason: e}
    }
}

// export const assingStudentClass =async (grade:string, collegue:string, studentid:Types.ObjectId) => {
//     const findedClassroom = await Classroom.findOne({grade, collegue});
//     if(!findedClassroom) return "Invalid grade or collegue";
//     console.log(findedClassroom)
//     findedClassroom.students.push(studentid);
//     await findedClassroom.save();
//     return "Student class assing success"
// }