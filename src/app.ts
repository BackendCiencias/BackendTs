// import "dotenv/config"
import express, { Application } from 'express'
import authRoutes from './routes/auth.routes'
import morgan from 'morgan'
import cors from 'cors'

const app: Application = express();
const PORT = process.env.PORT || 3000

// settings
app.set('port', PORT)

//middlewares 
app.use(morgan('dev'));
app.use(express.json());
let corsOptions = {
    origin: ['http://localhost:3000'],
    credentials: true,
    optionSucccesStatus:200
};
app.use(cors(corsOptions));

// routes
app.use(authRoutes);

export default app;