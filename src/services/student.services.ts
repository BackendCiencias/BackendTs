import { createPassword, createEmail } from './../utils/stringPreprocesor';
import Student, { IStudent } from './../models/student.model';
import Role, { IRole } from './../models/role.model';
import { Auth } from "interfaces/auth";
import { generateToken } from './../middlewares/jwt.handle';
import { updateVacancies } from './classroom.services';


export const registerStudent = async(student:IStudent) => {
    const {dni, names} = student;
    const {name1, name2, surname1, surname2} = names;
    const createdEmail:string =  createEmail(name1, surname1, surname2);
    const literalPassword:string = createPassword(dni,name1, name2, surname1, surname2);
    student.password = literalPassword;
    student.email = createdEmail;
    const role = await Role.findOne({name: "student"});
    student.roles = [role?._id];
    const studentCreated = await Student.create(student);
    studentCreated.password = await studentCreated.encryptPassword(literalPassword);
    const savedStudent = await studentCreated.save();
    console.log(savedStudent);
    return {
        _id : savedStudent._id,
        grade: savedStudent.grade,
        collegue: savedStudent.collegue,
        email: createdEmail,
        password: literalPassword
    };
}

export const tradGrade = (nivel: string, grade: string) => {
    const nvLower = nivel.toLocaleLowerCase();
    interface IGrade {
        code: string;
     }
     var trad: Record<string, Partial<IGrade>> = {
        "3 AÑOS": {code: "3"},
        "4 AÑOS": {code: "4"},
        "5 AÑOS": {code: "5"},
        "PRIMERO": {code : "1ro_"},
        "SEGUNDO": {code :"2do_"},
        "TERCERO": {code :"3ro_"},
        "CUARTO": {code :"4to_"},
        "QUINTO": {code :"5to_"},
        "SEXTO": {code :"6to_"},
        "ELITE 1": {code :"E1_"},
        "ELITE 2": {code :"E2_"}
     };
    const newGrade  = trad[grade].code + nvLower;
    return newGrade;
}
export const registerStudentSpecial = async(studentArr:any[]) => {
    const studentsCreated:IStudent[]= []
    let x = 0;
    try {
        for(let stu of studentArr)  {
            // console.log(`element ${x++}`, e);
            const role = await Role.findOne({name: "student"});
            const realGrade = tradGrade(stu.nivel, stu.grade);
            const realCollegue = (stu.nivel == "SECUNDARIA")? "Ciencias Secundaria": "Ciencias Aplicadas";
            const studentCreated = await Student.create({
                names: {
                    name1: stu.name1,
                    name2: stu.name2,
                    surname1: stu.surname1,
                    surname2: stu.surname2,
                },
                nivel: stu.nivel,
                grade : realGrade,
                section: stu.section,
                collegue: realCollegue,
                dni: stu.dni,
                roles: [role?._id]
            });
            studentsCreated.push(studentCreated);
            const checkClassroom = await updateVacancies(studentCreated.id, studentCreated.grade, studentCreated.collegue)
            console.log(checkClassroom)
        }
        return studentsCreated;
    } catch (e) {
        return {error: "ERROR_CREATE_SINGLE_SPECIAL_STUDENT", reason: e};
    }
}

export const loginStudent = async ({ email, password }: Auth) => {
    const student = await Student.findOne({ email });
    if (!student) return "EMAIL_INCORRECTO";
    const isCorrect: boolean = await student.validatePassword(password); //validate in utils?
    if (!isCorrect) return "CONTRASEÑA_INCORRECTA";
  
    const data = { email: student.email, names: student.names, _id: student._id }
    const token = generateToken(`${student._id}`);
    
    return {token , data};
  };
  
export const findStudentById = async(studentId:string) => {
    const studentTarget = await Student.findById(studentId, {password: 0}).populate("pension");
    if(!studentTarget) return "NOT_STUDENT_FOUNDED_BY_ID";
    return studentTarget;
}

export const findStudentByDNI = async(studentDNI:string) => {
    console.log(studentDNI);
    const studentTarget = await Student.findOne({"dni": studentDNI}).populate("pension");
    if(!studentTarget) return "NOT_STUDENT_FOUNDED_BY_DNI";
    return studentTarget;
}

export const getAllStudents  = async () =>{
    const allStudent= await Student.find();
    return allStudent;
}