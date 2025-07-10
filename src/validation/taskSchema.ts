import Joi from "joi";

export const TaskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().optional(),
  dueDate: Joi.string().isoDate().optional(),
  status: Joi.string().valid("open", "in progress", "completed", "blocked").optional(),
});

export const TaskUpdateSchema = TaskSchema.fork(['title'], field => field.optional());
