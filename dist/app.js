"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const initialSetup_1 = require("./utils/initialSetup");
// import "dotenv/config"
const express_1 = __importDefault(require("express"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const classroom_routes_1 = __importDefault(require("./routes/classroom.routes"));
const student_routes_1 = __importDefault(require("./routes/student.routes"));
const tutor_routes_1 = __importDefault(require("./routes/tutor.routes"));
const teacher_routes_1 = __importDefault(require("./routes/teacher.routes"));
const director_routes_1 = __importDefault(require("./routes/director.routes"));
const contract_routes_1 = __importDefault(require("./routes/contract.routes"));
const category_routes_1 = __importDefault(require("./routes/category.routes"));
const assistant_routes_1 = __importDefault(require("./routes/assistant.routes"));
const attendance_routes_1 = __importDefault(require("./routes/attendance.routes"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
(0, initialSetup_1.createRoles)();
const PORT = process.env.PORT || 3000;
// settings
app.set('port', PORT);
//middlewares 
app.use((0, morgan_1.default)('dev'));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
let corsOptions = {
    origin: ['http://localhost:3000', "https://frontend-cienciasapp.vercel.app", "https://www.cienciasperu.edu.pe"],
    credentials: true,
    optionsSuccessStatus: 200,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization', // Specify the allowed headers
};
app.use((0, cors_1.default)(corsOptions));
// routes
app.use(auth_routes_1.default, classroom_routes_1.default, student_routes_1.default, tutor_routes_1.default, contract_routes_1.default, teacher_routes_1.default, director_routes_1.default, category_routes_1.default, assistant_routes_1.default, attendance_routes_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map