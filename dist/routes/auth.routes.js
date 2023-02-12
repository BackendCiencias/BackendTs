"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_handle_1 = require("./../utils/jwt.handle");
// import { checkJwt } from './../middlewares/session';
const express_1 = require("express");
const router = (0, express_1.Router)();
const auth_controller_1 = require("../controllers/auth.controller");
router.get('/', (req, res) => {
    res.send('Backend alive... at least for now');
});
router.post('/api/auth/secretary/signup', auth_controller_1.signupSecretary);
router.post('/api/auth/secretary/signin', auth_controller_1.signinSecretary);
router.get('/api/auth/secretary/profile', jwt_handle_1.verifyToken, auth_controller_1.profileSecretary);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map