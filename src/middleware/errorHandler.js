import express from "express";

export function checkExist(data) {
    return (typeof(data) !== "undefined");
}

export function validateString(data) {
    return (typeof(data) === "string" && data.trim().length > 0);
}

export function validateBoolean(data) {
    return (typeof(data) === "boolean");
}

export function validateCreate(req, res, next) {
    if (validateString(req.body.title) && validateString(req.body.course)) {
        next();
    }
    else {
        res.status(400).json({error: "Invalid JSON"});
        return;
    }
}

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