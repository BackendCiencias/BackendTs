import { Schema, model, Types } from "mongoose";

const PensionSchema = new Schema({
    year: {type: Number, required: true},
    march: {
        payed: {type: Number},
        total: {type: Number, required: true},
        id_ticked: [{ref: "Ticked", type: Schema.Types.ObjectID }]
    },
    april: {
        payed: {type: Number},
        total: {type: Number, required: true},
        id_ticked: [{ref: "Ticked", type: Schema.Types.ObjectID }]
    },
    may: {
        payed: {type: Number},
        total: {type: Number, required: true},
        id_ticked: [{ref: "Ticked", type: Schema.Types.ObjectID }]
    },
    june: {
        payed: {type: Number},
        total: {type: Number, required: true},
        id_ticked: [{ref: "Ticked", type: Schema.Types.ObjectID }]
    },
    july: {
        payed: {type: Number},
        total: {type: Number, required: true},
        id_ticked: [{ref: "Ticked", type: Schema.Types.ObjectID }]
    },
    august: {
        payed: {type: Number},
        total: {type: Number, required: true},
        id_ticked: [{ref: "Ticked", type: Schema.Types.ObjectID }]
    },
    september: {
        payed: {type: Number},
        total: {type: Number, required: true},
        id_ticked: [{ref: "Ticked", type: Schema.Types.ObjectID }]
    },
    october: {
        payed: {type: Number},
        total: {type: Number, required: true},
        id_ticked: [{ref: "Ticked", type: Schema.Types.ObjectID }]
    },
    november: {
        payed: {type: Number},
        total: {type: Number, required: true},
        id_ticked: [{ref: "Ticked", type: Schema.Types.ObjectID }]
    },
    december: {
        payed: {type: Number},
        total: {type: Number, required: true},
        id_ticked: [{ref: "Ticked", type: Schema.Types.ObjectID }]
    }

});
