"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import "dotenv/config"
const express_1 = __importDefault(require("express"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// settings
app.set('port', PORT);
//middlewares 
app.use((0, morgan_1.default)('dev'));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
let corsOptions = {
    origin: ['http://localhost:3000'],
    credentials: true,
    optionSucccesStatus: 200
};
app.use((0, cors_1.default)(corsOptions));
// routes
app.use(auth_routes_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map