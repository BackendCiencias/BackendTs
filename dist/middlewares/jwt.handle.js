"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isStudent = exports.isSecretary = exports.isDirector = exports.verifyToken = exports.generateToken = void 0;
const role_model_1 = __importDefault(require("./../models/role.model"));
const director_model_1 = __importDefault(require("./../models/director.model"));
const secretary_model_1 = __importDefault(require("./../models/secretary.model"));
const error_handle_1 = require("../utils/error.handle");
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
    // const token = req.cookies["auth-token"];
    // console.log(token);
    const jwtByUser = req.headers.authorization || '';
    const token = jwtByUser.split(' ').pop();
    // console.log(token);
    if (!token)
        return res.status(401).json({ "error": 'TOKEN_MISSING' });
    try {
        const payload = (0, jsonwebtoken_1.verify)(token, JWT_TOKEN);
        req.userId = payload._id;
        next();
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_VERIFICATION_TOKEN', e);
    }
};
exports.verifyToken = verifyToken;
const isDirector = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const director = yield director_model_1.default.findById(req.userId);
    if (!director)
        return res.status(401).json({ "error": 'UNAUTHORIZED' });
    const roles = yield role_model_1.default.find({ _id: { $in: director.roles } });
    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'director') {
            next();
            return;
        }
    }
    return res.status(401).json({ "error": 'Require Director Role' });
    next();
});
exports.isDirector = isDirector;
const isSecretary = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const secretary = yield secretary_model_1.default.findById(req.userId);
    if (!secretary)
        return res.status(401).json({ "error": 'UNAUTHORIZED' });
    const roles = yield role_model_1.default.find({ _id: { $in: secretary.roles } });
    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'secretary') {
            next();
            return;
        }
    }
    return res.status(401).json({ "error": 'Require Secretary Role' });
    next();
});
exports.isSecretary = isSecretary;
const isStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.isStudent = isStudent;
//# sourceMappingURL=jwt.handle.js.map