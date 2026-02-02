import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../utils/customErrors.js";

const validPriorities = ["low", "medium", "high"];

const router = Router();

let tasks = [
  {
    id: 1,
    title: "Sample Task",
    description: "This is a test task",
    priority: "medium",
    completed: false,
    createdAt: new Date(),
  },
];

router.get("/", (req, res) => {
  res.status(StatusCodes.OK).json(tasks);
});

router.post("/", (req, res, next) => {
  if (!req.body.title) return next(new BadRequestError(`Title is required`));

  if (req.body.priority && !validPriorities.includes(req.body.priority))
    return next(new BadRequestError("Invalid priority level"));

  const newTask = {
    id: Date.now(),
    title: req.body.title,
    description: req.body.description || "",
    priority: req.body.priority || "low",
    completed: false,
    createdAt: new Date(),
  };
  tasks.push(newTask);
  res.status(StatusCodes.CREATED).json(newTask);
});

router.put("/:id", (req, res, next) => {
  const { id } = req.params;
  const index = tasks.findIndex((t) => t.id == id);

  if (req.body.priority && !validPriorities.includes(req.body.priority))
    return next(new BadRequestError("Invalid priority level"));

  if (index === -1)
    return next(new NotFoundError(`Task with ID ${id} not found`));

  tasks[index] = { ...tasks[index], ...req.body };
  res.status(StatusCodes.OK).json(tasks[index]);
});

router.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  const index = tasks.findIndex((t) => t.id == id);

  if (index === -1)
    return next(new NotFoundError(`Task with ID ${id} not found`));

  const taskToDelete = tasks[index];
  tasks.splice(index, 1);
  res.status(StatusCodes.OK).json(taskToDelete);
});

router.patch("/:id/toggle", (req, res, next) => {
  const { id } = req.params;
  const task = tasks.find((t) => t.id == id);

  if (!task) return next(new NotFoundError(`Task with ID ${id} not found`));

  task.completed = !task.completed;
  res.status(StatusCodes.OK).json(task);
});

export default router;
