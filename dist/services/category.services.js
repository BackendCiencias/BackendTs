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
exports.registerCategory = exports.getAllCategories = void 0;
const category_model_1 = __importDefault(require("./../models/category.model"));
const getAllCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    const allCategory = yield category_model_1.default.find();
    return allCategory;
});
exports.getAllCategories = getAllCategories;
const registerCategory = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryCreated = yield category_model_1.default.create({ name });
    return categoryCreated;
});
exports.registerCategory = registerCategory;
//# sourceMappingURL=category.services.js.map