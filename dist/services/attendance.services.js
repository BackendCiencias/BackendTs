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
exports.markAttendance = exports.generateAttendanceForYear = void 0;
const attendance_model_1 = __importDefault(require("./../models/attendance.model"));
const student_model_1 = __importDefault(require("./../models/student.model"));
const date_fns_1 = require("date-fns");
const generateAttendanceForYear = (studentId) => __awaiter(void 0, void 0, void 0, function* () {
    const year = new Date().getFullYear();
    console.log(year);
    const attendance = [];
    for (let month = 0; month < 12; month++) {
        for (let day = 1; day <= daysInMonth(month, year); day++) {
            const code = (0, date_fns_1.format)(new Date(year, month, day), 'dd/MM/yyyy');
            attendance.push({ student: studentId, code });
        }
    }
    yield attendance_model_1.default.insertMany(attendance);
});
exports.generateAttendanceForYear = generateAttendanceForYear;
function daysInMonth(month, year) {
    return new Date(year, month + 1, 0).getDate();
}
const markAttendance = (dni) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studentFounded = yield student_model_1.default.findOne({ dni });
        if (!studentFounded)
            throw new Error('STUDENT_NOT_FOUND_ATTENDANCE');
        const timeArrive = new Date();
        const code = (0, date_fns_1.format)(timeArrive, 'dd/MM/yyyy');
        const responseAttendance = yield attendance_model_1.default.findOne({ student: studentFounded === null || studentFounded === void 0 ? void 0 : studentFounded._id, code });
        if (!responseAttendance)
            return 'NOT_FOUND_MATCH_ATTENDANCE_STUDENT';
        const hoursArrive = timeArrive.getHours();
        if (responseAttendance.state != 'F')
            return 'ALREADY_SIGN_STUDENT_ATTENDANCE';
        var fechaUTC = new Date(timeArrive);
        fechaUTC.setHours(fechaUTC.getHours() - 5);
        responseAttendance.date = fechaUTC;
        responseAttendance.state = (hoursArrive < 8) ? 'P' : 'T';
        const savedAttendance = yield responseAttendance.save();
        return {
            state: savedAttendance.state,
            date: savedAttendance.date,
            names: studentFounded === null || studentFounded === void 0 ? void 0 : studentFounded.names,
            grade: studentFounded === null || studentFounded === void 0 ? void 0 : studentFounded.grade
        };
    }
    catch (e) {
        return { error: "ERROR_SING_STUDENT_ATTENDACE", reason: e };
    }
});
exports.markAttendance = markAttendance;
//# sourceMappingURL=attendance.services.js.map