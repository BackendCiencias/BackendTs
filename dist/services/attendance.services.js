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
exports.studentPoputaleAttendance = exports.markAttendance = exports.generateAttendanceForYear = void 0;
const attendance_model_1 = __importDefault(require("./../models/attendance.model"));
const student_model_1 = __importDefault(require("./../models/student.model"));
const date_fns_1 = require("date-fns");
const date_fns_tz_1 = require("date-fns-tz");
const generateAttendanceForYear = (studentId) => __awaiter(void 0, void 0, void 0, function* () {
    const year = new Date().getFullYear();
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
    const studentFounded = yield student_model_1.default.findOne({ dni });
    if (!studentFounded)
        throw new Error('STUDENT_NOT_FOUND_ATTENDANCE');
    const timeArrive = new Date();
    timeArrive.setHours(timeArrive.getHours() - 5);
    const hoursArrive = timeArrive.getHours();
    const code = (0, date_fns_1.format)(timeArrive, 'dd/MM/yyyy');
    const responseAttendance = yield attendance_model_1.default.findOne({ student: studentFounded === null || studentFounded === void 0 ? void 0 : studentFounded._id, code });
    if (!responseAttendance)
        throw new Error('NOT_FOUND_MATCH_ATTENDANCE_STUDENT');
    if (responseAttendance.state != 'F')
        throw new Error('ALREADY_SIGN_STUDENT_ATTENDANCE');
    responseAttendance.date = timeArrive;
    let state = 'T';
    if (hoursArrive < 8)
        state = 'P';
    else if (hoursArrive == 8)
        state = (timeArrive.getMinutes() <= 5 ? 'P' : 'T');
    responseAttendance.state = state;
    const savedAttendance = yield responseAttendance.save();
    return {
        state: savedAttendance.state,
        date: savedAttendance.date,
        names: studentFounded === null || studentFounded === void 0 ? void 0 : studentFounded.names,
        grade: studentFounded === null || studentFounded === void 0 ? void 0 : studentFounded.grade
    };
});
exports.markAttendance = markAttendance;
const formatTime = (dateString) => {
    const date = new Date(dateString);
    const timeZone = 'America/Lima';
    const zonedDate = (0, date_fns_tz_1.toZonedTime)(date, timeZone);
    return (0, date_fns_1.format)(zonedDate, 'hh:mm a');
};
const isModified = (date1, date2) => {
    return (date2.getTime() - date1.getTime()) < 10;
};
const studentPoputaleAttendance = (student, month) => __awaiter(void 0, void 0, void 0, function* () {
    const regex = new RegExp(`^\\d{2}/${month}/${2024}$`);
    const attendances = yield attendance_model_1.default.find({
        student: student._id,
        code: regex
    });
    const formatedAttendances = attendances.map(attendance => ({
        state: attendance.state,
        code: attendance.code,
        date: isModified(attendance.createdAt, attendance.updatedAt) ? "--:-- AM" : formatTime(attendance.updatedAt)
    }));
    return { student, attendances: formatedAttendances };
});
exports.studentPoputaleAttendance = studentPoputaleAttendance;
//# sourceMappingURL=attendance.services.js.map