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
exports.getSalaryNoPayed = exports.getAllAssistants = exports.findAssistantByDNI = exports.findAssistantById = exports.modifyAssistant = exports.loginAssistant = exports.registerAssistant = void 0;
const stringPreprocesor_1 = require("../utils/stringPreprocesor");
const assistant_model_1 = __importDefault(require("../models/assistant.model"));
const role_model_1 = __importDefault(require("../models/role.model"));
const jwt_handle_1 = require("../middlewares/jwt.handle");
const registerAssistant = (assistant) => __awaiter(void 0, void 0, void 0, function* () {
    const { dni, names } = assistant;
    const { name1, name2, surname1, surname2 } = names;
    const createdEmail = (0, stringPreprocesor_1.createEmail)(name1, surname1, surname2);
    const literalPassword = (0, stringPreprocesor_1.createPassword)(dni, name1, name2, surname1, surname2);
    assistant.password = literalPassword;
    assistant.email = createdEmail;
    const role = yield role_model_1.default.findOne({ name: "assistant" });
    assistant.roles = [role === null || role === void 0 ? void 0 : role._id];
    const assistantCreated = yield assistant_model_1.default.create(assistant);
    assistantCreated.password = yield assistantCreated.encryptPassword(literalPassword);
    const savedAssistant = yield assistantCreated.save();
    console.log(savedAssistant);
    return {
        _id: savedAssistant._id,
        email: createdEmail,
        password: literalPassword
    };
});
exports.registerAssistant = registerAssistant;
const loginAssistant = ({ email, password }) => __awaiter(void 0, void 0, void 0, function* () {
    const assistant = yield assistant_model_1.default.findOne({ email });
    if (!assistant)
        return "EMAIL_INCORRECTO";
    const isCorrect = yield assistant.validatePassword(password); //validate in utils?
    if (!isCorrect)
        return "CONTRASEÑA_INCORRECTA";
    const data = { email: assistant.email, names: assistant.names, _id: assistant._id };
    const token = (0, jwt_handle_1.generateToken)(`${assistant._id}`);
    return { token, data };
});
exports.loginAssistant = loginAssistant;
const modifyAssistant = (assistant) => __awaiter(void 0, void 0, void 0, function* () {
    // if(!assistant.dni) return "MISSSING_DNI";
    // const isAlready = await Assistant.findOne({"dni": assistant.dni});
    // if(isAlready) return "ASSISTANT";
    const { dni, names } = assistant;
    const { name1, name2, surname1, surname2 } = names;
    const createdEmail = (0, stringPreprocesor_1.createEmail)(name1, surname1, surname2);
    // const createdEmail:string = "alumno2madero@cienciasperu.edu.pe";
    // const okEmail = await Assistant.find({email: createdEmail}).select('email')
    // console.log(okEmail);
    const createdPassword = (0, stringPreprocesor_1.createPassword)(dni, name1, name2, surname1, surname2);
    assistant.email = createdEmail;
    assistant.password = createdPassword;
    const assistantCreated = yield assistant_model_1.default.create(assistant);
    const savedAssistant = yield assistantCreated.save();
    return savedAssistant;
});
exports.modifyAssistant = modifyAssistant;
const findAssistantById = (assistantId) => __awaiter(void 0, void 0, void 0, function* () {
    const assistantTarget = yield assistant_model_1.default.findById(assistantId, { password: 0 }).populate("payment");
    if (!assistantTarget)
        return "NOT_ASSISTANT_FOUNDED_BY_ID";
    return assistantTarget;
});
exports.findAssistantById = findAssistantById;
const findAssistantByDNI = (assistantDNI) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(assistantDNI);
    const assistantTarget = yield assistant_model_1.default.findOne({ "dni": assistantDNI }).populate("payment");
    if (!assistantTarget)
        return "NOT_ASSISTANT_FOUNDED_BY_DNI";
    return assistantTarget;
});
exports.findAssistantByDNI = findAssistantByDNI;
const getAllAssistants = () => __awaiter(void 0, void 0, void 0, function* () {
    const allAssistant = yield assistant_model_1.default.find();
    return allAssistant;
});
exports.getAllAssistants = getAllAssistants;
const getSalaryNoPayed = (assistantId) => __awaiter(void 0, void 0, void 0, function* () {
    // let acum = 0;
    // const assistantFounded = await findAssistantById(assistantId);
    // if(assistantFounded === "NOT_ASSISTANT_FOUNDED_BY_ID") throw new Error('NO ASSISTANT FOUND');
    // const year = new Date().getFullYear();
    // const paymentAct = assistantFounded.payment.find(e => e.year == year);
    // if(!paymentAct) throw new Error('NO PAYMENT FOUND');
    // const months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
    // for (let month of months){
    //     console.log(paymentAct[`${month}`]);
    //     acum += paymentAct[month]["total"];
    //     acum -= paymentAct[month]["payed"];
    // }
    // console.log(acum);
});
exports.getSalaryNoPayed = getSalaryNoPayed;
//# sourceMappingURL=assistant.services.js.map