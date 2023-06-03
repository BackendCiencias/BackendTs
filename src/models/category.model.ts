import { Schema, model, Document} from "mongoose";

export interface ICategory extends Document {
  name: string;
}
  const categorySchema = new Schema({
    name: { type: String, required: true, unique: true},
  },
  {
    timestamps: true,
    versionKey: false,
  });
  
  export default model<ICategory>("Category", categorySchema);