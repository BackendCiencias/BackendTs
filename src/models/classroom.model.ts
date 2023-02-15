import { Schema, model, Types, Document} from "mongoose";

export interface IClassroom extends Document {
    grade: string,
    collegue: string,
    capacity: number,
    students: Types.ObjectId[];
}
  const classroomSchema = new Schema({
    grade: { type: String, required: true },
    collegue: { type: String, required: true },
    capacity: { type: Number, required: true},
    students:  [{ref: "Student", type: Schema.Types.ObjectId }]
  },
  {
    timestamps: true,
    versionKey: false,
  });
  
  export default model<IClassroom>("Classroom", classroomSchema);