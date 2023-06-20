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
exports.getAssistantsByDNI = exports.getAssistantsById = exports.getAssistants = exports.profileAssistant = exports.signinAssistant = exports.createAssistant = void 0;
const payment_services_1 = require("../services/payment.services");
const assistant_services_1 = require("../services/assistant.services");
const error_handle_1 = require("../utils/error.handle");
const assistant_services_2 = require("./../services/assistant.services");
const assistant_model_1 = __importDefault(require("./../models/assistant.model"));
const createAssistant = ({ body }, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { payments } = body;
        if (!payments)
            return res.status(400).send({ "error": "MISSING_PAYMENTS" });
        const responseAssistant = yield (0, assistant_services_1.registerAssistant)(body);
        console.log('already created assistant');
        const responsePayments = yield (0, payment_services_1.registerPayment)(payments, responseAssistant._id);
        console.log('already created payments');
        const actAssistant = yield (0, assistant_services_1.findAssistantById)(responseAssistant._id);
        res.send({ actAssistant, email: responseAssistant.email, password: responseAssistant.password });
        // res.send({message: "Success"});
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_SIGNUP_ASSISTANT', e);
    }
});
exports.createAssistant = createAssistant;
const signinAssistant = ({ body }, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = body;
        const responseAssistant = yield (0, assistant_services_2.loginAssistant)({ email, password });
        if (responseAssistant === "CONTRASEÑA_INCORRECTA" || responseAssistant === "EMAIL_INCORRECTO") {
            res.status(400);
            return res.send({ "error": responseAssistant });
        }
        const { token } = responseAssistant;
        // sending token
        res.cookie('auth-token', token).json(responseAssistant);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_SIGNIN_ASSISTANT', e);
    }
});
exports.signinAssistant = signinAssistant;
const profileAssistant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // finding current secretary
    const secretary = yield assistant_model_1.default.findById(req.userId, { password: 0 });
    if (!secretary)
        return res.status(404).json({ "error": 'No secretary found' });
    // sending res
    res.json({
        email: secretary.email,
        names: secretary.names,
        _id: secretary._id
    });
});
exports.profileAssistant = profileAssistant;
// export const updateAssistant =  async({body}: Request, res: Response) => {
//     try{
//         const {payments} = body;
//         const responseAssistant = await modifyAssistant(body);
//         const responsePensions = await modifyPayment(payments, responseAssistant._id);
//         // if(responsePayments == "ERROR_FINDING_ASSISTANT") return res.status(400).send({"error": responsePayments});
//         const actAssistant = await findAssistantById(responseAssistant._id);
//         res.send(actAssistant);
//         // res.send({message: "Success"});
//     }catch(e){
//         handleHttp(res, 'ERROR_SIGNUP_ASSISTANT',e);
//     }
// };
const getAssistants = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const responseAssistants = yield (0, assistant_services_1.getAllAssistants)();
        res.send(responseAssistants);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_GETALL_ASSISTANT', e);
    }
});
exports.getAssistants = getAssistants;
const getAssistantsById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const responseAssistants = yield (0, assistant_services_1.findAssistantById)(req.params.assistant_id);
        res.send(responseAssistants);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_ASSISTANT_ID', e);
    }
});
exports.getAssistantsById = getAssistantsById;
const getAssistantsByDNI = ({ body }, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const responseAssistants = yield (0, assistant_services_1.findAssistantByDNI)(body.dni);
        if (responseAssistants == "NOT_ASSISTANT_FOUNDED_BY_DNI") {
            return res.status(400).send({ error: responseAssistants });
        }
        res.send(responseAssistants);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_ASSISTANT_DNI', e);
    }
});
exports.getAssistantsByDNI = getAssistantsByDNI;
//# sourceMappingURL=assistant.controller.js.map