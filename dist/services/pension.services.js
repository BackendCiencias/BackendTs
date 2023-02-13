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
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerPension = void 0;
const registerPension = (pensionArr) => __awaiter(void 0, void 0, void 0, function* () {
    let x = 0;
    pensionArr.forEach((e) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(`element ${x++}`, e);
        // const pensionCreated = await Pension.create(e);
        // if(!pensionCreated) return "ERROR_CREATE_PENSION";
    }));
    return "Pensions Loading";
    // const savedPension = await pensionCreated.save();
});
exports.registerPension = registerPension;
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
//# sourceMappingURL=pension.services.js.map