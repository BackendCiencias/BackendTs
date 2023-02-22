import { Types } from 'mongoose';
import Pension, { IPension } from './../models/pension.model';
import Student from './../models/student.model';


const findMonth = (arrN:any[], wordX:string) => {
    // let x = 0;
    // let march;
    // pensionArr.forEach(element => {
    //     if(Object.keys(element).includes("march")){
    //         march = Object.values(element)[0]
    //     }
    // });
    // console.log("1: ",march);
    // march =  findMonth(pensionArr, "march");
    // console.log("2: ",march);
    arrN.forEach(element => {
        if(Object.keys(element).includes(wordX)){
            return Object.values(element)[0]
        }
    });
    return 176
}

export const registerPension = async(pensionArr:any, studentId:Types.ObjectId) => {

    const modifiedData = {
        march: {
            payed: 0,
            total: pensionArr.march,
            id_ticked: []
        },
        april: {
            payed: 0,
            total: pensionArr.april,
            id_ticked: []
        },
        may: {
            payed: 0,
            total: pensionArr.may,
            id_ticked: []
        },
        june: {
            payed: 0,
            total: pensionArr.june,
            id_ticked: []
        },
        july: {
            payed: 0,
            total: pensionArr.july,
            id_ticked: []
        },
        august: {
            payed: 0,
            total: pensionArr.august,
            id_ticked: []
        },
        september: {
            payed: 0,
            total: pensionArr.september,
            id_ticked: []
        },
        october: {
            payed: 0,
            total: pensionArr.october,
            id_ticked: []
        },
        november: {
            payed: 0,
            total: pensionArr.november,
            id_ticked: []
        },
        december: {
            payed: 0,
            total: pensionArr.december,
            id_ticked: []
        }
    }
    const pensionCreated = await Pension.create(modifiedData);
    pensionCreated.student = studentId;
    await pensionCreated.save();

    const studentTarget = await Student.findById(studentId);
    if(!studentTarget) return "ERROR_FINDING_STUDENT";
    studentTarget.pension.push(pensionCreated._id);
    await studentTarget.save();

    return {message: "SUCCESS_PENSION_STUDENT"}
}

// const modifiedData = {
//     year: 2023,
//     march: {
//         payed: 0,
//         total: findMonth(pensionArr, "march"),
//         id_ticked: []
//     },
//     april: {
//         payed: 0,
//         total: findMonth(pensionArr, "april"),
//         id_ticked: []
//     },
//     may: {
//         payed: 0,
//         total: findMonth(pensionArr, "may"),
//         id_ticked: []
//     },
//     june: {
//         payed: 0,
//         total: findMonth(pensionArr, "june"),
//         id_ticked: []
//     },
//     july: {
//         payed: 0,
//         total: findMonth(pensionArr, "july"),
//         id_ticked: []
//     },
//     august: {
//         payed: 0,
//         total: findMonth(pensionArr, "august"),
//         id_ticked: []
//     },
//     september: {
//         payed: 0,
//         total: findMonth(pensionArr, "september"),
//         id_ticked: []
//     },
//     october: {
//         payed: 0,
//         total: findMonth(pensionArr, "october"),
//         id_ticked: []
//     },
//     november: {
//         payed: 0,
//         total: findMonth(pensionArr, "november"),
//         id_ticked: []
//     },
//     december: {
//         payed: 0,
//         total: findMonth(pensionArr, "december"),
//         id_ticked: []
//     }
// }