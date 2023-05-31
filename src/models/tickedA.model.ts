import { ITickedB } from './tickedB.model';
import { Schema, model, Types, Document } from "mongoose";
export interface ITickedA extends Document {
    date: string;
    amount: number;
    teacher: [Types.ObjectId];
    subtickeds: [Types.ObjectId];
}

const tickedASchema = new Schema({
    date: { type: Date, required: true },
    amount: { type: Number, required: true },
    teacher: { ref: "Teacher", type: Schema.Types.ObjectId },
    subtickeds: { ref: "TickedB", type: Schema.Types.ObjectId },
  },{
    versionKey: false,
  }
);

export default model<ITickedA>("TickedA", tickedASchema);
