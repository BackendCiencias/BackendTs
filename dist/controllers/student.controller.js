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
exports.getStudents = exports.createStudent = void 0;
const pension_services_1 = require("./../services/pension.services");
const student_services_1 = require("./../services/student.services");
const error_handle_1 = require("../utils/error.handle");
const createStudent = ({ body }, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { pensions } = body;
        const responseStudent = yield (0, student_services_1.registerStudent)(body);
        const responsePensions = yield (0, pension_services_1.registerPension)(pensions);
        res.send({ responseStudent, responsePensions });
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_SIGNUP_STUDENT', e);
    }
});
exports.createStudent = createStudent;
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
//# sourceMappingURL=student.controller.js.map