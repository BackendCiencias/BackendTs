"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const JWT_TOKEN = process.env.JWT_SECRET || 'tokentest';
const generateToken = (_id) => {
    const jwt = (0, jsonwebtoken_1.sign)({ _id }, JWT_TOKEN, {
        expiresIn: 60 * 60 * 2,
    });
    return jwt;
};
exports.generateToken = generateToken;
const verifyToken = (req, res, next) => {
    const token = req.cookies["auth-token"];
    console.log(token);
    if (!token)
        return res.status(401).json('Acces denied');
    const payload = (0, jsonwebtoken_1.verify)(token, JWT_TOKEN);
    req.secretaryId = payload._id;
    next();
};
exports.verifyToken = verifyToken;
// export const verifyToken = (jwt:string) => {
//     const isCorrect = verify(jwt, JWT_TOKEN);
//     return isCorrect;
// }
//# sourceMappingURL=jwt.handle.js.map