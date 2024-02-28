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
exports.loginSecretary = exports.registerSecretary = void 0;
const jwt_handle_1 = require("../middlewares/jwt.handle");
const secretary_model_1 = __importDefault(require("../models/secretary.model"));
const role_model_1 = __importDefault(require("./../models/role.model"));
const registerSecretary = (secretary) => __awaiter(void 0, void 0, void 0, function* () {
    const createdSecretary = yield secretary_model_1.default.create(secretary);
    createdSecretary.password = yield createdSecretary.encryptPassword(createdSecretary.password);
    const role = yield role_model_1.default.findOne({ name: "secretary" });
    createdSecretary.roles = [role === null || role === void 0 ? void 0 : role._id];
    const savedSecretary = yield createdSecretary.save();
    const { _id, email, names } = savedSecretary;
    const data = { _id, email, names };
    const token = (0, jwt_handle_1.generateToken)(`${_id}`);
    return { token, data };
});
exports.registerSecretary = registerSecretary;
const loginSecretary = ({ email, password }) => __awaiter(void 0, void 0, void 0, function* () {
    const secretary = yield secretary_model_1.default.findOne({ email }).populate('roles');
    const readyRoles = [];
    if (!secretary)
        return "EMAIL_INCORRECTO";
    for (let r of secretary === null || secretary === void 0 ? void 0 : secretary.roles) {
        const role = yield role_model_1.default.findById(r);
        if (role)
            readyRoles.push(role.name);
    }
    const isCorrect = yield secretary.validatePassword(password);
    if (!isCorrect)
        return "CONTRASEÑA_INCORRECTA";
    const data = { email: secretary.email, names: secretary.names, _id: secretary._id, rol: readyRoles };
    console.log(data.rol);
    const token = (0, jwt_handle_1.generateToken)(`${secretary._id}`);
    return { token, data };
});
exports.loginSecretary = loginSecretary;
//# sourceMappingURL=secretary.services.js.map