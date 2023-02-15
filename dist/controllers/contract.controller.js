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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContract = void 0;
const contract_services_1 = require("./../services/contract.services");
const error_handle_1 = require("../utils/error.handle");
const createContract = ({ body }, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tutorsDNI, studentsDNI } = body;
        const contractResponse = yield (0, contract_services_1.registerContract)(tutorsDNI, studentsDNI);
        if (contractResponse == "TUTORS_DNI_IS_EMPTY" || contractResponse == "STUDENTS_DNI_IS_EMPTY") {
            return res.status(400).send({ "error": contractResponse });
        }
        res.send(contractResponse);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_SIGNUP_CONTRACT', e);
    }
});
exports.createContract = createContract;
//# sourceMappingURL=contract.controller.js.map