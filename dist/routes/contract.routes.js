"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const contract_controller_1 = require("./../controllers/contract.controller");
const jwt_handle_1 = require("../middlewares/jwt.handle");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post('/api/contract/signup', jwt_handle_1.verifyToken, contract_controller_1.createContract);
exports.default = router;
//# sourceMappingURL=contract.routes.js.map