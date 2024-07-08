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
exports.attendanceByStudent = exports.attendanceByGradeAndSection = exports.studentAttendance = void 0;
const attendance_services_1 = require("./../services/attendance.services");
const student_services_1 = require("./../services/student.services");
const studentAttendance = ({ body }, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const responseAssistants = yield (0, attendance_services_1.markAttendance)(body.dni);
        res.send(responseAssistants);
    }
    catch (e) {
        res.status(400).send({ error: e });
    }
});
exports.studentAttendance = studentAttendance;
function compareStudents(student1, student2) {
    const { surname1: s1, surname2: s2, name1: n1, name2: n2 } = student1.names;
    const { surname1: s1Other, surname2: s2Other, name1: n1Other, name2: n2Other } = student2.names;
    return (s1.localeCompare(s1Other) ||
        s2.localeCompare(s2Other) ||
        n1.localeCompare(n1Other) ||
        n2.localeCompare(n2Other));
}
const attendanceByGradeAndSection = ({ body }, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { grade, section, collegue, month } = body;
        const responseStudents = yield (0, student_services_1.studentsByGradeAndSection)(grade, section, collegue);
        console.log(responseStudents);
        const sortedStudents = responseStudents.sort(compareStudents);
        const populatedAttendance = yield Promise.all(responseStudents.map((student) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, attendance_services_1.studentPoputaleAttendance)(student, month); })));
        res.status(200).send(populatedAttendance);
    }
    catch (e) {
        res.status(400).send({ error: e });
    }
});
exports.attendanceByGradeAndSection = attendanceByGradeAndSection;
const attendanceByStudent = ({ body }, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { dni, month } = body;
        const responseStudent = yield (0, student_services_1.findStudentByDNI)(dni);
        console.log("STUDENT", responseStudent);
        const responseAttendance = yield (0, attendance_services_1.studentPoputaleAttendance)(responseStudent, month);
        res.status(200).send(responseAttendance);
    }
    catch (e) {
        res.status(400).send({ error: e });
    }
});
exports.attendanceByStudent = attendanceByStudent;
//# sourceMappingURL=attendance.controller.js.map