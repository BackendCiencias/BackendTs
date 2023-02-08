// import "dotenv/config"
import express, { Application } from 'express'
import authRoutes from './routes/auth'
import morgan from 'morgan'

const app: Application = express();
const PORT = process.env.PORT || 3000

// settings
app.set('port', PORT)

//middlewares 
app.use(morgan('dev'));
app.use(express.json());

// routes
app.use(authRoutes);

export default app;