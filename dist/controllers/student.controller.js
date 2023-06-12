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
Object.defineProperty(exports, "__esModule", { value: true });
exports.signinStudent = exports.getStudentsByDNI = exports.getStudentsById = exports.getStudents = exports.createBulkStudents = exports.createStudent = void 0;
const classroom_services_1 = require("./../services/classroom.services");
const pension_services_1 = require("./../services/pension.services");
const student_services_1 = require("./../services/student.services");
const classroom_services_2 = require("../services/classroom.services");
const error_handle_1 = require("../utils/error.handle");
const createStudent = ({ body }, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { pensions } = body;
        const okVacancies = yield (0, classroom_services_2.checkVacancies)(body.grade, body.collegue);
        if (okVacancies == "Invalid grade and collegue")
            return res.status(400).send({ error: okVacancies });
        if (!okVacancies)
            return res.status(400).send({ error: "Sold out vacancies" });
        const responseStudent = yield (0, student_services_1.registerStudent)(body);
        if (responseStudent) {
            const { _id, grade, collegue } = responseStudent;
            yield (0, classroom_services_1.updateVacancies)(_id, grade, collegue);
        }
        // if(responseStudent == "MISSSING_DNI") return res.status(400).send({"error": responseStudent});
        const responsePensions = yield (0, pension_services_1.registerPension)(pensions, responseStudent._id);
        // if(responsePensions == "ERROR_FINDING_STUDENT") return res.status(400).send({"error": responsePensions});
        const actStudent = yield (0, student_services_1.findStudentById)(responseStudent._id);
        res.send({ actStudent, email: responseStudent.email, password: responseStudent.password });
        // res.send({message: "Success"});
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_SIGNUP_STUDENT', e);
    }
});
exports.createStudent = createStudent;
const createBulkStudents = ({ body }, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { pensions } = body;
        const responseStudent = yield (0, student_services_1.registerStudentSpecial)(body);
        res.status(200).send(responseStudent);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_SIGNUP_SPECIAL_BULK_STUDENTS', e);
    }
});
exports.createBulkStudents = createBulkStudents;
const getStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const responseStudents = yield (0, student_services_1.getAllStudents)();
        res.send(responseStudents);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_GETALL_STUDENT', e);
    }
});
exports.getStudents = getStudents;
const getStudentsById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const responseStudents = yield (0, student_services_1.findStudentById)(req.params.student_id);
        res.send(responseStudents);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_STUDENT_ID', e);
    }
});
exports.getStudentsById = getStudentsById;
const getStudentsByDNI = ({ body }, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const responseStudents = yield (0, student_services_1.findStudentByDNI)(body.dni);
        if (responseStudents == "NOT_STUDENT_FOUNDED_BY_DNI") {
            return res.status(400).send({ error: responseStudents });
        }
        res.send(responseStudents);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_STUDENT_DNI', e);
    }
});
exports.getStudentsByDNI = getStudentsByDNI;
const signinStudent = ({ body }, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = body;
        const responseStudent = yield (0, student_services_1.loginStudent)({ email, password });
        console.log("bien");
        if (responseStudent === "CONTRASEÑA_INCORRECTA" || responseStudent === "EMAIL_INCORRECTO") {
            res.status(400);
            return res.send({ "error": responseStudent });
        }
        const { token } = responseStudent;
        // sending token
        res.cookie('auth-token', token).json(responseStudent);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_SIGNIN_STUDENT', e);
    }
});
exports.signinStudent = signinStudent;
//# sourceMappingURL=student.controller.js.map