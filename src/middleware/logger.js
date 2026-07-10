import express from "express";
import { validateString } from "../middleware/errorHandler.js";

export function Logger(req, res, next) {
    if (typeof(res.body) !== "undefined" || res.statusCode == 204) {
        console.log(req.method + " " + String(req.originalUrl));
        console.log("Status: " + String(res.statusCode));
        console.log("Execution time: " + String(performance.now() - req.routeStartTime) + " ms\n");
        res.json(res.body);
        return;
    }
    else {
        next();
    }
}