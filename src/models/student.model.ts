import { Schema, model, Types, Document } from "mongoose";
import bcrypt from "bcryptjs";
export interface IStudent extends Document {
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
  origin: string;
  grade: string;
  collegue: string;
  section: string;
  email: string;
  password: string;
  pension: Types.ObjectId[];
  tutor:  Types.ObjectId[];
  contracts:  Types.ObjectId[];
  roles:  Types.ObjectId[];
  encryptPassword(password: string): Promise<string>;
  validatePassword(password: string): Promise<boolean>;
}
const studentSchema = new Schema(
  {
    names: {
      name1: { type: String, required: true },
      name2: { type: String },
      surname1: { type: String, required: true },
      surname2: { type: String, required: true },
    },
    genre: { type: String, required: false },
    dni: { type: String, required: true, unique: true },
    nationality: { type: String, required: false },
    address: { type: String, required: false },
    birth: { type: Date, required: false },
    origin: { type: String, required: false },
    phone: { type: Number, required: false },
    grade: { type: String, required: true },
    collegue: { type: String, required: true },
    section: { type: String, default: "A" },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true},
    pension: [{ ref: "Pension", type: Schema.Types.ObjectId }],
    tutor: [{ ref: "Tutor", type: Schema.Types.ObjectId }],
    contracts: [{ ref: "Contracts", type: Schema.Types.ObjectId }],
    roles: [{ ref: "Role", type: Schema.Types.ObjectId }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
studentSchema.methods.encryptPassword = async (
  password: string
): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

studentSchema.methods.validatePassword = async function (
  password: string
): Promise<boolean> {
  console.log(password, this.password)
  return await bcrypt.compare(password, this.password);
};
export default model<IStudent>("Student", studentSchema);