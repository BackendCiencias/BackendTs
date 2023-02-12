"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_handle_1 = require("./../utils/jwt.handle");
const express_1 = require("express");
const router = (0, express_1.Router)();
const tutor_controller_1 = require("../controllers/tutor.controller");
router.post('/api/tutor/signup', jwt_handle_1.verifyToken, tutor_controller_1.createTutor);
exports.default = router;
//# sourceMappingURL=tutor.routes.js.map