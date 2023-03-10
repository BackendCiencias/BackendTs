"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token)
        return res.status(401).json('Acces denied');
    const payload = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET || 'tokentest');
    req.secretaryId = payload._id;
    next();
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=verifyToken.js.map