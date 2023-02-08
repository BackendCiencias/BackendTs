"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const secretarySchema = new mongoose_1.Schema({
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
    birth: { type: Date },
    phone: { type: Number, required: true },
    email: { type: String, unique: true, required: true, lowercase: true },
    password: { type: String, required: true },
});
exports.default = (0, mongoose_1.model)("Secretary", secretarySchema);
//# sourceMappingURL=secretary.js.map