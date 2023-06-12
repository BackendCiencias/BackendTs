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
exports.studentAttendanceSign = exports.createAttendanceToday = void 0;
const attendance_model_1 = __importDefault(require("./../models/attendance.model"));
const student_model_1 = __importDefault(require("./../models/student.model"));
const createAttendanceToday = (attendance) => __awaiter(void 0, void 0, void 0, function* () {
    const today = new Date();
    const nameAtt = today.getDay() + "/" + today.getMonth() + "/" + today.getFullYear();
    attendance.code = nameAtt;
    const createdAttendance = yield attendance_model_1.default.create(attendance);
    if (attendance.type == 'E') {
        const allStudents = yield student_model_1.default.find({}, { attendanceSpecial: 1 });
        const newAttendance = {
            idAtt: createdAttendance.id,
            code: createdAttendance.code
        };
        try {
            for (let stu of allStudents) {
                stu.attendanceSpecial.push(newAttendance);
                yield stu.save();
            }
            return createdAttendance;
        }
        catch (e) {
            return { error: "ERROR_ATTENDANCETODAY_STUDENT_ASSING_SPECIAL", reason: e };
        }
    }
    else {
        const allStudents = yield student_model_1.default.find({}, { attendanceNormal: 1 });
        const newAttendance = {
            idAtt: createdAttendance.id,
            code: createdAttendance.code
        };
        try {
            if (allStudents[0].attendanceNormal.length > 0) {
                const lastAttendance = allStudents[0].attendanceNormal[allStudents[0].attendanceNormal.length - 1];
                if (lastAttendance.code == createdAttendance.code)
                    return { message: "ALREADY_CREADTED_ATTENDANCE" };
            }
            for (let stu of allStudents) {
                stu.attendanceNormal.push(newAttendance);
                yield stu.save();
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
    const codeAttendanceToday = today.getDay() + "/" + today.getMonth() + "/" + today.getFullYear();
    try {
        const student = yield student_model_1.default.findOne({ dni: dni }, { attendanceNormal: 1 });
        const sz = (student === null || student === void 0 ? void 0 : student.attendanceNormal.length) - 1;
        const midnight = new Date().setHours(0, 0, 0);
        console.log(midnight.toString());
        console.log(student === null || student === void 0 ? void 0 : student.attendanceNormal[sz]);
        return student;
    }
    catch (e) {
        return { error: "ERROR_ATTENDANCETODAY_STUDENT_ASSING", reason: e };
    }
});
exports.studentAttendanceSign = studentAttendanceSign;
//# sourceMappingURL=attendance.services.js.map