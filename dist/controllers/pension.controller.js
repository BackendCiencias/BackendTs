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
exports.payPension = void 0;
const pension_services_1 = require("../services/pension.services");
const error_handle_1 = require("../utils/error.handle");
const payPension = ({ body }, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idStudent, month } = body;
        const payedPension = yield (0, pension_services_1.payMonthPension)(idStudent, month);
        console.log(payedPension);
        res.status(200).send(payedPension);
        // if(payedPension === "CONTRASEÑA_INCORRECTA" || responseSecretary === "EMAIL_INCORRECTO"){
        //     res.status(400)
        //     return res.send({"error": responseSecretary});
        // } 
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_SECRETARY_MONTH_PENSION', e);
    }
});
exports.payPension = payPension;
//# sourceMappingURL=pension.controller.js.map