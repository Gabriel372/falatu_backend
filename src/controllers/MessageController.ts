import { Request, Response } from "express";
import Message from "../models/Message";
import { getToken } from "../helpers/get-token";
import getUserByToken from "../helpers/get-user-by-token";

class MessageController {
  static async create(req: Request, res: Response): Promise<void> {
    const { to, from, content, _id } = req.body;
    if (!to) {
      res.status(422).json({ message: "preenhca o emissor da msg" });
      return;
    }
    if (!from) {
      res.status(422).json({ message: "preenhca o receptor da msg" });
      return;
    }
    if (!content) {
      res.status(422).json({ message: "preenhca o conteudo da msg" });
      return;
    }
    const messageExists = await Message.findOne({ _id: _id });
    if (messageExists) {
      res.status(422).json({ newMessage: messageExists });
      return;
    }
    const message = new Message({ from, to, content, _id });
    try {
      const newMessage = await message.save();
      res.status(200).json({ newMessage });
      return;
    } catch (error) {
      res.status(500).json({ message: error });
      return;
    }
  }

  static async giveListMessage(req: Request, res: Response) {
    const { chattingToEmail } = req.body;
    if (!chattingToEmail) {
      return res
        .status(422)
        .json({ message: "Preencha o email do usuário alvo da conversa" });
    }
    const token = getToken(req);
    const userLoged = await getUserByToken(token, res);
    try {
      const listMessages = await Message.find({
        $or: [
          { from: userLoged?.email, to: chattingToEmail },
          { from: chattingToEmail, to: userLoged?.email },
        ],
      }).sort({ createdAt: 1 });
      return res.status(200).json({ listMessages });
    } catch (err) {
      console.error("Erro ao buscar mensagens:", err);
      return res.status(500).json({
        message: "Erro ao buscar mensagens, tente novamente mais tarde",
      });
    }
  }
}

export default MessageController;
