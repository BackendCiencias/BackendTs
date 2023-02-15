// import "dotenv/config"
import express, { Application } from 'express'
import authRoutes from './routes/auth.routes'
import classroomRoutes from './routes/classroom.routes'
import studentRoutes from './routes/student.routes'
import tutorRoutes from './routes/tutor.routes'
import contractRoutes from './routes/contract.routes'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app: Application = express();
const PORT = process.env.PORT || 3000

// settings
app.set('port', PORT)

//middlewares 
app.use(morgan('dev'));
app.use(cookieParser())
app.use(express.json());
let corsOptions = {
    origin: ['http://localhost:3000', "https://frontend-cienciasapp.vercel.app"],
    credentials: true,
    optionSucccesStatus:200
};
app.use(cors(corsOptions));

// routes
app.use(authRoutes, classroomRoutes, studentRoutes, tutorRoutes, contractRoutes);

export default app;