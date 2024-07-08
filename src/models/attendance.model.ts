import { Schema, model, Types, Document} from "mongoose";

export interface IAttendance extends Document {
    code: string,
    student: Types.ObjectId[],
    date: Date,
    state: 'P' | 'T' | 'F' | 'X' | 'J',
}

// P: Presente -> Hora
// T: Tarde -> Hora
// F: Falta -> --:-- AM
// X: ???
// J: Justificado -> Hora

const attendanceSchema = new Schema({
  code: { type: String, required: true },
  student: { ref: "Student", type: Schema.Types.ObjectId },
  date: { type: Date },
  state: { type: String, default: 'F', required: true},
},
{
  timestamps: true,
  versionKey: false,
});
  
  export default model<IAttendance>("Attendance", attendanceSchema);