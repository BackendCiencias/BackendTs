"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_handle_1 = require("./../utils/jwt.handle");
const express_1 = require("express");
const router = (0, express_1.Router)();
const student_controller_1 = require("../controllers/student.controller");
router.post('/api/student/signup', jwt_handle_1.verifyToken, student_controller_1.createStudent);
exports.default = router;
//# sourceMappingURL=student.routes.js.map