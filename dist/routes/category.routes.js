"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const category_controller_1 = require("../controllers/category.controller");
const jwt_handle_1 = require("../middlewares/jwt.handle");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/api/category/', jwt_handle_1.verifyToken, category_controller_1.getCategories);
router.post('/api/category/create', jwt_handle_1.verifyToken, category_controller_1.createCategory);
exports.default = router;
//# sourceMappingURL=category.routes.js.map