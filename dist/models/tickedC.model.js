"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const tickedCSchema = new mongoose_1.Schema({
    date: { type: Date, required: true },
    amount: { type: Number, required: true },
    student: { ref: "Student", type: mongoose_1.Schema.Types.ObjectId },
    category: { ref: "Category", type: mongoose_1.Schema.Types.ObjectId },
}, {
    versionKey: false,
});
exports.default = (0, mongoose_1.model)("TickedC", tickedCSchema);
//# sourceMappingURL=tickedC.model.js.map