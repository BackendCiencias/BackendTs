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
exports.studentAttendance = void 0;
const attendance_services_1 = require("./../services/attendance.services");
const studentAttendance = ({ body }, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const responseAssistants = yield (0, attendance_services_1.markAttendance)(body.dni);
        res.send(responseAssistants);
    }
    catch (e) {
        res.status(400).send({ error: e.message });
    }
});
exports.studentAttendance = studentAttendance;
//# sourceMappingURL=attendance.controller.js.map