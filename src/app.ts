import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import taskRoutes from "./routes/tasks";
// import swaggerUi from 'swagger-ui-express';
// import * as swaggerDocument from '../swagger/swagger.json';
import { initDB } from "./db";
import apiResponse from "./utils/apiResponse";import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger/swaggerConfig';





dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

initDB();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/tasks", taskRoutes);

app.get("/", (_, res) => res.send("Task Manager API"));


app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
  const statusCode = err.statusCode || 500;

  apiResponse.error(res, "", err, statusCode);
  return;
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


export default app;