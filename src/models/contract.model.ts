import { Schema, model, Types, Document } from "mongoose";

export interface IContract extends Document {
  year: number;
  tutors: Types.ObjectId[];
  students: Types.ObjectId[];
}

const contractSchema = new Schema({
  year: {type: Number, required: true, default: new Date().getFullYear()},
  tutors: [{ref: "Tutor", type: Schema.Types.ObjectId }],
  students: [{ref: "Student", type: Schema.Types.ObjectId }]
});

export default model<IContract>("Contract", contractSchema);