import { Server, Socket } from "socket.io";
import Contact from "../models/Contact";
import { TAddContactData, Tmessage } from "../types/Types";

export default function setupSocketHandlers(io: Server) {
  io.on("connection", (socket: Socket) => {
    socket.on("set_username", (username: string) => {
      socket.data.username = username;
    });

    socket.on("message", (message: Tmessage) => {
      io.emit("receive_message", {
        ...message,
      });
    });
    // content: message.content,
    // content: message.content,
    // authorId: socket.id,
    //add contact
    socket.on("add_contact", async (data: TAddContactData) => {
      try {
        const newContact = new Contact({
          name: data.name,
          email: data.email,
          userId: data.userId,
        });
        await newContact.save();

        socket.emit("contact_added", newContact);
      } catch (error) {
        console.error("Error saving contact:", error);
        socket.emit("error", { message: "Error saving contact" });
      }
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
}
