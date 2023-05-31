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
exports.advanceSalary = exports.signinDirector = exports.signupDirector = void 0;
const director_services_1 = require("./../services/director.services");
const error_handle_1 = require("../utils/error.handle");
const director_services_2 = require("../services/director.services");
const teacher_services_1 = require("../services/teacher.services");
const signupDirector = ({ body }, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const responseDirector = yield (0, director_services_2.registerDirector)(body);
        console.log('already created director');
        res.send(responseDirector);
        // res.send({message: "Success"});
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_SIGNUP_DIRECTOR', e);
    }
});
exports.signupDirector = signupDirector;
const signinDirector = ({ body }, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = body;
        const responseDirector = yield (0, director_services_1.loginDirector)({ email, password });
        if (responseDirector === "CONTRASEÑA_INCORRECTA" || responseDirector === "EMAIL_INCORRECTO") {
            return res.status(400).send({ "error": responseDirector });
        }
        const { token } = responseDirector;
        // sending token
        res.cookie('auth-token', token).json(responseDirector);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_SIGNIN_DIRECTOR', e);
    }
});
exports.signinDirector = signinDirector;
const advanceSalary = ({ body }, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { teacherId, amount } = body;
        const teacherFounded = yield (0, teacher_services_1.findTeacherById)(teacherId);
        if (!teacherFounded)
            return res.status(401).send({ "error": "NOT_FOUNDED_TEACHER" });
        const notPayed = yield (0, teacher_services_1.getSalaryNoPayed)(teacherId);
        res.send(teacherFounded || '123');
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_ADVANCE_SALARY', e);
    }
});
exports.advanceSalary = advanceSalary;
//# sourceMappingURL=director.controller.js.map