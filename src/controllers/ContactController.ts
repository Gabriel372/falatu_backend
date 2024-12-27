import { Types } from "mongoose";
import { Request, Response } from "express";
import Contact from "../models/Contact";
import User from "../models/User";
import { getToken } from "../helpers/get-token";
import getUserByToken from "../helpers/get-user-by-token";
import { Tuser } from "../types/Types";
import Document from "next/document";
const ObjectId = require("mongoose").Types.ObjectId;

class ContactController {
  static async create(req: Request, res: Response): Promise<void> {
    const { name, email, userId } = req.body;
    if (!name) {
      res.status(422).json({ message: "preenhca o nome" });
      return;
    }
    if (!email) {
      res.status(422).json({ message: "preenhca o email" });
      return;
    }
    const token = getToken(req);
    const user = await getUserByToken(token, res);
    //APOS O LOGIN TOKEN ESTA VINDO UNDEFINED
    const idOfUser = user && "_id" in user ? user._id : undefined;
    const emailContact = await Contact.findOne({ email: email });
    if (emailContact?.userId.equals(idOfUser)) {
      res.status(422).json({
        message: "email ja criado na sua lista de contatos",
      });
      return;
    }
    const contactExists = await User.findOne({ email: email });
    if (!contactExists) {
      res.status(422).json({
        message: "email de contato ainda nao cadastrado",
      });
      return;
    }
    const contact = new Contact({
      name,
      email,
      userId: user?._id,
    });
    try {
      const newContact = await contact.save();
      res.status(200).json({ newContact });
    } catch (error) {
      res.status(500).json({
        message: "Erro interno ao salvar o contato",
      });
      return;
    }
  }
  static async getAllUserContacts(req: Request, res: Response) {
    const token = getToken(req);
    const user = await getUserByToken(token, res);
    if (user && "_id" in user) {
      try {
        const contacts = await Contact.find({ userId: user._id });
        res.status(200).json({ contacts });
        return;
      } catch (error) {
        res.status(500).json({ message: "Erro ao buscar os contatos" });
      }
    } else {
      res.status(404).json({ message: "Usuário não encontrado" });
    }
  }
  static async deleteContactById(req: Request, res: Response) {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: "id invalido!" });
      return;
    }
    const contact = await Contact.findOne({ _id: id });
    if (!contact) {
      res.status(404).json({ message: "contato nao encontrado!" });
      return;
    }
    const token = getToken(req);
    const user = await getUserByToken(token, res);
    if (contact.userId.toString() !== user?._id.toString()) {
      res
        .status(422)
        .json({ message: "esse contato não pertence a esse usuario!" });
      return;
    }
    await Contact.findByIdAndDelete(id);
    res.status(200).json({ message: "contato removido com sucesso!" });
  }
}

export default ContactController;
