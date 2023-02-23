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
exports.registerVacancies = exports.addVacancies = exports.getVacanciesByCollegue = exports.getAllVacancies = exports.checkVacancies = exports.updateVacancies = void 0;
const classroom_model_1 = __importDefault(require("./../models/classroom.model"));
const updateVacancies = (studentId, studentGrade, studentCollegue) => __awaiter(void 0, void 0, void 0, function* () {
    const findClassroom = yield classroom_model_1.default.findOne({ grade: studentGrade, collegue: studentCollegue });
    findClassroom === null || findClassroom === void 0 ? void 0 : findClassroom.students.push(studentId);
    findClassroom === null || findClassroom === void 0 ? void 0 : findClassroom.save();
    return "updateVacancies";
});
exports.updateVacancies = updateVacancies;
const checkVacancies = (studentGrade, studentCollegue) => __awaiter(void 0, void 0, void 0, function* () {
    const okClassroom = yield classroom_model_1.default.findOne({ grade: studentGrade, collegue: studentCollegue });
    if (!okClassroom)
        return "Invalid grade and collegue";
    const { capacity, students } = okClassroom;
    return (capacity - students.length) > 0;
});
exports.checkVacancies = checkVacancies;
const getAllVacancies = () => __awaiter(void 0, void 0, void 0, function* () {
    const allClassroom = yield classroom_model_1.default.find();
    const spreadClassroom = [];
    allClassroom.forEach(element => {
        const { grade, collegue, capacity, students } = element;
        const ocuped = students.length;
        spreadClassroom.push({ grade, collegue, capacity, ocuped });
    });
    return spreadClassroom;
});
exports.getAllVacancies = getAllVacancies;
const getVacanciesByCollegue = (collegue) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(collegue);
    if (!collegue || collegue == "undefined")
        return "MISSING_COLLEGUE_ARGUMENT";
    const keyWords = [];
    if (collegue == "Cimas") {
        keyWords.push("Colegio Cimas");
    }
    else if (collegue == "Ciencias") {
        keyWords.push("Ciencias Aplicadas");
        keyWords.push("Ciencias Secundaria");
    }
    else {
        return { error: "Collegue not found" };
    }
    const allClassroom = yield classroom_model_1.default.find({ "collegue": keyWords });
    const iniClassroom = [];
    const primClassroom = [];
    const secClassroom = [];
    allClassroom.forEach(element => {
        const { grade, collegue, capacity, students } = element;
        const ocuped = students.length;
        if (grade.includes("inicial")) {
            iniClassroom.push({ grade, collegue, capacity, ocuped });
        }
        else if (grade.includes("primaria")) {
            primClassroom.push({ grade, collegue, capacity, ocuped });
        }
        else {
            secClassroom.push({ grade, collegue, capacity, ocuped });
        }
    });
    return { "Inicial": iniClassroom, "Primaria": primClassroom, "Secundaria": secClassroom };
});
exports.getVacanciesByCollegue = getVacanciesByCollegue;
const addVacancies = (grade, collegue, cant) => __awaiter(void 0, void 0, void 0, function* () {
    return "Addign Vacancies";
});
exports.addVacancies = addVacancies;
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