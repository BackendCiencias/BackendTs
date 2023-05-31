import { Schema, model, Types, Document } from "mongoose";
interface IPaymentMes {
    payed: number;
    total: number;
    subtickeds: Types.ObjectId[];
}

export interface IPayment extends Document {
    year: number;
    teacher: Types.ObjectId;
    generalTickeds: Types.ObjectId[];
    march: IPaymentMes;
    april: IPaymentMes;
    may: IPaymentMes;
    june: IPaymentMes;
    july: IPaymentMes;
    august: IPaymentMes;
    september: IPaymentMes;
    october: IPaymentMes;
    november: IPaymentMes;
    december: IPaymentMes;
}

const paymentSchema = new Schema({
    year: {type: Number, required: true, default: new Date().getFullYear()},
    teacher: { ref: "Teacher", type: Schema.Types.ObjectId},
    generalTickeds : [{ ref: "TickedA", type: Schema.Types.ObjectId }],
    march: {
        payed: {type: Number},
        total: {type: Number, required: true},
        subtickeds: [{ref: "TickedB", type: Schema.Types.ObjectId }]
    },
    april: {
        payed: {type: Number},
        total: {type: Number, required: true},
        subtickeds: [{ref: "TickedB", type: Schema.Types.ObjectId }]
    },
    may: {
        payed: {type: Number},
        total: {type: Number, required: true},
        subtickeds: [{ref: "TickedB", type: Schema.Types.ObjectId }]
    },
    june: {
        payed: {type: Number},
        total: {type: Number, required: true},
        subtickeds: [{ref: "TickedB", type: Schema.Types.ObjectId }]
    },
    july: {
        payed: {type: Number},
        total: {type: Number, required: true},
        subtickeds: [{ref: "TickedB", type: Schema.Types.ObjectId }]
    },
    august: {
        payed: {type: Number},
        total: {type: Number, required: true},
        subtickeds: [{ref: "TickedB", type: Schema.Types.ObjectId }]
    },
    september: {
        payed: {type: Number},
        total: {type: Number, required: true},
        subtickeds: [{ref: "TickedB", type: Schema.Types.ObjectId }]
    },
    october: {
        payed: {type: Number},
        total: {type: Number, required: true},
        subtickeds: [{ref: "TickedB", type: Schema.Types.ObjectId }]
    },
    november: {
        payed: {type: Number},
        total: {type: Number, required: true},
        subtickeds: [{ref: "TickedB", type: Schema.Types.ObjectId }]
    },
    december: {
        payed: {type: Number},
        total: {type: Number, required: true},
        subtickeds: [{ref: "TickedB", type: Schema.Types.ObjectId }]
    }

});

export default model<IPayment>("Payment", paymentSchema);
