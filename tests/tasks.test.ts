import request from "supertest";
import app from "../src/app";
// import { sequelize } from "../src/db";

// beforeAll(async () => {
//   await sequelize.sync({ force: true }); // Reset DB for test
// });

describe("Task API", () => {
  let taskId: string;

  it("should create a task (POST /api/tasks)", async () => {
    const res = await request(app).post("/api/tasks").send({
      title: "Test Task",
      description: "This is a test",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    taskId = res.body.data.task.id;
  });

  it("should fail to create task without title (POST /api/tasks)", async () => {
    const res = await request(app).post("/api/tasks").send({});
    expect(res.statusCode).toBe(422);
    expect(res.body.success).toBe(false);
  });

  it("should fetch all tasks (GET /api/tasks)", async () => {
    const res = await request(app).get("/api/tasks");
    expect(res.statusCode).toBe(200);
    expect(res.body.data.tasks.length).toBeGreaterThanOrEqual(1);
  });

  it("should fetch a task by ID (GET /api/tasks/:id)", async () => {
    const res = await request(app).get(`/api/tasks/${taskId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.data.task.title).toBe("Test Task");
  });

  it("should return 404 for non-existent task (GET /api/tasks/:id)", async () => {
    const res = await request(app).get(`/api/tasks/00000000-0000-0000-0000-000000000000`);
    expect(res.statusCode).toBe(404);
  });

  it("should update a task (PUT /api/tasks/:id)", async () => {
    const res = await request(app).put(`/api/tasks/${taskId}`).send({
      title: "Updated Task",
      status: "completed",
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.data.task.title).toBe("Updated Task");
  });

  it("should delete a task (DELETE /api/tasks/:id)", async () => {
    const res = await request(app).delete(`/api/tasks/${taskId}`);
    expect(res.statusCode).toBe(204);
  });
});
