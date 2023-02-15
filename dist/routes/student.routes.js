"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const student_controller_1 = require("./../controllers/student.controller");
const jwt_handle_1 = require("./../utils/jwt.handle");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post('/api/student/signup', jwt_handle_1.verifyToken, student_controller_1.createStudent);
router.get('/api/student', jwt_handle_1.verifyToken, student_controller_1.getStudents);
router.get('/api/student/:student_id', jwt_handle_1.verifyToken, student_controller_1.getStudentsById);
router.post('/api/student/dni', jwt_handle_1.verifyToken, student_controller_1.getStudentsByDNI);
exports.default = router;
//# sourceMappingURL=student.routes.js.map