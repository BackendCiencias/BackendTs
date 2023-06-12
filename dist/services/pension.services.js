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
exports.payMonthPension = exports.registerPension = void 0;
const pension_model_1 = __importDefault(require("./../models/pension.model"));
const category_model_1 = __importDefault(require("./../models/category.model"));
const student_model_1 = __importDefault(require("./../models/student.model"));
const tickedC_services_1 = require("./tickedC.services");
const findMonth = (arrN, wordX) => {
    // let x = 0;
    // let march;
    // pensionArr.forEach(element => {
    //     if(Object.keys(element).includes("march")){
    //         march = Object.values(element)[0]
    //     }
    // });
    // console.log("1: ",march);
    // march =  findMonth(pensionArr, "march");
    // console.log("2: ",march);
    arrN.forEach(element => {
        if (Object.keys(element).includes(wordX)) {
            return Object.values(element)[0];
        }
    });
    return 176;
};
const registerPension = (pensionArr, studentId) => __awaiter(void 0, void 0, void 0, function* () {
    const modifiedData = {
        admission: {
            payed: 0,
            total: pensionArr.admission,
            id_ticked: []
        },
        tuition: {
            payed: 0,
            total: pensionArr.tuition,
            id_ticked: []
        },
        march: {
            payed: 0,
            total: pensionArr.march,
            id_ticked: []
        },
        april: {
            payed: 0,
            total: pensionArr.april,
            id_ticked: []
        },
        may: {
            payed: 0,
            total: pensionArr.may,
            id_ticked: []
        },
        june: {
            payed: 0,
            total: pensionArr.june,
            id_ticked: []
        },
        july: {
            payed: 0,
            total: pensionArr.july,
            id_ticked: []
        },
        august: {
            payed: 0,
            total: pensionArr.august,
            id_ticked: []
        },
        september: {
            payed: 0,
            total: pensionArr.september,
            id_ticked: []
        },
        october: {
            payed: 0,
            total: pensionArr.october,
            id_ticked: []
        },
        november: {
            payed: 0,
            total: pensionArr.november,
            id_ticked: []
        },
        december: {
            payed: 0,
            total: pensionArr.december,
            id_ticked: []
        }
    };
    const pensionCreated = yield pension_model_1.default.create(modifiedData);
    pensionCreated.student = studentId;
    yield pensionCreated.save();
    const studentTarget = yield student_model_1.default.findById(studentId);
    if (!studentTarget)
        return "ERROR_FINDING_STUDENT";
    studentTarget.pension.push(pensionCreated._id);
    yield studentTarget.save();
    return { message: "SUCCESS_PENSION_STUDENT" };
});
exports.registerPension = registerPension;
// const modifiedData = {
//     year: 2023,
//     march: {
//         payed: 0,
//         total: findMonth(pensionArr, "march"),
//         id_ticked: []
//     },
//     april: {
//         payed: 0,
//         total: findMonth(pensionArr, "april"),
//         id_ticked: []
//     },
//     may: {
//         payed: 0,
//         total: findMonth(pensionArr, "may"),
//         id_ticked: []
//     },
//     june: {
//         payed: 0,
//         total: findMonth(pensionArr, "june"),
//         id_ticked: []
//     },
//     july: {
//         payed: 0,
//         total: findMonth(pensionArr, "july"),
//         id_ticked: []
//     },
//     august: {
//         payed: 0,
//         total: findMonth(pensionArr, "august"),
//         id_ticked: []
//     },
//     september: {
//         payed: 0,
//         total: findMonth(pensionArr, "september"),
//         id_ticked: []
//     },
//     october: {
//         payed: 0,
//         total: findMonth(pensionArr, "october"),
//         id_ticked: []
//     },
//     november: {
//         payed: 0,
//         total: findMonth(pensionArr, "november"),
//         id_ticked: []
//     },
//     december: {
//         payed: 0,
//         total: findMonth(pensionArr, "december"),
//         id_ticked: []
//     }
// }
const payMonthPension = (idStudent, month) => __awaiter(void 0, void 0, void 0, function* () {
    const pension = yield pension_model_1.default.findOne({ student: idStudent });
    if (!pension)
        return "INVALID_ID_STUDENT";
    const cant = pension === null || pension === void 0 ? void 0 : pension[`${month}`].total;
    pension === null || pension === void 0 ? void 0 : pension[`${month}`].payed = cant;
    // console.log(pension?.[`${month}`]);
    const catego = yield category_model_1.default.findOne({ name: "Pension" });
    const idCategory = catego === null || catego === void 0 ? void 0 : catego.id;
    const today = new Date().toDateString();
    const tickedGenerated = yield (0, tickedC_services_1.generateTickedC)({
        date: today,
        amount: cant,
        student: idStudent,
        category: [idCategory]
    });
    // console.log(tickedGenerated)
    pension === null || pension === void 0 ? void 0 : pension[`${month}`].id_ticked = [tickedGenerated.id];
    const modifiedPension = yield pension.save();
    console.log(tickedGenerated);
    return tickedGenerated;
});
exports.payMonthPension = payMonthPension;
//# sourceMappingURL=pension.services.js.map