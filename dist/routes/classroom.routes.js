"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_handle_1 = require("./../utils/jwt.handle");
const express_1 = require("express");
const router = (0, express_1.Router)();
const classroom_controller_1 = require("../controllers/classroom.controller");
router.get('/api/classroom/', jwt_handle_1.verifyToken, classroom_controller_1.getVacancies);
router.post('/api/classroom/vacancies', jwt_handle_1.verifyToken, classroom_controller_1.collegueVacancies);
router.post('/api/classroom/generate', jwt_handle_1.verifyToken, classroom_controller_1.generateAllVacancies);
router.post('/api/classroom/addcapacity', jwt_handle_1.verifyToken, classroom_controller_1.addCapacityVacancies);
exports.default = router;
//# sourceMappingURL=classroom.routes.js.map