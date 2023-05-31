import { Schema, model, Types, Document } from "mongoose";
import bcrypt from "bcryptjs";
export interface ISecretary extends Document {
  _id: Types.ObjectId;
  names: { name1: string; name2: string; surname1: string; surname2: string };
  genre: string;
  dni: string;
  nationality: string;
  address: string;
  birth: string;
  phone: number;
  email: string;
  password: string;
  roles:  Types.ObjectId[];
  encryptPassword(password: string): Promise<string>;
  validatePassword(password: string): Promise<boolean>;
}

const secretarySchema = new Schema(
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
    birth: { type: Date },
    phone: { type: Number, required: true },
    email: { type: String, unique: true, required: true, lowercase: true },
    password: { type: String, required: true },
    roles: [{ ref: "Role", type: Schema.Types.ObjectId }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

secretarySchema.methods.encryptPassword = async (
  password: string
): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

secretarySchema.methods.validatePassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

export default model<ISecretary>("Secretary", secretarySchema);
