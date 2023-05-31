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
exports.getTeachersByDNI = exports.getTeachersById = exports.getTeachers = exports.createTeacher = void 0;
const payment_services_1 = require("./../services/payment.services");
const teacher_services_1 = require("./../services/teacher.services");
const error_handle_1 = require("../utils/error.handle");
const createTeacher = ({ body }, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { payments } = body;
        if (!payments)
            return res.status(400).send({ "error": "MISSING_PAYMENTS" });
        const responseTeacher = yield (0, teacher_services_1.registerTeacher)(body);
        console.log('already created teacher');
        const responsePayments = yield (0, payment_services_1.registerPayment)(payments, responseTeacher._id);
        console.log('already created payments');
        const actTeacher = yield (0, teacher_services_1.findTeacherById)(responseTeacher._id);
        res.send(actTeacher);
        // res.send({message: "Success"});
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_SIGNUP_TEACHER', e);
    }
});
exports.createTeacher = createTeacher;
// export const updateTeacher =  async({body}: Request, res: Response) => {
//     try{
//         const {payments} = body;
//         const responseTeacher = await modifyTeacher(body);
//         const responsePensions = await modifyPayment(payments, responseTeacher._id);
//         // if(responsePayments == "ERROR_FINDING_TEACHER") return res.status(400).send({"error": responsePayments});
//         const actTeacher = await findTeacherById(responseTeacher._id);
//         res.send(actTeacher);
//         // res.send({message: "Success"});
//     }catch(e){
//         handleHttp(res, 'ERROR_SIGNUP_TEACHER',e);
//     }
// };
const getTeachers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const responseTeachers = yield (0, teacher_services_1.getAllTeachers)();
        res.send(responseTeachers);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_GETALL_TEACHER', e);
    }
});
exports.getTeachers = getTeachers;
const getTeachersById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const responseTeachers = yield (0, teacher_services_1.findTeacherById)(req.params.teacher_id);
        res.send(responseTeachers);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_TEACHER_ID', e);
    }
});
exports.getTeachersById = getTeachersById;
const getTeachersByDNI = ({ body }, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const responseTeachers = yield (0, teacher_services_1.findTeacherByDNI)(body.dni);
        if (responseTeachers == "NOT_TEACHER_FOUNDED_BY_DNI") {
            return res.status(400).send({ error: responseTeachers });
        }
        res.send(responseTeachers);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_TEACHER_DNI', e);
    }
});
exports.getTeachersByDNI = getTeachersByDNI;
//# sourceMappingURL=teacher.controller.js.map