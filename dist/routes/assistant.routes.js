"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assistant_controller_1 = require("../controllers/assistant.controller");
const jwt_handle_1 = require("../middlewares/jwt.handle");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post('/api/assistant/signup', [jwt_handle_1.verifyToken, jwt_handle_1.isSecretary], assistant_controller_1.createAssistant);
router.post('/api/assistant/signin', assistant_controller_1.signinAssistant);
router.get('/api/assistant', [jwt_handle_1.verifyToken, jwt_handle_1.isSecretary], assistant_controller_1.getAssistants);
router.get('/api/assistant/:assistant_id', [jwt_handle_1.verifyToken, jwt_handle_1.isSecretary], assistant_controller_1.getAssistantsById);
router.post('/api/assistant/dni', [jwt_handle_1.verifyToken, jwt_handle_1.isSecretary], assistant_controller_1.getAssistantsByDNI);
router.post('/api/assistant/createatt', [jwt_handle_1.verifyToken, jwt_handle_1.isAssistant], assistant_controller_1.createAttendance);
router.post('/api/assistant/studentAtt', [jwt_handle_1.verifyToken, jwt_handle_1.isAssistant], assistant_controller_1.studentAttendance);
exports.default = router;
//# sourceMappingURL=assistant.routes.js.map