import { Schema, model, Types, Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface IAssistant extends Document {
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
  encryptPassword(password: string): Promise<string>;
  validatePassword(password: string): Promise<boolean>;
}

const assistantSchema = new Schema(
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
    password: { type: String, required: true},
    payment: [{ ref: "Payment", type: Schema.Types.ObjectId }],
    roles: [{ ref: "Role", type: Schema.Types.ObjectId }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
assistantSchema.methods.encryptPassword = async (
    password: string
  ): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  };
  
  assistantSchema.methods.validatePassword = async function (
    password: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  };
  
export default model<IAssistant>("Assistant", assistantSchema);