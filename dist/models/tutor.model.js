"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const tutorSchema = new mongoose_1.Schema({
    names: {
        name1: { type: String, required: true },
        name2: { type: String },
        surname1: { type: String, required: true },
        surname2: { type: String, required: true }
    },
    genre: { type: String, required: true },
    dni: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    phone: { type: Number, required: true },
    relationship: { type: String, required: true },
    students: [{ ref: "Student", type: mongoose_1.Schema.Types.ObjectId }]
}, {
    timestamps: true,
    versionKey: false,
});
exports.default = (0, mongoose_1.model)("Tutor", tutorSchema);
//# sourceMappingURL=tutor.model.js.map