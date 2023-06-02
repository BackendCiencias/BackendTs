import { createPassword, createEmail } from './../utils/stringPreprocesor';
import Teacher, { ITeacher } from './../models/teacher.model';
import Role, { IRole } from './../models/role.model';
import { IPayment } from 'models/payment.model';


export const registerTeacher = async(teacher:ITeacher) => {
    const {dni, names} = teacher;
    const {name1, name2, surname1, surname2} = names;
    // Email
    const createdEmail:string =  createEmail(name1, surname1, surname2);
    const createdPassword:string = createPassword(dni,name1, name2, surname1, surname2);
    teacher.email = createdEmail;
    teacher.password = createdPassword;
    // Role
    const role = await Role.findOne({name: "teacher"});
    teacher.roles = [role?._id];
    const teacherCreated = await Teacher.create(teacher);
    const savedTeacher = await teacherCreated.save();
    return savedTeacher;
}

export const modifyTeacher = async(teacher:ITeacher) => {
    // if(!teacher.dni) return "MISSSING_DNI";
    // const isAlready = await Teacher.findOne({"dni": teacher.dni});
    // if(isAlready) return "TEACHER";
    const {dni, names} = teacher;
    const {name1, name2, surname1, surname2} = names;
    const createdEmail:string =  createEmail(name1, surname1, surname2);
    // const createdEmail:string = "alumno2madero@cienciasperu.edu.pe";
    // const okEmail = await Teacher.find({email: createdEmail}).select('email')
    // console.log(okEmail);
    const createdPassword:string = createPassword(dni,name1, name2, surname1, surname2);
    teacher.email = createdEmail;
    teacher.password = createdPassword;
    const teacherCreated = await Teacher.create(teacher);
    const savedTeacher = await teacherCreated.save();
    return savedTeacher;
}

export const findTeacherById = async(teacherId:string) => {
    const teacherTarget = await Teacher.findById(teacherId, {password: 0}).populate<{ payment: IPayment }>("payment");
    if(!teacherTarget) return "NOT_TEACHER_FOUNDED_BY_ID";
    return teacherTarget;
}

export const findTeacherByDNI = async(teacherDNI:string) => {
    console.log(teacherDNI);
    const teacherTarget = await Teacher.findOne({"dni": teacherDNI}).populate("payment");
    if(!teacherTarget) return "NOT_TEACHER_FOUNDED_BY_DNI";
    return teacherTarget;
}

export const getAllTeachers  = async () =>{
    const allTeacher= await Teacher.find();
    return allTeacher;
}

export const getSalaryNoPayed = async(teacherId:string) => {
    // let acum = 0;
    // const teacherFounded = await findTeacherById(teacherId);
    // if(teacherFounded === "NOT_TEACHER_FOUNDED_BY_ID") throw new Error('NO TEACHER FOUND');
    // const year = new Date().getFullYear();
    // const paymentAct = teacherFounded.payment.find(e => e.year == year);
    // if(!paymentAct) throw new Error('NO PAYMENT FOUND');
    // const months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
    // for (let month of months){
    //     console.log(paymentAct[`${month}`]);
    //     acum += paymentAct[month]["total"];
    //     acum -= paymentAct[month]["payed"];
    // }
    // console.log(acum);
}