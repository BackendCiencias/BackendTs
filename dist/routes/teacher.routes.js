"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const teacher_controller_1 = require("./../controllers/teacher.controller");
const jwt_handle_1 = require("../middlewares/jwt.handle");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post('/api/teacher/signup', [jwt_handle_1.verifyToken, jwt_handle_1.isSecretary], teacher_controller_1.createTeacher);
router.get('/api/teacher', [jwt_handle_1.verifyToken, jwt_handle_1.isSecretary], teacher_controller_1.getTeachers);
router.get('/api/teacher/:teacher_id', [jwt_handle_1.verifyToken, jwt_handle_1.isSecretary], teacher_controller_1.getTeachersById);
router.post('/api/teacher/dni', [jwt_handle_1.verifyToken, jwt_handle_1.isSecretary], teacher_controller_1.getTeachersByDNI);
exports.default = router;
//# sourceMappingURL=teacher.routes.js.map