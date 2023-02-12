import { Schema, model, Types, Document} from "mongoose";
export interface ITutor extends Document{
  names: {
    name1: string;
    name2: string;
    surname1: string;
    surname2: string;
  }
  genre: "M" | "F";
  dni: string;
  address: string;
  phone: number;
  relationship: string;
  students: [Types.ObjectId];
}
const tutorSchema = new Schema({
  names: {
    name1: { type: String, required: true},
    name2: { type: String },
    surname1: { type: String, required: true },
    surname2: { type: String, required: true }
  },
  genre: {type: String, required: true},
  dni: { type: String, required: true, unique:true },
  address: { type: String, required: true },
  phone: { type: Number, required: true },
  relationship: {type: String, required: true},
  students: [{ref: "Student", type: Schema.Types.ObjectId }]
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model<ITutor>("Tutor", tutorSchema);