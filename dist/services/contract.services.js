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
exports.registerContract = void 0;
const student_model_1 = __importDefault(require("./../models/student.model"));
const tutor_model_1 = __importDefault(require("./../models/tutor.model"));
const contract_model_1 = __importDefault(require("./../models/contract.model"));
const registerContract = (tutorsDNI, studentsDNI) => __awaiter(void 0, void 0, void 0, function* () {
    if (!tutorsDNI || tutorsDNI.length == 0)
        return "TUTORS_DNI_IS_EMPTY";
    if (!studentsDNI || studentsDNI.length == 0)
        return "STUDENTS_DNI_IS_EMPTY";
    const tutorsId = [];
    const tutorsPopulate = [];
    for (const dni of tutorsDNI) {
        const tutorTarget = yield tutor_model_1.default.findOne({ "dni": dni });
        if (!tutorTarget)
            return { message: `Tutor with DNI: ${dni} not founded` };
        // console.log( dni, tutorTarget);
        tutorsId.push(tutorTarget._id);
        tutorsPopulate.push(tutorTarget);
    }
    const studentsId = [];
    const studentsPopulate = [];
    for (const dni of studentsDNI) {
        const studentTarget = yield student_model_1.default.findOne({ "dni": dni });
        if (!studentTarget)
            return { message: `Student with DNI: ${dni} not founded` };
        // console.log( dni, studentTarget);
        studentsId.push(studentTarget._id);
        studentsPopulate.push(studentTarget);
    }
    for (const studentAct of studentsPopulate) {
        const actTutors = studentAct.tutor;
        const mergedTutors = [...tutorsId, ...actTutors];
        const reducedTutors = mergedTutors.reduce((acc, item) => {
            if (!acc.includes(item))
                acc.push(item);
            return acc;
        }, []);
        studentAct.tutor = reducedTutors;
        yield studentAct.save();
        console.log("Saved: ", studentAct.dni);
    }
    for (const tutorAct of tutorsPopulate) {
        const actStudents = tutorAct.students;
        const mergedStudents = [...studentsId, ...actStudents];
        const reducedStudents = mergedStudents.reduce((acc, item) => {
            // console.log(item);
            if (!acc.includes(item))
                acc.push(item);
            return acc;
        }, []);
        // console.log(tutorAct.dni, ":", reducedStudents);
        tutorAct.students = reducedStudents;
        yield tutorAct.save();
        console.log("Saved: ", tutorAct.dni);
    }
    const modifiedData = {
        students: studentsId,
        tutors: tutorsId
    };
    const createdContract = yield contract_model_1.default.create(modifiedData);
    console.log(createdContract);
    return { createdContract };
});
exports.registerContract = registerContract;
//# sourceMappingURL=contract.services.js.map