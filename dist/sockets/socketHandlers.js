"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = setupSocketHandlers;
const Contact_1 = __importDefault(require("../models/Contact"));
function setupSocketHandlers(io) {
    io.on("connection", (socket) => {
        socket.on("set_username", (username) => {
            socket.data.username = username;
        });
        socket.on("message", (message) => {
            io.emit("receive_message", Object.assign({}, message));
        });
        // content: message.content,
        // content: message.content,
        // authorId: socket.id,
        //add contact
        socket.on("add_contact", (data) => __awaiter(this, void 0, void 0, function* () {
            try {
                const newContact = new Contact_1.default({
                    name: data.name,
                    email: data.email,
                    userId: data.userId,
                });
                yield newContact.save();
                socket.emit("contact_added", newContact);
            }
            catch (error) {
                console.error("Error saving contact:", error);
                socket.emit("error", { message: "Error saving contact" });
            }
        }));
        socket.on("disconnect", () => {
            console.log("Client disconnected");
        });
    });
}
