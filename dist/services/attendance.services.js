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
exports.todayAttendance = exports.studentAttendanceSign = exports.createAttendanceToday = void 0;
const attendance_model_1 = __importDefault(require("./../models/attendance.model"));
const student_model_1 = __importDefault(require("./../models/student.model"));
const date_fns_1 = require("date-fns");
const createAttendanceToday = (attendance) => __awaiter(void 0, void 0, void 0, function* () {
    const today = new Date();
    const codeToday = (0, date_fns_1.format)(today, 'dd/MM/yyyy');
    attendance.code = codeToday;
    if (attendance.type == 'E') {
        const newIndex = yield attendance_model_1.default.count();
        attendance.code = codeToday + "_E" + newIndex;
        const createdAttendance = yield attendance_model_1.default.create(attendance);
        const allStudents = yield student_model_1.default.find({}, { attendanceSpecial: 1 });
        const newAttendance = {
            idAtt: createdAttendance.id,
            code: createdAttendance.code
        };
        try {
            for (let stu of allStudents) {
                stu.attendanceSpecial.push(newAttendance);
                stu.save();
            }
            return createdAttendance;
        }
        catch (e) {
            return { error: "ERROR_ATTENDANCETODAY_STUDENT_ASSING_SPECIAL", reason: e };
        }
    }
    else {
        const checkExist = yield attendance_model_1.default.findOne({ code: codeToday });
        if (checkExist)
            return "ERROR_ALREADY_CREADTED_ATTENDANCE";
        const createdAttendance = yield attendance_model_1.default.create(attendance);
        const allStudents = yield student_model_1.default.find({}, { attendanceNormal: 1 });
        const newAttendance = {
            idAtt: createdAttendance.id,
            code: createdAttendance.code
        };
        try {
            for (let stu of allStudents) {
                stu.attendanceNormal.push(newAttendance);
                stu.save();
            }
            return createdAttendance;
        }
        catch (e) {
            return { error: "ERROR_ATTENDANCETODAY_STUDENT_ASSING_NORMAL", reason: e };
        }
    }
});
exports.createAttendanceToday = createAttendanceToday;
const studentAttendanceSign = (dni) => __awaiter(void 0, void 0, void 0, function* () {
    const today = new Date();
    const codeToday = (0, date_fns_1.format)(today, 'dd/MM/yyyy');
    try {
        // Nombre apellidos grado foto
        const student = yield student_model_1.default.findOne({ dni: dni }, { names: 1, grade: 1, attendanceNormal: 1 });
        if (!student)
            return { error: "STUDENT_NOT_FOUND_ATTENDANCE" };
        const sz = (student === null || student === void 0 ? void 0 : student.attendanceNormal.length) - 1;
        if (student.attendanceNormal[sz].state != "C")
            return "ALREADY_SIGN_STUDENT_ATTENDANCE";
        const timeNow = new Date();
        const timeLate = new Date();
        let stateAtt = "A";
        timeLate.setHours(8, 0, 0, 0);
        if (timeNow > timeLate)
            stateAtt = "B";
        student.attendanceNormal[sz].state = stateAtt;
        student.attendanceNormal[sz].timeAtt = timeNow;
        student.save();
        return { state: stateAtt, time: timeNow, student: student };
    }
    catch (error) {
        return { error: "ERROR_SING_STUDENT_ATTENDACE", reason: error };
    }
});
exports.studentAttendanceSign = studentAttendanceSign;
const todayAttendance = () => __awaiter(void 0, void 0, void 0, function* () {
    const today = new Date();
    const codeToday = (0, date_fns_1.format)(today, 'dd/MM/yyyy');
    console.log("consultando por el codigo: ", codeToday);
    const allAttendances = yield attendance_model_1.default.find({ code: codeToday });
    return {
        attendance: allAttendances
    };
});
exports.todayAttendance = todayAttendance;
//# sourceMappingURL=attendance.services.js.map