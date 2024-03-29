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
exports.getAllTickeds = exports.generateTickedC = void 0;
const tickedC_model_1 = __importDefault(require("./../models/tickedC.model"));
const generateTickedC = (tickedC) => __awaiter(void 0, void 0, void 0, function* () {
    const tickedC_Created = yield tickedC_model_1.default.create(tickedC);
    // const ticked = await TickedC.find({id: tickedC_Created.id}).populate("student");
    return tickedC_Created;
});
exports.generateTickedC = generateTickedC;
const getAllTickeds = () => __awaiter(void 0, void 0, void 0, function* () {
    const allTickeds = yield tickedC_model_1.default.find();
    console;
    return allTickeds;
});
exports.getAllTickeds = getAllTickeds;
//# sourceMappingURL=tickedC.services.js.map