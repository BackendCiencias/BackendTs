"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// const tl = new Date();
// tl.setTime()
const attendanceSchema = new mongoose_1.Schema({
    code: { type: String, required: true },
    description: { type: String },
    type: { type: String, default: 'N', required: true },
    timeLimit: { type: Date, default: new Date().setHours(8, 0, 0), required: true }
}, {
    timestamps: true,
    versionKey: false,
});
exports.default = (0, mongoose_1.model)("Attendance", attendanceSchema);
//# sourceMappingURL=attendance.model.js.map