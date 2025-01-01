"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const UserRoutes_1 = __importDefault(require("./routes/UserRoutes"));
const ContactRoutes_1 = __importDefault(require("./routes/ContactRoutes"));
const MessageRoutes_1 = __importDefault(require("./routes/MessageRoutes"));
const http_1 = __importDefault(require("http"));
const socketHandlers_1 = __importDefault(require("./sockets/socketHandlers"));
const port = process.env.PORT || 3001;
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: [
            "http://localhost:3000",
            "https://falatu-frontend-git-main-gabriel-de-souza-brandaos-projects.vercel.app",
        ],
    },
});
(0, socketHandlers_1.default)(io);
app.use(express_1.default.json());
// app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
const allowedOrigins = [
    "http://localhost:3000",
    "https://falatu-frontend-git-main-gabriel-de-souza-brandaos-projects.vercel.app",
];
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
}));
// const TaskRoutes = require("./routes/TaskRoutes");
// app.use("/tasks", TaskRoutes);
app.use("/users", UserRoutes_1.default);
app.use("/contacts", ContactRoutes_1.default);
app.use("/messages", MessageRoutes_1.default);
server.listen(5000, () => console.log("Server running in http://localhost:5000/"));
// app.listen(5000);
