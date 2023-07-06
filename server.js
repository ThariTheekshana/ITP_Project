import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();
import 'express-async-errors';
import morgan from 'morgan';

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
import cookieParser from 'cookie-parser';
// hello
// db and authenticateUser
import connectDB from './db/connect.js';

// routers
import authRouter from './routes/authRoutes.js';
import itemsRouter from './routes/itemsRoutes.js';
import customersRouter from './routes/customersRoutes.js';
import paymentsRouter from './routes/paymentsRoutes.js';
import suppliersRouter from './routes/suppliersRoutes.js';
import repairsRouter from './routes/repairsRoutes.js';
import deliveriesRouter from './routes/deliveriesRoutes.js';
import employeesRouter from './routes/employeesRoutes.js';
import warrantiesRouter from './routes/warrantiesRoutes.js';
// middleware
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';
import authenticateUser from './middleware/auth.js';

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

const __dirname = dirname(fileURLToPath(import.meta.url));

// only when ready to deploy
app.use(express.static(path.resolve(__dirname, './client/build')));

app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(cookieParser());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/items', authenticateUser, itemsRouter);
app.use('/api/v1/customers', authenticateUser, customersRouter);
app.use('/api/v1/payments', authenticateUser, paymentsRouter);
app.use('/api/v1/suppliers', authenticateUser, suppliersRouter);
app.use('/api/v1/repairs', authenticateUser, repairsRouter);
app.use('/api/v1/deliveries', authenticateUser, deliveriesRouter);
app.use('/api/v1/employees', authenticateUser, employeesRouter);
app.use('/api/v1/warranties', authenticateUser, warrantiesRouter);

// only when ready to deploy
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
