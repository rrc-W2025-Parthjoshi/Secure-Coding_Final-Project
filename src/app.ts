import express, { Express } from "express";
import morgan from "morgan";
import healthRoutes from "./api/v1/routes/healthRoutes";
import ticketRoutes from "./api/v1/routes/ticketRoutes";

const app: Express = express();

app.use(morgan("combined"));
app.use(express.json());

app.use("/api/v1", healthRoutes);
app.use("/api/v1", ticketRoutes);

export default app;