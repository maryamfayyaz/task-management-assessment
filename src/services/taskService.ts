import { Op } from "sequelize";
import { Task } from "../db/models/Task";
import { publishEvent } from "../redis/publisher";
import { OrderItem } from "sequelize";

interface TaskFilters {
  status?: string;
  dueDate?: string;
  sortBy?: string;
  sortOrder?: string;
}

const allowedSortFields = ["title", "dueDate", "createdAt", "updatedAt"];
const allowedSortOrders = ["asc", "desc"];

export const create = async (data: any): Promise<Task> => {
  const task = await Task.create(data);

  await publishEvent("task_created", task);

  return task;
};

export const findAll = async (filters: TaskFilters) => {
  const where: any = {};

  if (filters.status) where.status = filters.status;

  if (filters.dueDate) where.dueDate = filters.dueDate;

  const sortBy = allowedSortFields.includes(filters.sortBy!) ? filters.sortBy! : "createdAt";
  const sortOrder = allowedSortOrders.includes(filters.sortOrder!) ? filters.sortOrder! : "asc";

  const order: OrderItem[] = [[sortBy, sortOrder.toUpperCase() as "ASC" | "DESC"]];

  return Task.findAll({ where, order });
};

export const findById = async (id: string): Promise<Task | null> => {
  return Task.findByPk(id);
};

export const update = async (id: string, data: any): Promise<Task | null> => {
  const task = await Task.findByPk(id);

  if (!task) return null;

  await task.update(data);

  if (data.status === "completed") await publishEvent("task_completed", task);

  return task;
};

export const remove = async (id: string): Promise<boolean> => {
  const count = await Task.destroy({ where: { id } });

  return count > 0;
};
