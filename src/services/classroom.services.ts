import Classroom, { IClassroom } from './../models/classroom.model';

interface SimplyClassroom{
    grade: string,
    collegue: string,
    vacancies:number
}

export const updateVacancies  = () =>{

    return "updateVacancies";
}

export const getAllVacancies  = async () =>{
    const allClassroom= await Classroom.find();
    const spreadClassroom:SimplyClassroom[] = [];

    allClassroom.forEach(element => {
        const {grade, collegue, capacity, students} = element;
        const vacancies = capacity - students.length;
        spreadClassroom.push({grade, collegue, vacancies})
    });
    return spreadClassroom;
}

export const getVacanciesByCollegue =async (collegue:string) => {
    console.log(collegue);
    if(!collegue || collegue == "undefined") return "MISSING_COLLEGUE_ARGUMENT";
    const allClassroom= await Classroom.find({"collegue": collegue});
    const spreadClassroom:SimplyClassroom[] = [];

    allClassroom.forEach(element => {
        const {grade, collegue, capacity, students} = element;
        const vacancies = capacity - students.length;
        spreadClassroom.push({grade, collegue, vacancies})
    });
    return spreadClassroom;
}

export const registerVacancies  = async (classroomArr:IClassroom[]) =>{
    // let x = 0;
    // classroomArr.forEach(async e =>  {
    //     console.log(`element ${x++}`, e.grade);
    //     const classroomCreated = await Classroom.create(e);
    //     if(!classroomCreated) return "ERROR_CREATE_CLASSROOM";
    // });
    return "Desactivado :P";
}