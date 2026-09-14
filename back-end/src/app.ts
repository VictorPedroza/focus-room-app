import express from "express";
import { createServer } from "http";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();

import { setupWebSocket } from "./websocket/index.js";

const app = express();
app.use(express.json());
app.use(cors());



export const server = createServer(app);

setupWebSocket(server);

import routes from "./http/routes/routes.js";
app.use("/api", routes);
