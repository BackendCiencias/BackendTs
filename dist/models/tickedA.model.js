"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const tickedASchema = new mongoose_1.Schema({
    date: { type: Date, required: true },
    amount: { type: Number, required: true },
    teacher: { ref: "Teacher", type: mongoose_1.Schema.Types.ObjectId },
    subtickeds: { ref: "TickedB", type: mongoose_1.Schema.Types.ObjectId },
}, {
    versionKey: false,
});
exports.default = (0, mongoose_1.model)("TickedA", tickedASchema);
//# sourceMappingURL=tickedA.model.js.map