import Pension, { IPension } from './../models/pension.model';
interface ISimplyPensionMonth{
    month: string;
    total: number;
}

export const registerPension = async(pensionArr:ISimplyPensionMonth[]) => {
    let x = 0;
    pensionArr.forEach(async e =>  {
        console.log(`element ${x++}`, e);
        // const pensionCreated = await Pension.create(e);
        // if(!pensionCreated) return "ERROR_CREATE_PENSION";
    });
    return "Pensions Loading"
    // const savedPension = await pensionCreated.save();
}
// "pensions": [
//     { "march": 300},
//     { "april":  301},
//     { "may":  302},
//     { "june":  303},
//     { "july":  304},
//     { "august":  305},
//     { "september":  306},
//     { "october":  307},
//     { "november":  308},
//     { "december":  309}
//   ]



// "pensions": [
//     { 
//       "month":  "march",
//       "value": 300
//     },
//     { 
//       "month":  "april",
//       "value": 300
//     },
//     { 
//       "month":  "may",
//       "value": 300
//     },
//     { 
//       "month":  "june",
//       "value": 300
//     },
//     { 
//       "month":  "july",
//       "value": 300
//     },
//     { 
//       "month":  "august",
//       "value": 300
//     },
//     { 
//       "month":  "september",
//       "value": 300
//     },
//     { 
//       "month":  "october",
//       "value": 300
//     },
//     { 
//       "month":  "november",
//       "value": 300
//     },
//     { 
//       "month":  "december",
//       "value": 300
//     }
//   ]