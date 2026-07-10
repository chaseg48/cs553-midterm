import express from "express";
import { validateString } from "../middleware/errorHandler.js";

// Logger middleware
// Log the route, execution time, and status code
export function Logger(req, res, next) {
    // API is designed so that a valid route will append a "body" member to the response object
    // DELETE route does not append the body so check the status code as well
    if (typeof(res.body) !== "undefined" || res.statusCode == 204) {
        console.log(req.method + " " + String(req.originalUrl));
        console.log("Status: " + String(res.statusCode));
        console.log("Execution time: " + String(performance.now() - req.routeStartTime) + " ms\n");
        res.json(res.body);
        return;
    }
    // If at this point a valid route was not executed
    // next() will be the invalid route handler in the server.js
    else {
        next();
    }
}