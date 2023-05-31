import { Types } from 'mongoose';
import Payment, { IPayment } from './../models/payment.model';
import Teacher from './../models/teacher.model';

export const registerPayment = async(paymentArr:any, teacherId:Types.ObjectId) => {
    const modifiedData= {
        generalTickeds: [],
        march: {
            payed: 0,
            total: paymentArr.march,
            subtickeds: []
        },
        april: {
            payed: 0,
            total: paymentArr.april,
            subtickeds: []
        },
        may: {
            payed: 0,
            total: paymentArr.may,
            subtickeds: []
        },
        june: {
            payed: 0,
            total: paymentArr.june,
            subtickeds: []
        },
        july: {
            payed: 0,
            total: paymentArr.july,
            subtickeds: []
        },
        august: {
            payed: 0,
            total: paymentArr.august,
            subtickeds: []
        },
        september: {
            payed: 0,
            total: paymentArr.september,
            subtickeds: []
        },
        october: {
            payed: 0,
            total: paymentArr.october,
            subtickeds: []
        },
        november: {
            payed: 0,
            total: paymentArr.november,
            subtickeds: []
        },
        december: {
            payed: 0,
            total: paymentArr.december,
            subtickeds: []
        }
    }
    const paymentCreated = await Payment.create(modifiedData);
    paymentCreated.teacher = teacherId;
    await paymentCreated.save();

    const teacherTarget = await Teacher.findById(teacherId);
    if(!teacherTarget) return "ERROR_FINDING_TEACHER";
    teacherTarget.payment.push(paymentCreated._id);
    await teacherTarget.save();

    return {message: "SUCCESS_PAYMENT_TEACHER"}
}

export const modifyPayment = async(paymentArr:any, teacherId:Types.ObjectId) => {

    const modifiedData = {
        generalTickeds: [],
        march: {
            payed: 0,
            total: paymentArr.march,
            subtickeds: []
        },
        april: {
            payed: 0,
            total: paymentArr.april,
            subtickeds: []
        },
        may: {
            payed: 0,
            total: paymentArr.may,
            subtickeds: []
        },
        june: {
            payed: 0,
            total: paymentArr.june,
            subtickeds: []
        },
        july: {
            payed: 0,
            total: paymentArr.july,
            subtickeds: []
        },
        august: {
            payed: 0,
            total: paymentArr.august,
            subtickeds: []
        },
        september: {
            payed: 0,
            total: paymentArr.september,
            subtickeds: []
        },
        october: {
            payed: 0,
            total: paymentArr.october,
            subtickeds: []
        },
        november: {
            payed: 0,
            total: paymentArr.november,
            subtickeds: []
        },
        december: {
            payed: 0,
            total: paymentArr.december,
            subtickeds: []
        }
    }
    const paymentCreated = await Payment.create(modifiedData);
    paymentCreated.teacher = teacherId;
    await paymentCreated.save();

    const teacherTarget = await Teacher.findById(teacherId);
    if(!teacherTarget) return "ERROR_FINDING_TEACHER";
    teacherTarget.payment.push(paymentCreated._id);
    await teacherTarget.save();

    return {message: "SUCCESS_PAYMENT_TEACHER"}
}