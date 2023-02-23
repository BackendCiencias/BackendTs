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
exports.getAllStudents = exports.findStudentByDNI = exports.findStudentById = exports.registerStudent = void 0;
const stringPreprocesor_1 = require("./../utils/stringPreprocesor");
const student_model_1 = __importDefault(require("./../models/student.model"));
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
    const createdPassword = (0, stringPreprocesor_1.createPassword)(dni, name1, name2, surname1, surname2);
    student.email = createdEmail;
    student.password = createdPassword;
    const studentCreated = yield student_model_1.default.create(student);
    const savedStudent = yield studentCreated.save();
    return savedStudent;
});
exports.registerStudent = registerStudent;
const findStudentById = (studentId) => __awaiter(void 0, void 0, void 0, function* () {
    const studentTarget = yield student_model_1.default.findById(studentId, { password: 0 }).populate("pension");
    if (!studentTarget)
        return "NOT_STUDENT_FOUNDED_BY_ID";
    return studentTarget;
});
exports.findStudentById = findStudentById;
const findStudentByDNI = (studentDNI) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(studentDNI);
    const studentTarget = yield student_model_1.default.findOne({ "dni": studentDNI });
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