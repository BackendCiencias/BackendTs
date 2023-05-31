"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
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
    phone: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    roles: [{ ref: "Role", type: mongoose_1.Schema.Types.ObjectId }],
}, {
    timestamps: true,
    versionKey: false,
});
exports.default = (0, mongoose_1.model)("User", userSchema);
//# sourceMappingURL=person.model.js.map