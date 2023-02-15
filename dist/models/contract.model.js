"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const contractSchema = new mongoose_1.Schema({
    year: { type: Number, required: true, default: new Date().getFullYear() },
    tutors: [{ ref: "Tutor", type: mongoose_1.Schema.Types.ObjectId }],
    students: [{ ref: "Student", type: mongoose_1.Schema.Types.ObjectId }]
});
exports.default = (0, mongoose_1.model)("Contract", contractSchema);
//# sourceMappingURL=contract.model.js.map