"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const attendanceSchema = new mongoose_1.Schema({
    code: { type: String, required: true },
    student: { ref: "Student", type: mongoose_1.Schema.Types.ObjectId },
    date: { type: Date },
    state: { type: String, default: 'F', required: true },
}, {
    timestamps: true,
    versionKey: false,
});
exports.default = (0, mongoose_1.model)("Attendance", attendanceSchema);
//# sourceMappingURL=attendance.model.js.map