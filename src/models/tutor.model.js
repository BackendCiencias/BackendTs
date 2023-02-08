import { Schema, model } from "mongoose";

const TutorSchema = new Schema({
  names: {
    name1: { type: String, required: true},
    name2: { type: String },
    surname1: { type: String, required: true },
    surname2: { type: String, required: true }
  },
  genre: {type: CharacterData, required: true},
  dni: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: Number, required: true },
  children: [{ref: "Student", type: Schema.Types.ObjectID }],
  relationship: {type: String, required: true}
});
