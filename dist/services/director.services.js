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
exports.loginDirector = exports.registerDirector = void 0;
const jwt_handle_1 = require("../middlewares/jwt.handle");
const director_model_1 = __importDefault(require("../models/director.model"));
const role_model_1 = __importDefault(require("./../models/role.model"));
const registerDirector = (director) => __awaiter(void 0, void 0, void 0, function* () {
    const createdDirector = yield director_model_1.default.create(director);
    createdDirector.password = yield createdDirector.encryptPassword(createdDirector.password);
    const role = yield role_model_1.default.findOne({ name: "director" });
    createdDirector.roles = [role === null || role === void 0 ? void 0 : role._id];
    const savedDirector = yield createdDirector.save();
    const { _id, email, names } = savedDirector;
    const data = { _id, email, names };
    const token = (0, jwt_handle_1.generateToken)(`${_id}`);
    return { token, data };
    // return {"message": "Prohibido crear directores nuevos, contacte a servicio tecnico :P"};
});
exports.registerDirector = registerDirector;
const loginDirector = ({ email, password }) => __awaiter(void 0, void 0, void 0, function* () {
    const director = yield director_model_1.default.findOne({ email });
    if (!director)
        return "EMAIL_INCORRECTO";
    const isCorrect = yield director.validatePassword(password); //validate in utils?
    if (!isCorrect)
        return "CONTRASEÑA_INCORRECTA";
    const data = { email: director.email, names: director.names, _id: director._id };
    const token = (0, jwt_handle_1.generateToken)(`${director._id}`);
    return { token, data };
});
exports.loginDirector = loginDirector;
//# sourceMappingURL=director.services.js.map