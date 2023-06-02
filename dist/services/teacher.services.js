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
exports.getSalaryNoPayed = exports.getAllTeachers = exports.findTeacherByDNI = exports.findTeacherById = exports.modifyTeacher = exports.registerTeacher = void 0;
const stringPreprocesor_1 = require("./../utils/stringPreprocesor");
const teacher_model_1 = __importDefault(require("./../models/teacher.model"));
const role_model_1 = __importDefault(require("./../models/role.model"));
const registerTeacher = (teacher) => __awaiter(void 0, void 0, void 0, function* () {
    const { dni, names } = teacher;
    const { name1, name2, surname1, surname2 } = names;
    // Email
    const createdEmail = (0, stringPreprocesor_1.createEmail)(name1, surname1, surname2);
    const createdPassword = (0, stringPreprocesor_1.createPassword)(dni, name1, name2, surname1, surname2);
    teacher.email = createdEmail;
    teacher.password = createdPassword;
    // Role
    const role = yield role_model_1.default.findOne({ name: "teacher" });
    teacher.roles = [role === null || role === void 0 ? void 0 : role._id];
    const teacherCreated = yield teacher_model_1.default.create(teacher);
    const savedTeacher = yield teacherCreated.save();
    return savedTeacher;
});
exports.registerTeacher = registerTeacher;
const modifyTeacher = (teacher) => __awaiter(void 0, void 0, void 0, function* () {
    // if(!teacher.dni) return "MISSSING_DNI";
    // const isAlready = await Teacher.findOne({"dni": teacher.dni});
    // if(isAlready) return "TEACHER";
    const { dni, names } = teacher;
    const { name1, name2, surname1, surname2 } = names;
    const createdEmail = (0, stringPreprocesor_1.createEmail)(name1, surname1, surname2);
    // const createdEmail:string = "alumno2madero@cienciasperu.edu.pe";
    // const okEmail = await Teacher.find({email: createdEmail}).select('email')
    // console.log(okEmail);
    const createdPassword = (0, stringPreprocesor_1.createPassword)(dni, name1, name2, surname1, surname2);
    teacher.email = createdEmail;
    teacher.password = createdPassword;
    const teacherCreated = yield teacher_model_1.default.create(teacher);
    const savedTeacher = yield teacherCreated.save();
    return savedTeacher;
});
exports.modifyTeacher = modifyTeacher;
const findTeacherById = (teacherId) => __awaiter(void 0, void 0, void 0, function* () {
    const teacherTarget = yield teacher_model_1.default.findById(teacherId, { password: 0 }).populate("payment");
    if (!teacherTarget)
        return "NOT_TEACHER_FOUNDED_BY_ID";
    return teacherTarget;
});
exports.findTeacherById = findTeacherById;
const findTeacherByDNI = (teacherDNI) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(teacherDNI);
    const teacherTarget = yield teacher_model_1.default.findOne({ "dni": teacherDNI }).populate("payment");
    if (!teacherTarget)
        return "NOT_TEACHER_FOUNDED_BY_DNI";
    return teacherTarget;
});
exports.findTeacherByDNI = findTeacherByDNI;
const getAllTeachers = () => __awaiter(void 0, void 0, void 0, function* () {
    const allTeacher = yield teacher_model_1.default.find();
    return allTeacher;
});
exports.getAllTeachers = getAllTeachers;
const getSalaryNoPayed = (teacherId) => __awaiter(void 0, void 0, void 0, function* () {
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
});
exports.getSalaryNoPayed = getSalaryNoPayed;
//# sourceMappingURL=teacher.services.js.map