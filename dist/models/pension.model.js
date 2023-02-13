"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const pensionSchema = new mongoose_1.Schema({
    year: { type: Number, required: true },
    student: [{ ref: "Student", type: mongoose_1.Schema.Types.ObjectId }],
    march: {
        payed: { type: Number },
        total: { type: Number, required: true },
        id_ticked: [{ ref: "Ticked", type: mongoose_1.Schema.Types.ObjectId }]
    },
    april: {
        payed: { type: Number },
        total: { type: Number, required: true },
        id_ticked: [{ ref: "Ticked", type: mongoose_1.Schema.Types.ObjectId }]
    },
    may: {
        payed: { type: Number },
        total: { type: Number, required: true },
        id_ticked: [{ ref: "Ticked", type: mongoose_1.Schema.Types.ObjectId }]
    },
    june: {
        payed: { type: Number },
        total: { type: Number, required: true },
        id_ticked: [{ ref: "Ticked", type: mongoose_1.Schema.Types.ObjectId }]
    },
    july: {
        payed: { type: Number },
        total: { type: Number, required: true },
        id_ticked: [{ ref: "Ticked", type: mongoose_1.Schema.Types.ObjectId }]
    },
    august: {
        payed: { type: Number },
        total: { type: Number, required: true },
        id_ticked: [{ ref: "Ticked", type: mongoose_1.Schema.Types.ObjectId }]
    },
    september: {
        payed: { type: Number },
        total: { type: Number, required: true },
        id_ticked: [{ ref: "Ticked", type: mongoose_1.Schema.Types.ObjectId }]
    },
    october: {
        payed: { type: Number },
        total: { type: Number, required: true },
        id_ticked: [{ ref: "Ticked", type: mongoose_1.Schema.Types.ObjectId }]
    },
    november: {
        payed: { type: Number },
        total: { type: Number, required: true },
        id_ticked: [{ ref: "Ticked", type: mongoose_1.Schema.Types.ObjectId }]
    },
    december: {
        payed: { type: Number },
        total: { type: Number, required: true },
        id_ticked: [{ ref: "Ticked", type: mongoose_1.Schema.Types.ObjectId }]
    }
});
exports.default = (0, mongoose_1.model)("Pension", pensionSchema);
//# sourceMappingURL=pension.model.js.map