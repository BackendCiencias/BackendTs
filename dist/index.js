"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const mongo_1 = __importDefault(require("./config/mongo"));
const mongoose_1 = __importDefault(require("mongoose"));
function main() {
    app_1.default.listen(app_1.default.get('port'), () => console.log(`Server on port ${app_1.default.get('port')}`));
    mongoose_1.default.set('strictQuery', false);
    (0, mongo_1.default)().then(() => console.log("Conected to MongoDB Atlas")).catch((err) => console.log("Bad Conection", err));
}
main();
//# sourceMappingURL=index.js.map