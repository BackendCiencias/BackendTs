"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const JWT_TOKEN = process.env.JWT_SECRET || 'tokentest';
const generateToken = (id) => {
    const jwt = (0, jsonwebtoken_1.sign)({ id }, JWT_TOKEN, {
        expiresIn: 60 * 60 * 24
    });
    return jwt;
};
exports.generateToken = generateToken;
const verifyToken = (req, res, next) => {
    const token = req.cookies["auth-token"];
    if (!token)
        return res.status(401).json('Acces denied');
    const payload = (0, jsonwebtoken_1.verify)(token, JWT_TOKEN);
    req.secretaryId = payload.id;
    next();
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=jwt.handle.js.map