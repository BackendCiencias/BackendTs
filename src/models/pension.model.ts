import { Schema, model, Types, Document } from "mongoose";

export interface  IPensionMes {
    payed: number;
    total: number;
    id_ticked: Types.ObjectId[];
}


export interface IPension extends Document {
    year: number;
    student: Types.ObjectId;
    march: IPensionMes;
    april: IPensionMes;
    may: IPensionMes;
    june: IPensionMes;
    july: IPensionMes;
    august: IPensionMes;
    september: IPensionMes;
    october: IPensionMes;
    november: IPensionMes;
    december: IPensionMes;
}

const pensionSchema = new Schema({
    year: {type: Number, required: true, default: new Date().getFullYear()},
    student: { ref: "Student", type: Schema.Types.ObjectId },
    march: {
        payed: {type: Number},
        total: {type: Number, required: true},
        id_ticked: [{ref: "Ticked", type: Schema.Types.ObjectId }]
    },
    april: {
        payed: {type: Number},
        total: {type: Number, required: true},
        id_ticked: [{ref: "Ticked", type: Schema.Types.ObjectId }]
    },
    may: {
        payed: {type: Number},
        total: {type: Number, required: true},
        id_ticked: [{ref: "Ticked", type: Schema.Types.ObjectId }]
    },
    june: {
        payed: {type: Number},
        total: {type: Number, required: true},
        id_ticked: [{ref: "Ticked", type: Schema.Types.ObjectId }]
    },
    july: {
        payed: {type: Number},
        total: {type: Number, required: true},
        id_ticked: [{ref: "Ticked", type: Schema.Types.ObjectId }]
    },
    august: {
        payed: {type: Number},
        total: {type: Number, required: true},
        id_ticked: [{ref: "Ticked", type: Schema.Types.ObjectId }]
    },
    september: {
        payed: {type: Number},
        total: {type: Number, required: true},
        id_ticked: [{ref: "Ticked", type: Schema.Types.ObjectId }]
    },
    october: {
        payed: {type: Number},
        total: {type: Number, required: true},
        id_ticked: [{ref: "Ticked", type: Schema.Types.ObjectId }]
    },
    november: {
        payed: {type: Number},
        total: {type: Number, required: true},
        id_ticked: [{ref: "Ticked", type: Schema.Types.ObjectId }]
    },
    december: {
        payed: {type: Number},
        total: {type: Number, required: true},
        id_ticked: [{ref: "Ticked", type: Schema.Types.ObjectId }]
    }

});

export default model<IPension>("Pension", pensionSchema);
