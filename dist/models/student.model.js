"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const studentSchema = new mongoose_1.Schema({
    names: {
        name1: { type: String, required: true },
        name2: { type: String },
        surname1: { type: String, required: true },
        surname2: { type: String, required: true },
    },
    genre: { type: String, required: true },
    dni: { type: String, required: true, unique: true },
    nationality: { type: String, required: true },
    address: { type: String, required: true },
    birth: { type: Date, required: true },
    origin: { type: String, required: true },
    phone: { type: Number, required: true },
    grade: { type: String, required: true },
    collegue: { type: String, required: true },
    section: { type: String, default: "A" },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    pension: [{ ref: "Pension", type: mongoose_1.Schema.Types.ObjectId }],
    tutor: [{ ref: "Tutor", type: mongoose_1.Schema.Types.ObjectId }],
    contracts: [{ ref: "Contracts", type: mongoose_1.Schema.Types.ObjectId }],
    roles: [{ ref: "Role", type: mongoose_1.Schema.Types.ObjectId }],
}, {
    timestamps: true,
    versionKey: false,
});
exports.default = (0, mongoose_1.model)("Student", studentSchema);
//# sourceMappingURL=student.model.js.map