"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ContractSchema = new mongoose_1.Schema({
    tutors: [{ ref: "Tutor", type: mongoose_1.Schema.Types.ObjectID }],
    students: [{ ref: "Student", type: mongoose_1.Schema.Types.ObjectID }],
    pensions: [{ ref: "Pension", type: mongoose_1.Schema.Types.ObjectID }]
});
//# sourceMappingURL=contract.model.js.map