import { Schema, model, Types, Document } from "mongoose";


export interface ITeacher extends Document {
  names: {
    name1: string;
    name2: string;
    surname1: string;
    surname2: string;
  };
  genre: "M" | "F";
  dni: string;
  nationality: string;
  address: string;
  birth: string;
  phone: number;
  email: string;
  password: string;
  payment: Types.ObjectId[];
  roles:  Types.ObjectId[];
}

const teacherSchema = new Schema(
  {
    names: {
      name1: { type: String, required: true },
      name2: { type: String },
      surname1: { type: String, required: true },
      surname2: { type: String, required: true },
    },
    genre: { type: String, required: true },
    dni: { type: String, required: true, unique: true },
    nationality: { type: String, required: true },
    address: { type: String, required: true },
    birth: { type: Date, required: true },
    phone: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    payment: [{ ref: "Payment", type: Schema.Types.ObjectId }],
    roles: [{ ref: "Role", type: Schema.Types.ObjectId }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model<ITeacher>("Teacher", teacherSchema);