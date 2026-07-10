import express from "express";
import { Logger } from "../middleware/logger.js"
import { validateCreate,
         validateUpdate,
         checkExist } from "../middleware/errorHandler.js";

// Route middleware
// Handle valid API routes
export function createRouter() {
    const router = express.Router();

    let nextTaskId = 1;
    let taskArray = [{id: "0", title: "Complete Midterm", course: "CS553", completed: false}];

    // Return list of all tasks
    router.get("/tasks", (req, res, next) => {
        res.status(200);
        res.body = {tasks: taskArray};
        next();
    });

    // Create new task and auto assign id
    router.post("/tasks", validateCreate, (req, res, next) => {
        let task = {
            id: String(nextTaskId),
            title: req.body.title,
            course: req.body.course,
            completed: false
            };
            
        taskArray.push(task);
        nextTaskId = nextTaskId + 1;
        res.status(201);
        res.body = task;
        next();
    });

    // Return task by id
    router.get("/tasks/:id", (req, res, next) => {
        let found = false;
        for (let i = 0; i < taskArray.length; i++) {
            if (req.params.id == taskArray[i].id) {
                found = true;
                res.body = taskArray[i];
                break;
            }
        }

        if (found) {
            res.status(200);
            next();
        }
        else {
            res.status(404);
            res.body = {error: "Task not found"};
            next();
        }
    });

    // Replace task by id
    router.put("/tasks/:id", validateCreate, (req, res, next) => {
        let found = false;
        for (let i = 0; i < taskArray.length; i++) {
            if (req.params.id == taskArray[i].id) {
                found = true;
                taskArray[i] = {
                    id: taskArray[i].id,
                    title: req.body.title,
                    course: req.body.course,
                    completed: false
                }
                res.body = taskArray[i];
                break;
            }
        }

        if (found) {
            res.status(201);
            next();
        }
        else {
            res.status(404);
            res.body = {error: "Task not found"};
            next();
        }
    });

    // Partially update task by id
    router.patch("/tasks/:id", validateUpdate, (req, res, next) => {
        let found = false;
        for (let i = 0; i < taskArray.length; i++) {
            if (req.params.id == taskArray[i].id) {
                found = true;
                taskArray[i].title = checkExist(req.body.title) ? req.body.title : taskArray[i].title;
                taskArray[i].course = checkExist(req.body.course) ? req.body.course : taskArray[i].course;
                taskArray[i].completed = checkExist(req.body.completed) ? req.body.completed : taskArray[i].completed;
                res.body = taskArray[i];
                break;
            }
        }

        if (found) {
            res.status(201);
            next();
        }
        else {
            res.status(404);
            res.body = {error: "Task not found"};
            next();
        }
    });

    // Delete task by id
    router.delete("/tasks/:id", (req, res, next) => {
        let found = false;
        for (let i = 0; i < taskArray.length; i++) {
            if (req.params.id == taskArray[i].id) {
                found = true;
                taskArray.splice(i, 1);
                break;
            }
        }

        if (found) {
            res.status(204);
            next();
        }
        else {
            res.status(404);
            res.body = {error: "Task not found"};
            next();
        }
    });

    return router;
}