import { Schema, model, Types, Document} from "mongoose";
export interface IStudent extends Document {
  names: { name1: string; name2: string; surname1: string; surname2: string };
  genre: string;
  dni: string;
  nationality: string;
  address: string;
  birth: string;
  phone: number;
  origin: string;
  grade: string;
  collegue: string;
  section: string;
  email: string;
  password: string;
  pension: [ Types.ObjectId];
  tutor: [ Types.ObjectId];
  contracts: [ Types.ObjectId];
}
const studentSchema = new Schema({
  names: {
    name1: { type: String, required: true},
    name2: { type: String },
    surname1: { type: String, required: true },
    surname2: { type: String, required: true }
  },
  genre: {type: CharacterData, required: true},
  dni: { type: String, required: true, unique: true },
  nationality: { type: String, required: true },
  address: { type: String, required: true },
  birth: { type: Date, required: true },
  origin: { type: String, required: true },
  phone: { type: Number, required: true },
  grade: { type: String, required: true },
  collegue: { type: String, required: true },
  section: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true, select: false },
  pension: [{ref: "Pension", type: Schema.Types.ObjectId }],
  tutor: [{ref: "Tutor", type: Schema.Types.ObjectId }],
  contracts: [{ref: "Contracts", type: Schema.Types.ObjectId }]
});

export default model<IStudent>("Student", studentSchema);