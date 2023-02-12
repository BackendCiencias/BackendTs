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
exports.registerVacancies = exports.getVacanciesByCollegue = exports.getAllVacancies = exports.updateVacancies = void 0;
const classroom_model_1 = __importDefault(require("./../models/classroom.model"));
const updateVacancies = () => {
    return "updateVacancies";
};
exports.updateVacancies = updateVacancies;
const getAllVacancies = () => __awaiter(void 0, void 0, void 0, function* () {
    const allClassroom = yield classroom_model_1.default.find();
    const spreadClassroom = [];
    allClassroom.forEach(element => {
        const { grade, collegue, capacity, students } = element;
        const vacancies = capacity - students.length;
        spreadClassroom.push({ grade, collegue, vacancies });
    });
    return spreadClassroom;
});
exports.getAllVacancies = getAllVacancies;
const getVacanciesByCollegue = (collegue) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(collegue);
    if (!collegue || collegue == "undefined")
        return "MISSING_COLLEGUE_ARGUMENT";
    const allClassroom = yield classroom_model_1.default.find({ "collegue": collegue });
    const spreadClassroom = [];
    allClassroom.forEach(element => {
        const { grade, collegue, capacity, students } = element;
        const vacancies = capacity - students.length;
        spreadClassroom.push({ grade, collegue, vacancies });
    });
    return spreadClassroom;
});
exports.getVacanciesByCollegue = getVacanciesByCollegue;
const registerVacancies = (classroomArr) => __awaiter(void 0, void 0, void 0, function* () {
    // let x = 0;
    // classroomArr.forEach(async e =>  {
    //     console.log(`element ${x++}`, e.grade);
    //     const classroomCreated = await Classroom.create(e);
    //     if(!classroomCreated) return "ERROR_CREATE_CLASSROOM";
    // });
    return "Desactivado :P";
});
exports.registerVacancies = registerVacancies;
//# sourceMappingURL=classroom.services.js.map