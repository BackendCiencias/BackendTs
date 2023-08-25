import { createPassword, createEmail } from './../utils/stringPreprocesor';
import Student, { IStudent } from './../models/student.model';
import Role, { IRole } from './../models/role.model';
import { Auth } from "interfaces/auth";
import { generateToken } from './../middlewares/jwt.handle';
import { updateVacancies } from './classroom.services';
import { registerPension } from './pension.services';


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
        "3 AÑOS": {code: "3_"},
        "4 AÑOS": {code: "4_"},
        "5 AÑOS": {code: "5_"},
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
    console.log(newGrade);
    return newGrade;
}
export const registerStudentSpecial = async() => {
    const fs = require('fs');
    const leerArchivo = (path:string) => fs.readFileSync(path, 'utf8');

    const archivoChistes1 = leerArchivo(process.env.DATA_PATH || "path");
    const studentArr = JSON.parse(archivoChistes1);
    // const allStudent = JSON.parse(archivoChistes1);
    // const studentArr = [allStudent[4]];

    // console.log(studentArr[4])
    // return {message: "Okidoki"};
    let x = 0;
    let cnt = 0;
    let fail = 0;
    const role = await Role.findOne({name: "student"});
    try {
        for(let stu of studentArr)  {
            // console.log(`element ${x++}`, e);
            const realGrade = tradGrade(stu.nivel, stu.grade);
            const realCollegue = (stu.nivel == "SECUNDARIA")? "Ciencias Secundaria": "Ciencias Aplicadas";
            const studentCreated = Student.create({
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
            })
            if(cnt == 560) console.log(stu);

            studentCreated.then((e) => {
                updateVacancies(e.id, e.grade, e.collegue)
                // console.log("id: ", e.id)
            }).catch((error) => console.log("pipipi"))
            const pensions = {
                admission: stu.admission,
                tuition: stu.tuition,
                march:  stu.pension,
                april:   stu.pension,
                may:   stu.pension,
                june:   stu.pension,
                july:   stu.pension,
                august:   stu.pension,
                september:   stu.pension,
                october:   stu.pension,
                november:   stu.pension,
                december:   stu.pension,
                books:   stu.books,
                agenda:   stu.agenda
            }
            studentCreated.then((e) => {
                registerPension( pensions, e._id).catch((error) => console.log("failed", fail++, error))
            })
            cnt = cnt + 1;
            console.log("Creado ",cnt)
        }
        console.log("Total Failed ",fail)
        return {message: "SUCCESSFULLY CREATED"};
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
  
export const findStudentByParamId = async(studentId:string) => {
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

export const findAllStudents  = async () =>{
    const allStudent= await Student.find();
    return allStudent;
}

export const findStudentById = async () => {
    console.log("Get Student By Id Alive");
    console.log()
}

export const modifyStudent = async () => {
    console.log("Modify Student Alive");
    console.log()
}