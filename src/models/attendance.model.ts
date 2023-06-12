import { Schema, model, Types, Document} from "mongoose";

export interface IAttendance extends Document {
    code: string,
    description: string,
    type: 'N' | 'E',
    timeLimit: Date;
}
// const tl = new Date();
// tl.setTime()
const attendanceSchema = new Schema({
  code: { type: String, required: true },
  description: { type: String},
  type: { type: String, default: 'N',required: true},
  timeLimit: { type: Date, default: new Date().setHours(8,0,0), required: true}
},
{
  timestamps: true,
  versionKey: false,
});
  
  export default model<IAttendance>("Attendance", attendanceSchema);