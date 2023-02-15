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
exports.getAllTutors = exports.findTutorByDNI = exports.registerTutor = void 0;
const tutor_model_1 = __importDefault(require("./../models/tutor.model"));
const registerTutor = (tutor) => __awaiter(void 0, void 0, void 0, function* () {
    const tutorCreated = yield tutor_model_1.default.create(tutor);
    const savedSecretary = yield tutorCreated.save();
    return savedSecretary;
});
exports.registerTutor = registerTutor;
const findTutorByDNI = (tutorDNI) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(tutorDNI);
    const tutorTarget = yield tutor_model_1.default.findOne({ "dni": tutorDNI });
    if (!tutorTarget)
        return "NOT_TUTOR_FOUNDED_BY_DNI";
    return tutorTarget;
});
exports.findTutorByDNI = findTutorByDNI;
const getAllTutors = () => __awaiter(void 0, void 0, void 0, function* () {
    const allTutors = yield tutor_model_1.default.find();
    return allTutors;
});
exports.getAllTutors = getAllTutors;
//# sourceMappingURL=tutor.services.js.map