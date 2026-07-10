import express from "express";
import { createRouter } from "./routes/tasks.js"
import { Logger } from "./middleware/logger.js"

const PORT = process.env.PORT || 3000;

function createApp() {
    const app = express();
    app.use(express.json());
    const router = createRouter();

    // Record start time for getting execution time later
    app.use((req, res, next) => {
        const routeStartTime = performance.now();
        req.routeStartTime = routeStartTime;
        next();
    });

    // Express router middleware
    app.use("/api", router);

    // Server health check
    app.get("/health", (req, res, next) => {
        res.body = {status: "Server is OK"};
        res.status(200);
        next();
    });

    // Server logger middleware
    // Logs all routes, execution time, and status code
    app.use(Logger);
    
    // Catch invalid routes
    app.use((req, res) => {
        res.status(404).json({ error: "Not found" });
    });

    return app;
}

// Create and listen on port
const app = createApp();
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});