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
exports.createCategory = exports.getCategories = void 0;
const error_handle_1 = require("../utils/error.handle");
const category_services_1 = require("../services/category.services");
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const responseVacancies = yield (0, category_services_1.getAllCategories)();
        res.send(responseVacancies);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_GETALL_CATEGORY', e);
    }
});
exports.getCategories = getCategories;
const createCategory = ({ body }, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(body.name);
        const responseCreate = yield (0, category_services_1.registerCategory)(body.name);
        res.send(responseCreate);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_CREATE_CATEGORY', e);
    }
});
exports.createCategory = createCategory;
//# sourceMappingURL=category.controller.js.map