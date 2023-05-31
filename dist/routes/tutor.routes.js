"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tutor_controller_1 = require("./../controllers/tutor.controller");
const jwt_handle_1 = require("../middlewares/jwt.handle");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post('/api/tutor/create', jwt_handle_1.verifyToken, tutor_controller_1.createTutor);
router.post('/api/tutor/dni', jwt_handle_1.verifyToken, tutor_controller_1.getTutorsByDNI);
router.get('/api/tutor', jwt_handle_1.verifyToken, tutor_controller_1.getTutors);
exports.default = router;
//# sourceMappingURL=tutor.routes.js.map