"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const student_controller_1 = require("./../controllers/student.controller");
const jwt_handle_1 = require("../middlewares/jwt.handle");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post('/api/student/signup', [jwt_handle_1.verifyToken], student_controller_1.createStudent);
router.post('/api/student/signupbulk', [jwt_handle_1.verifyToken], student_controller_1.createBulkStudents);
router.post('/api/student/signin', student_controller_1.signinStudent);
router.get('/api/student', [jwt_handle_1.verifyToken], student_controller_1.getStudents);
router.get('/api/student/:student_id', [jwt_handle_1.verifyToken], student_controller_1.getStudentsByParamId);
router.post('/api/student/id', [jwt_handle_1.verifyToken], student_controller_1.getStudentsById);
router.post('/api/student/dni', [jwt_handle_1.verifyToken], student_controller_1.getStudentsByDNI);
router.post('/api/student/modify', [jwt_handle_1.verifyToken], student_controller_1.modifyStudentData);
router.post('/api/student/image', [jwt_handle_1.verifyToken], student_controller_1.modifyStudentImage);
exports.default = router;
//# sourceMappingURL=student.routes.js.map