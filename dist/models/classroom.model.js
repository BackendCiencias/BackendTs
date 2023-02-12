"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const classroomSchema = new mongoose_1.Schema({
    grade: { type: String, required: true },
    collegue: { type: String, required: true },
    capacity: { type: Number, required: true },
    students: [{ ref: "Student", type: mongoose_1.Schema.Types.ObjectId }]
}, {
    timestamps: true,
    versionKey: false,
});
exports.default = (0, mongoose_1.model)("Classroom", classroomSchema);
//# sourceMappingURL=classroom.model.js.map