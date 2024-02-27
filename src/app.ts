import { createRoles } from './utils/initialSetup';
import express, { Application } from 'express';
import authRoutes from './routes/auth.routes';
import classroomRoutes from './routes/classroom.routes';
import studentRoutes from './routes/student.routes';
import tutorRoutes from './routes/tutor.routes';
import teacherRoutes from './routes/teacher.routes';
import directorRoutes from './routes/director.routes';
import contractRoutes from './routes/contract.routes';
import categoryRoutes from './routes/category.routes';
import assistantRoutes from './routes/assistant.routes';
import attendanceRoutes from './routes/attendance.routes';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app: Application = express();
createRoles();
const PORT = process.env.PORT || 3000;

// settings
app.set('port', PORT);

//middlewares 
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

let corsOptions = {
  origin: ['http://localhost:3000', 'https://frontend-cienciasapp.vercel.app', 'https://www.cienciasperu.edu.pe'],
  credentials: true,
  optionsSuccessStatus: 200, // Corrected the option name
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Specify the allowed HTTP methods
  allowedHeaders: 'Content-Type, Authorization', // Specify the allowed headers
};

app.use(cors(corsOptions));

// routes
app.use(authRoutes, classroomRoutes, studentRoutes, tutorRoutes, contractRoutes, teacherRoutes, directorRoutes, categoryRoutes, assistantRoutes, attendanceRoutes);

export default app;