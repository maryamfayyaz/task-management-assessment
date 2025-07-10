import { Request, Response } from "express";
import * as TaskService from "../services/taskService";
import { TaskSchema, TaskUpdateSchema } from "../validation/taskSchema";
import { getErrorMessage } from "../utils/helpers";
import apiResponse from "../utils/apiResponse";

export const createTask = async (req: Request, res: Response) => {
  const { error, value } = TaskSchema.validate(req.body);

  if (error) return apiResponse.unprocessableEntity(res, getErrorMessage(error));

  const task = await TaskService.create(value);

  apiResponse.success(res, 201, "Task Created Successfully", { task });
};

export const updateTask = async (req: Request, res: Response) => {
  const { error, value } = TaskUpdateSchema.validate(req.body);

  if (error) return apiResponse.unprocessableEntity(res, getErrorMessage(error));

  const updated = await TaskService.update(req.params.id, value);

  if (!updated) return apiResponse.notFound(res);

  apiResponse.success(res, 200, "Task Updated Success Fully", { task: updated });
};

export const getAllTasks = async (req: Request, res: Response) => {
  const { status, dueDate, sortBy = "createdAt", sortOrder = "asc" } = req.query;

  const filters = {
    status: status as string | undefined,
    dueDate: dueDate as string | undefined,
    sortBy: sortBy as string,
    sortOrder: sortOrder as string,
  };

  const tasks = await TaskService.findAll(filters);

  apiResponse.success(res, 200, "Tasks fetched successfully", { tasks });
};

export const getTaskById = async (req: Request, res: Response) => {
  const task = await TaskService.findById(req.params.id);

  if (!task) return apiResponse.notFound(res);

  apiResponse.success(res, 200, "Task Fetched Successfully", { task });
};

export const deleteTask = async (req: Request, res: Response) => {
  const deleted = await TaskService.remove(req.params.id);

  if (!deleted) return apiResponse.notFound(res);

  apiResponse.success(res, 204);
};
