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
exports.profile = exports.signin = exports.signup = void 0;
const secretary_model_1 = __importDefault(require("../models/secretary.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // saving a new secretary
    const secretary = new secretary_model_1.default({
        names: req.body.names,
        genre: req.body.genre,
        dni: req.body.dni,
        nationality: req.body.nationality,
        address: req.body.address,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password,
    });
    secretary.password = yield secretary.encryptPassword(secretary.password);
    const savedSecretary = yield secretary.save();
    // .catch((error) => {
    //     console.log(error);
    //     res.send("Error en la creación");
    // });
    console.log(savedSecretary);
    //token 
    const token = jsonwebtoken_1.default.sign({ _id: savedSecretary._id }, process.env.TOKEN_SECRET || 'tokentest');
    res.header('auth-token', token).json(savedSecretary);
    res.send('signup');
});
exports.signup = signup;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const secretary = yield secretary_model_1.default.findOne({ email: req.body.email });
    if (!secretary)
        return res.status(400).json('Email or password is wrong');
    const okPasword = yield secretary.validatePassword(req.body.password);
    if (!okPasword)
        return res.status(400).json('Invalid Password');
    const token = jsonwebtoken_1.default.sign({ _id: secretary._id }, process.env.TOKEN_SECRET || 'tokentest', {
        expiresIn: 60 * 60 * 24
    });
    res.header('auth-token', token).json(secretary);
});
exports.signin = signin;
const profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const secretary = yield secretary_model_1.default.findById(req.secretaryId, { password: 0 });
    if (!secretary)
        return res.status(404).json('No secretary found');
    res.json(secretary);
});
exports.profile = profile;
//# sourceMappingURL=auth.controller.js.map