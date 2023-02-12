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
exports.profileSecretary = exports.signinSecretary = exports.signupSecretary = void 0;
const secretary_services_1 = require("./../services/secretary.services");
const secretary_model_1 = __importDefault(require("../models/secretary.model"));
const error_handle_1 = require("../utils/error.handle");
const secretary_services_2 = require("../services/secretary.services");
const signupSecretary = ({ body }, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token, data } = yield (0, secretary_services_2.registerSecretary)(body);
        res.cookie('auth-token', token).json({ data });
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_SIGNUP_SECRETARY', e);
    }
});
exports.signupSecretary = signupSecretary;
const signinSecretary = ({ body }, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = body;
        const responseSecretary = yield (0, secretary_services_1.loginSecretary)({ email, password });
        if (responseSecretary === "CONTRASEÑA_INCORRECTA" || responseSecretary === "EMAIL_INCORRECTO") {
            res.status(400);
            return res.send({ "error": responseSecretary });
        }
        const { token } = responseSecretary;
        // sending token
        res.cookie('auth-token', token).json(responseSecretary);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_SIGNIN_SECRETARY', e);
    }
});
exports.signinSecretary = signinSecretary;
const profileSecretary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // finding current secretary
    const secretary = yield secretary_model_1.default.findById(req.secretaryId, { password: 0 });
    if (!secretary)
        return res.status(404).json('No secretary found');
    // sending res
    res.json({
        email: secretary.email,
        names: secretary.names,
        _id: secretary._id
    });
});
exports.profileSecretary = profileSecretary;
//# sourceMappingURL=auth.controller.js.map