"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const director_controller_1 = require("./../controllers/director.controller");
const jwt_handle_1 = require("../middlewares/jwt.handle");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post('/api/director/signup', [jwt_handle_1.verifyToken, jwt_handle_1.isDirector], director_controller_1.signupDirector);
router.post('/api/director/signin', director_controller_1.signinDirector);
router.post('/api/director/pay', [jwt_handle_1.verifyToken, jwt_handle_1.isDirector], director_controller_1.advanceSalary);
exports.default = router;
//# sourceMappingURL=director.routes.js.map