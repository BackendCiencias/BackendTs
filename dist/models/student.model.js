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
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const studentSchema = new mongoose_1.Schema({
    names: {
        name1: { type: String, required: true },
        name2: { type: String, default: "" },
        surname1: { type: String, required: true },
        surname2: { type: String, required: true },
    },
    image: { url: String, public_id: String },
    genre: { type: String, required: false },
    dni: { type: String, required: true, unique: true },
    nationality: { type: String, default: "PER", required: false },
    address: { type: String, required: false },
    birth: { type: Date, required: false },
    origin: { type: String, required: false },
    phone: { type: Number, required: false },
    nivel: { type: String, required: false },
    // nivel: { type: String, required: false },
    grade: { type: String, required: true },
    collegue: { type: String, required: false },
    section: { type: String, default: "A" },
    bankcode: { type: String, required: false },
    email: { type: String, required: false },
    password: { type: String, required: false },
    pension: [{ ref: "Pension", type: mongoose_1.Schema.Types.ObjectId }],
    attendanceNormal: [{
            idAtt: { ref: "Attendance", type: mongoose_1.Schema.Types.ObjectId },
            code: { type: String, require: true },
            timeAtt: { type: Date, default: new Date().setHours(0, 0, 0, 0), require: true },
            state: { type: String, default: 'C', require: true }
            // A: temprano, B: tarde, C: falta
        }],
    attendanceSpecial: [{
            idAtt: { ref: "Attendance", type: mongoose_1.Schema.Types.ObjectId },
            code: { type: String, require: true },
            timeAtt: { type: Date, default: new Date().setHours(0, 0, 0, 0), require: true },
            state: { type: String, default: 'C', require: true }
            // A: temprano, B: tarde, C: falta
        }],
    tutor: [{ ref: "Tutor", type: mongoose_1.Schema.Types.ObjectId }],
    contracts: [{ ref: "Contracts", type: mongoose_1.Schema.Types.ObjectId }],
    roles: [{ ref: "Role", type: mongoose_1.Schema.Types.ObjectId }],
}, {
    timestamps: true,
    versionKey: false,
});
studentSchema.methods.encryptPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcryptjs_1.default.genSalt(10);
    return bcryptjs_1.default.hash(password, salt);
});
studentSchema.methods.validatePassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(password, this.password);
        return yield bcryptjs_1.default.compare(password, this.password);
    });
};
exports.default = (0, mongoose_1.model)("Student", studentSchema);
//# sourceMappingURL=student.model.js.map