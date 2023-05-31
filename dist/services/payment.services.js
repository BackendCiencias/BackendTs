"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.modifyPayment = exports.registerPayment = void 0;
const payment_model_1 = __importDefault(require("./../models/payment.model"));
const teacher_model_1 = __importDefault(require("./../models/teacher.model"));
const registerPayment = (paymentArr, teacherId) => __awaiter(void 0, void 0, void 0, function* () {
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
    };
    const paymentCreated = yield payment_model_1.default.create(modifiedData);
    paymentCreated.teacher = teacherId;
    yield paymentCreated.save();
    const teacherTarget = yield teacher_model_1.default.findById(teacherId);
    if (!teacherTarget)
        return "ERROR_FINDING_TEACHER";
    teacherTarget.payment.push(paymentCreated._id);
    yield teacherTarget.save();
    return { message: "SUCCESS_PAYMENT_TEACHER" };
});
exports.registerPayment = registerPayment;
const modifyPayment = (paymentArr, teacherId) => __awaiter(void 0, void 0, void 0, function* () {
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
    };
    const paymentCreated = yield payment_model_1.default.create(modifiedData);
    paymentCreated.teacher = teacherId;
    yield paymentCreated.save();
    const teacherTarget = yield teacher_model_1.default.findById(teacherId);
    if (!teacherTarget)
        return "ERROR_FINDING_TEACHER";
    teacherTarget.payment.push(paymentCreated._id);
    yield teacherTarget.save();
    return { message: "SUCCESS_PAYMENT_TEACHER" };
});
exports.modifyPayment = modifyPayment;
//# sourceMappingURL=payment.services.js.map