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
exports.generateAllVacancies = exports.collegueVacancies = exports.getVacancies = void 0;
const classroom_services_1 = require("./../services/classroom.services");
const error_handle_1 = require("../utils/error.handle");
const getVacancies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const responseVacancies = yield (0, classroom_services_1.getAllVacancies)();
        res.send(responseVacancies);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_VACANCIES', e);
    }
});
exports.getVacancies = getVacancies;
const collegueVacancies = ({ body }, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const responseVacancies = yield (0, classroom_services_1.getVacanciesByCollegue)(`${body.collegue}`);
        res.send(responseVacancies);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_VACANCIES', e);
    }
});
exports.collegueVacancies = collegueVacancies;
const generateAllVacancies = ({ body }, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const responseCreate = yield (0, classroom_services_1.registerVacancies)(body.classrooms);
        res.send(responseCreate);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_CREATE_VACANCIES', e);
    }
});
exports.generateAllVacancies = generateAllVacancies;
//# sourceMappingURL=classroom.controller.js.map