import { Schema, model, Types, Document } from "mongoose";
export interface ITickedC extends Document {
    date: string;
    amount: number;
    student: [Types.ObjectId];
    category: [Types.ObjectId];
}

const tickedCSchema = new Schema({
    date: { type: Date, required: true },
    amount: { type: Number, required: true },
    student: { ref: "Student", type: Schema.Types.ObjectId },
    category: { ref: "Category", type: Schema.Types.ObjectId },
  },{
    versionKey: false,
  }
);

export default model<ITickedC>("TickedC", tickedCSchema);
