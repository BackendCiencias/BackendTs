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
exports.getAllStudents = exports.findStudentByDNI = exports.findStudentById = exports.loginStudent = exports.registerStudent = void 0;
const stringPreprocesor_1 = require("./../utils/stringPreprocesor");
const student_model_1 = __importDefault(require("./../models/student.model"));
const role_model_1 = __importDefault(require("./../models/role.model"));
const jwt_handle_1 = require("./../middlewares/jwt.handle");
const registerStudent = (student) => __awaiter(void 0, void 0, void 0, function* () {
    // if(!student.dni) return "MISSSING_DNI";
    // const isAlready = await Student.findOne({"dni": student.dni});
    // if(isAlready) return "STUDENT";
    const { dni, names } = student;
    const { name1, name2, surname1, surname2 } = names;
    const createdEmail = (0, stringPreprocesor_1.createEmail)(name1, surname1, surname2);
    // const createdEmail:string = "alumno2madero@cienciasperu.edu.pe";
    // const okEmail = await Student.find({email: createdEmail}).select('email')
    // console.log(okEmail);
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
    const studentTarget = yield student_model_1.default.findById(studentId, { password: 0 }).populate("pension");
    if (!studentTarget)
        return "NOT_STUDENT_FOUNDED_BY_ID";
    return studentTarget;
});
exports.findStudentById = findStudentById;
const findStudentByDNI = (studentDNI) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(studentDNI);
    const studentTarget = yield student_model_1.default.findOne({ "dni": studentDNI }).populate("pension");
    if (!studentTarget)
        return "NOT_STUDENT_FOUNDED_BY_DNI";
    return studentTarget;
});
exports.findStudentByDNI = findStudentByDNI;
const getAllStudents = () => __awaiter(void 0, void 0, void 0, function* () {
    const allStudent = yield student_model_1.default.find();
    return allStudent;
});
exports.getAllStudents = getAllStudents;
//# sourceMappingURL=student.services.js.map