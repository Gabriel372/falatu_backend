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
  cors: {
    origin: [
      "http://localhost:3000",
      "https://falatu-frontend-git-main-gabriel-de-souza-brandaos-projects.vercel.app",
    ],
  },
});
setupSocketHandlers(io);
app.use(express.json());
// app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
const allowedOrigins = [
  "http://localhost:3000",
  "https://falatu-frontend-git-main-gabriel-de-souza-brandaos-projects.vercel.app",
];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
// const TaskRoutes = require("./routes/TaskRoutes");
// app.use("/tasks", TaskRoutes);
app.use("/users", UserRoutes);
app.use("/contacts", ContactRoutes);
app.use("/messages", MessageRoutes);

server.listen(5000, () =>
  console.log("Server running in http://localhost:5000/")
);
// app.listen(5000);
