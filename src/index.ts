import express, { Express } from "express";
import cors from "cors";
import UserRoutes from "./routes/UserRoutes";
import ContactRoutes from "./routes/ContactRoutes";
import MessageRoutes from "./routes/MessageRoutes";

import http from "http";
import setupSocketHandlers from "./sockets/socketHandlers";

const port = process.env.PORT || 3001;
const app: Express = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: { origin: "http://localhost:3000" },
});
setupSocketHandlers(io);
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
// const TaskRoutes = require("./routes/TaskRoutes");
// app.use("/tasks", TaskRoutes);
app.use("/users", UserRoutes);
app.use("/contacts", ContactRoutes);
app.use("/messages", MessageRoutes);

server.listen(5000, () => console.log("Server running..."));
// app.listen(5000);
