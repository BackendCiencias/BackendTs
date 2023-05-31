import { Schema, model, Types, Document } from "mongoose";

export interface ITickedB extends Document {
    tickedParent: [Types.ObjectId];
    amount: number;
}

const tickedBSchema = new Schema({
    tickedParent: { ref: "TickedA", type: Schema.Types.ObjectId },
    amount: { type: Number, required: true },
  },{
    versionKey: false,
  }
);

export default model<ITickedB>("TickedB", tickedBSchema);
