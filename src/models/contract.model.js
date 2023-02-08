import { Schema, model } from "mongoose";

const ContractSchema = new Schema({
  tutors: [{ref: "Tutor", type: Schema.Types.ObjectID }],
  students: [{ref: "Student", type: Schema.Types.ObjectID }],
  pensions: [{ref: "Pension", type: Schema.Types.ObjectID }]
});
