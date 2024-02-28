import { Types } from 'mongoose';
import Pension, { IPension } from './../models/pension.model';
import Category, { ICategory } from './../models/category.model';
import Student from './../models/student.model';
import { generateTickedC } from './tickedC.services';

interface PensionData {
    [key: string]: {
        payed: number;
        total: number;
        id_ticked: any[];
    };
}

export const registerPension = async (pensionArr: any, studentId: Types.ObjectId) => {
    const modifiedData: PensionData = {};

    for (const month in pensionArr) {
        modifiedData[month] = {
            payed: 0,
            total: pensionArr[month],
            id_ticked: []
        };
    }

    const pensionCreated = await Pension.create(modifiedData);
    pensionCreated.student = studentId;
    await pensionCreated.save();

    const studentTarget = await Student.findById(studentId);
    if (!studentTarget) return "ERROR_FINDING_STUDENT";

    studentTarget.pension.push(pensionCreated._id);
    await studentTarget.save();

    return { message: "SUCCESS_PENSION_STUDENT" };
}

// export const payMonthPension = async (idStudent:string, month:string) => {
//     const pension = await Pension.findOne({ student: idStudent});
//     if (!pension) return "INVALID_ID_STUDENT";

//     const cant = pension?.[`${month}`].total;
//     pension?.[`${month}`].payed = cant;
//     // console.log(pension?.[`${month}`]);
//     const catego = await Category.findOne({name: "Pension"});
//     const idCategory = catego?.id;
//     const today = new Date().toDateString();
//     const tickedGenerated = await generateTickedC(
//         {
//             date: today,
//             amount: cant,
//             student: idStudent, 
//             category: [idCategory]
//         }
//     )
//     // console.log(tickedGenerated)
//     pension?.[`${month}`].id_ticked = [tickedGenerated.id];
//     const modifiedPension = await pension.save();
//     console.log(tickedGenerated);
//     return tickedGenerated;
// };

export const payMonthPension = async (idStudent:string, month:string) => {
    return "Inactive"
}

export const modifyPension = async () => {
    console.log("Modify Pension Alive");
}