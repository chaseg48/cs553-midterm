import express from "express";

// Check existance of data
// Used for PATCH route where arguments are not required
export function checkExist(data) {
    return (typeof(data) !== "undefined");
}

// Validate string input
export function validateString(data) {
    return (typeof(data) === "string" && data.trim().length > 0);
}

// Validate boolean input
export function validateBoolean(data) {
    return (typeof(data) === "boolean");
}

// validateCreate middleware
// Assert that all required fields are present and in the correct format
// Return JSON error if issue with request
export function validateCreate(req, res, next) {
    if (validateString(req.body.title) && validateString(req.body.course)) {
        next();
    }
    else {
        res.status(400).json({error: "Invalid JSON"});
        return;
    }
}

// validateUpdate middleware
// Assert that all present fields are in the correct format
// Return JSON error if issue with request
export function validateUpdate(req, res, next) {
    if (checkExist(req.body.title)) {
        if (!validateString(req.body.title)) {
            res.status(400).json({error: "Invalid JSON"});
            return;
        }
    }

    if (checkExist(req.body.course)) {
        if (!validateString(req.body.course)) {
            res.status(400).json({error: "Invalid JSON"});
            return;
        }
    }

    if (checkExist(req.body.completed)) {
        if (!validateBoolean(req.body.completed)) {
            res.status(400).json({error: "Invalid JSON"});
            return;
        }
    }

    next();
}