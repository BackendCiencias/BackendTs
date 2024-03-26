"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveStudentImage = exports.modifyStudentByDNI = exports.findAllStudents = exports.findStudentByDNI = exports.findStudentById = exports.loginStudent = exports.registerStudentSpecial = exports.tradGrade = exports.registerStudent = void 0;
const stringPreprocesor_1 = require("./../utils/stringPreprocesor");
const student_model_1 = __importDefault(require("./../models/student.model"));
const role_model_1 = __importDefault(require("./../models/role.model"));
const jwt_handle_1 = require("./../middlewares/jwt.handle");
const classroom_services_1 = require("./classroom.services");
const pension_services_1 = require("./pension.services");
const registerStudent = (student) => __awaiter(void 0, void 0, void 0, function* () {
    const { dni, names } = student;
    const { name1, name2, surname1, surname2 } = names;
    const createdEmail = (0, stringPreprocesor_1.createEmail)(name1, surname1, surname2);
    const literalPassword = (0, stringPreprocesor_1.createPassword)(dni, name1, name2, surname1, surname2);
    student.password = literalPassword;
    student.email = createdEmail;
    const role = yield role_model_1.default.findOne({ name: "student" });
    student.roles = [role === null || role === void 0 ? void 0 : role._id];
    const studentCreated = yield student_model_1.default.create(student);
    studentCreated.password = yield studentCreated.encryptPassword(literalPassword);
    const savedStudent = yield studentCreated.save();
    console.log(savedStudent);
    return {
        _id: savedStudent._id,
        grade: savedStudent.grade,
        collegue: savedStudent.collegue,
        email: createdEmail,
        password: literalPassword
    };
});
exports.registerStudent = registerStudent;
const tradGrade = (nivel, grade) => {
    const nvLower = nivel.toLocaleLowerCase();
    var trad = {
        "3 AÑOS": { code: "3_" },
        "4 AÑOS": { code: "4_" },
        "5 AÑOS": { code: "5_" },
        "PRIMERO": { code: "1ro_" },
        "SEGUNDO": { code: "2do_" },
        "TERCERO": { code: "3ro_" },
        "CUARTO": { code: "4to_" },
        "QUINTO": { code: "5to_" },
        "SEXTO": { code: "6to_" },
        "ELITE 1": { code: "E1_" },
        "ELITE 2": { code: "E2_" }
    };
    const newGrade = trad[grade].code + nvLower;
    console.log(newGrade);
    return newGrade;
};
exports.tradGrade = tradGrade;
const registerStudentSpecial = () => __awaiter(void 0, void 0, void 0, function* () {
    const fs = require('fs');
    const leerArchivo = (path) => fs.readFileSync(path, 'utf8');
    const archivoChistes1 = leerArchivo(process.env.DATA_PATH || "path");
    const studentArr = JSON.parse(archivoChistes1);
    // const allStudent = JSON.parse(archivoChistes1);
    // const studentArr = [allStudent[4]];
    // console.log(studentArr[4])
    // return {message: "Okidoki"};
    let x = 0;
    let cnt = 0;
    let fail = 0;
    const role = yield role_model_1.default.findOne({ name: "student" });
    try {
        for (let stu of studentArr) {
            // console.log(`element ${x++}`, e);
            const realGrade = (0, exports.tradGrade)(stu.nivel, stu.grade);
            const realCollegue = (stu.nivel == "SECUNDARIA") ? "Ciencias Secundaria" : "Ciencias Aplicadas";
            const studentCreated = student_model_1.default.create({
                names: {
                    name1: stu.name1,
                    name2: stu.name2,
                    surname1: stu.surname1,
                    surname2: stu.surname2,
                },
                nivel: stu.nivel,
                grade: realGrade,
                section: stu.section,
                collegue: realCollegue,
                dni: stu.dni,
                roles: [role === null || role === void 0 ? void 0 : role._id]
            });
            if (cnt == 560)
                console.log(stu);
            studentCreated.then((e) => {
                (0, classroom_services_1.updateVacancies)(e.id, e.grade, e.collegue);
                // console.log("id: ", e.id)
            }).catch((error) => console.log("pipipi"));
            const pensions = {
                admission: stu.admission,
                tuition: stu.tuition,
                march: stu.pension,
                april: stu.pension,
                may: stu.pension,
                june: stu.pension,
                july: stu.pension,
                august: stu.pension,
                september: stu.pension,
                october: stu.pension,
                november: stu.pension,
                december: stu.pension,
                books: stu.books,
                agenda: stu.agenda
            };
            studentCreated.then((e) => {
                (0, pension_services_1.registerPension)(pensions, e._id).catch((error) => console.log("failed", fail++, error));
            });
            cnt = cnt + 1;
            console.log("Creado ", cnt);
        }
        console.log("Total Failed ", fail);
        return { message: "SUCCESSFULLY CREATED" };
    }
    catch (e) {
        return { error: "ERROR_CREATE_SINGLE_SPECIAL_STUDENT", reason: e };
    }
});
exports.registerStudentSpecial = registerStudentSpecial;
const loginStudent = ({ email, password }) => __awaiter(void 0, void 0, void 0, function* () {
    const student = yield student_model_1.default.findOne({ email });
    if (!student)
        return "EMAIL_INCORRECTO";
    const isCorrect = yield student.validatePassword(password); //validate in utils?
    if (!isCorrect)
        return "CONTRASEÑA_INCORRECTA";
    const data = { email: student.email, names: student.names, _id: student._id };
    const token = (0, jwt_handle_1.generateToken)(`${student._id}`);
    return { token, data };
});
exports.loginStudent = loginStudent;
const findStudentById = (studentId) => __awaiter(void 0, void 0, void 0, function* () {
    const studentFounded = yield student_model_1.default.findById(studentId, { password: 0 }).populate("pension");
    if (!studentFounded)
        return "NOT_STUDENT_FOUNDED_BY_ID";
    return studentFounded;
});
exports.findStudentById = findStudentById;
const findStudentByDNI = (dni) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(dni);
    const studentFounded = yield student_model_1.default.findOne({ dni }).select('-pension -roles -attendanceNormal -attendanceSpecial -tutor -contracts').populate('image');
    if (!studentFounded)
        return "NOT_STUDENT_FOUNDED_BY_DNI";
    return studentFounded;
});
exports.findStudentByDNI = findStudentByDNI;
const findAllStudents = () => __awaiter(void 0, void 0, void 0, function* () {
    const allStudent = yield student_model_1.default.find();
    return allStudent;
});
exports.findAllStudents = findAllStudents;
// export const modifyStudent = async (studentDNI:string, studentData:IStudent) => {
//     console.log("Modify Student Alive");
//     console.log()
//     return;
// }
const modifyStudentByDNI = (dni, modifydData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const modifiedStudent = yield student_model_1.default.findOneAndUpdate({ dni }, modifydData, { new: true }).select('-pension -roles -attendanceNormal -attendanceSpecial -tutor -contracts');
        return modifiedStudent;
    }
    catch (error) {
        throw error;
    }
});
exports.modifyStudentByDNI = modifyStudentByDNI;
const saveStudentImage = (dni, url, public_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundedStudent = yield student_model_1.default.findOne({ dni });
        if (!foundedStudent)
            throw new Error('STUDENT_NOT_FOUND');
        if (!foundedStudent.image) {
            foundedStudent.image = { url: url, public_id: public_id };
        }
        foundedStudent.image.url = url;
        foundedStudent.image.public_id = public_id;
        yield foundedStudent.save();
    }
    catch (error) {
        throw error;
    }
});
exports.saveStudentImage = saveStudentImage;
//# sourceMappingURL=student.services.js.map