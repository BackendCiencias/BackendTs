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
exports.getTodayAttendance = exports.studentAttendance = exports.createAttendance = void 0;
const error_handle_1 = require("../utils/error.handle");
const attendance_services_1 = require("./../services/attendance.services");
const createAttendance = ({ body }, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const responseAttendance = yield (0, attendance_services_1.createAttendanceToday)(body);
        if (responseAttendance == "ERROR_ALREADY_CREADTED_ATTENDANCE") {
            return res.status(400).send({ error: responseAttendance });
        }
        res.send(responseAttendance);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_ASSISTANT_CREATE_ATTENDANCE', e);
    }
});
exports.createAttendance = createAttendance;
const studentAttendance = ({ body }, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const responseAssistants = yield (0, attendance_services_1.studentAttendanceSign)(body.dni);
        // if(responseAssistants == "ALREADY_CREATE_ATTENDANCE"){
        //     return res.status(400).send({error: responseAssistants});
        // }
        res.send(responseAssistants);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_STUDENT_ATTENDANCE', e);
    }
});
exports.studentAttendance = studentAttendance;
const getTodayAttendance = ({ body }, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const responseAssistants = yield (0, attendance_services_1.todayAttendance)();
        // if(responseAssistants == "ALREADY_CREATE_ATTENDANCE"){
        //     return res.status(400).send({error: responseAssistants});
        // }
        res.send(responseAssistants);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_GET_TODAY_ATTENDANCE', e);
    }
});
exports.getTodayAttendance = getTodayAttendance;
//# sourceMappingURL=attendance.controller.js.map