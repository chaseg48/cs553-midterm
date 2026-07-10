import express from "express";
import { createRouter } from "./routes/tasks.js"
import { Logger } from "./middleware/logger.js"

const PORT = process.env.PORT || 3000;

function createApp() {
    const app = express();
    app.use(express.json());
    const router = createRouter();

    app.use((req, res, next) => {
        const routeStartTime = performance.now();
        req.routeStartTime = routeStartTime;
        next();
    });

    app.use("/api", router);

    app.get("/health", (req, res, next) => {
        res.body = {status: "Server is OK"};
        res.status(200);
        next();
    });

    app.use(Logger);
    
    app.use((req, res) => {
        res.status(404).json({ error: "Not found" });
    });

    return app;
}

const app = createApp();
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});