import { Schema, model, Types, Document} from "mongoose";

export interface IAttendance extends Document {
    code: string,
    student: Types.ObjectId[],
    date: Date,
    state: 'P' | 'T' | 'F' | 'X' | 'J',
}

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