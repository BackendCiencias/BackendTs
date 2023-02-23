import { Schema, model } from "mongoose";

const TickedSchema = new Schema({
    id: {type: Number, required : true},
    date: {type: Date, required : true},
    school: {type: String, required: true},
    student: {ref: "Student", type: Schema.Types.ObjectID },
    amount: {type: Number, required: true},
    reason: {type: String, required: true}
});