import { Schema, model, Types, Document } from "mongoose";
import bcrypt from "bcryptjs";
export interface IStudent extends Document {
  names: {
    name1: string;
    name2: string;
    surname1: string;
    surname2: string;
  };
  image: {
    url: string,
    public_id: string
  };
  dni: string;
  genre: "M" | "F";
  nationality: string;
  address: string;
  birth: string;
  phone: number;

  nivel: string;
  grade: string;
  section: string;
  collegue: string;
  origin: string;

  email: string;
  password: string;
  bankcode: string;
  pension: Types.ObjectId[];
  attendanceNormal: any;
  attendanceSpecial: any;
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
      name2: { type: String, default: "" },
      surname1: { type: String, required: true },
      surname2: { type: String, required: true },
    },
    photo: { url: String, public_id: String },

    genre: { type: String, required: false },
    dni: { type: String, required: true, unique: true },
    nationality: { type: String, default: "PER",required: false },
    address: { type: String, required: false },
    birth: { type: Date, required: false },
    origin: { type: String, required: false },
    phone: { type: Number, required: false },
    nivel: { type: String, required: false },
    // nivel: { type: String, required: false },
    grade: { type: String, required: true },
    collegue: { type: String, required: false },
    section: { type: String, default: "A" },
    bankcode: { type: String, required: false},
    email: { type: String, required: false},
    password: { type: String, required: false},
    pension: [{ ref: "Pension", type: Schema.Types.ObjectId }],
    attendanceNormal: [{
      idAtt: { ref: "Attendance", type: Schema.Types.ObjectId }, 
      code: { type: String, require:true}, 
      timeAtt: {type: Date, default: new Date().setHours(0,0,0,0), require: true},
      state: {type: String, default: 'C',require: true} 
      // A: temprano, B: tarde, C: falta
    }],
    attendanceSpecial: [{
      idAtt: { ref: "Attendance", type: Schema.Types.ObjectId }, 
      code: { type: String, require:true}, 
      timeAtt: {type: Date, default: new Date().setHours(0,0,0,0), require: true},
      state: {type: String, default: 'C',require: true} 
      // A: temprano, B: tarde, C: falta
    }],
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