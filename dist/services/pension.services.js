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
exports.modifyPension = exports.payMonthPension = exports.registerPension = void 0;
const pension_model_1 = __importDefault(require("./../models/pension.model"));
const student_model_1 = __importDefault(require("./../models/student.model"));
const registerPension = (pensionArr, studentId) => __awaiter(void 0, void 0, void 0, function* () {
    const modifiedData = {};
    for (const month in pensionArr) {
        modifiedData[month] = {
            payed: 0,
            total: pensionArr[month],
            id_ticked: []
        };
    }
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
// export const payMonthPension = async (idStudent:string, month:string) => {
//     const pension = await Pension.findOne({ student: idStudent});
//     if (!pension) return "INVALID_ID_STUDENT";
//     const cant = pension?.[`${month}`].total;
//     pension?.[`${month}`].payed = cant;
//     // console.log(pension?.[`${month}`]);
//     const catego = await Category.findOne({name: "Pension"});
//     const idCategory = catego?.id;
//     const today = new Date().toDateString();
//     const tickedGenerated = await generateTickedC(
//         {
//             date: today,
//             amount: cant,
//             student: idStudent, 
//             category: [idCategory]
//         }
//     )
//     // console.log(tickedGenerated)
//     pension?.[`${month}`].id_ticked = [tickedGenerated.id];
//     const modifiedPension = await pension.save();
//     console.log(tickedGenerated);
//     return tickedGenerated;
// };
const payMonthPension = (idStudent, month) => __awaiter(void 0, void 0, void 0, function* () {
    return "Inactive";
});
exports.payMonthPension = payMonthPension;
const modifyPension = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Modify Pension Alive");
});
exports.modifyPension = modifyPension;
//# sourceMappingURL=pension.services.js.map