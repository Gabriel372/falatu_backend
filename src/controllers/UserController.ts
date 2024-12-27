import User from "../models/User";
// import bcrypt from "bcrypt"
import { Types } from "mongoose";
import { Request, Response } from "express";
import { createUserToken } from "../helpers/create-user-token";
import { getToken } from "../helpers/get-token";
import { Tuser } from "../types/Types";
// import * as jwt from  'jsonwebtoken' ;
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

const { ObjectId } = Types;

class UserController {
  static async register(req: Request, res: Response): Promise<void> {
    const { name, email, password } = req.body;
    if (!name) {
      res.status(422).json({ message: "preenhca seu nome" });
      return;
    }
    if (!email) {
      res.status(422).json({ message: "preenhca seu email" });
      return;
    }
    if (!password) {
      res.status(422).json({ message: "preenhca sua senha" });
      return;
    }
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      res.status(422).json({
        message: "email ja existe",
      });
      return;
    }
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);
    const user = new User({
      name,
      email,
      password: passwordHash,
    });

    try {
      const newUser = await user.save();
      await createUserToken(newUser, req, res);
    } catch (error) {
      res.status(500).json({ message: error });
      return;
    }
  }
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    if (!email) {
      res.status(422).json({ message: "o email e obrigatorio" });
      return;
    }
    if (!password) {
      res.status(422).json({ message: "a senha e obrigatoria" });
      return;
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(422).json({ message: "email nao cadastrado" });
      return;
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      res.status(422).json({
        message: "senha invalida",
      });
      return;
    }
    await createUserToken(user, req, res);
    return;
  }
  static async checkUserByToken(req: Request, res: Response) {
    let currentUser: Tuser | null;
    if (req.headers.authorization) {
      const token = getToken(req);
      const decoded = jwt.verify(token, "nossosecret");
      currentUser = await User.findById(decoded.id);
      if (currentUser?.password) {
        currentUser.password = undefined;
      }
    } else {
      currentUser = null;
    }
    res.status(200).send(currentUser);
  }
}

export default UserController;
