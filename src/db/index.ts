import { Sequelize } from "sequelize-typescript";
import { Task } from "./models/Task";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(process.env.DATABASE_URL!, {
  dialect: "postgres",
  models: [Task],
  logging: false,
});

export const initDB = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log("Database connected");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
};
