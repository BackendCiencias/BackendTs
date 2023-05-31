"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const tickedBSchema = new mongoose_1.Schema({
    tickedParent: { ref: "TickedA", type: mongoose_1.Schema.Types.ObjectId },
    amount: { type: Number, required: true },
}, {
    versionKey: false,
});
exports.default = (0, mongoose_1.model)("TickedB", tickedBSchema);
//# sourceMappingURL=tickedB.model.js.map