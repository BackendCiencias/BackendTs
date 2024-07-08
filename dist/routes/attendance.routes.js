"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const attendance_controller_1 = require("./../controllers/attendance.controller");
const jwt_handle_1 = require("../middlewares/jwt.handle");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post('/api/attendance/studentAtt', [jwt_handle_1.verifyToken, jwt_handle_1.isAssistant], attendance_controller_1.studentAttendance);
router.post('/api/attendance/classroom', [jwt_handle_1.verifyToken], attendance_controller_1.attendanceByGradeAndSection);
router.post('/api/attendance/student', [jwt_handle_1.verifyToken], attendance_controller_1.attendanceByStudent);
exports.default = router;
//# sourceMappingURL=attendance.routes.js.map