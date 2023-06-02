import { createPassword, createEmail } from './../utils/stringPreprocesor';
import Student, { IStudent } from './../models/student.model';
import Role, { IRole } from './../models/role.model';
import { Auth } from "interfaces/auth";
import { generateToken } from './../middlewares/jwt.handle';


export const registerStudent = async(student:IStudent) => {
    // if(!student.dni) return "MISSSING_DNI";
    // const isAlready = await Student.findOne({"dni": student.dni});
    // if(isAlready) return "STUDENT";
    const {dni, names} = student;
    const {name1, name2, surname1, surname2} = names;
    const createdEmail:string =  createEmail(name1, surname1, surname2);
    // const createdEmail:string = "alumno2madero@cienciasperu.edu.pe";
    // const okEmail = await Student.find({email: createdEmail}).select('email')
    // console.log(okEmail);
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