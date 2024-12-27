const jwt = require("jsonwebtoken");
// import * as jwt from  'jsonwebtoken' ;
import { Request, Response } from "express";

import User from "../models/User";
import { Tuser } from "../types/Types";

const getUserByToken = async (
  token: string | undefined,
  res: Response
): Promise<Tuser | null> => {
  if (!token) {
    res.status(401).json({ message: "Acesso negado!", token: `res, ${token}` });
    return null;
  }
  try {
    const decoded = jwt.verify(token, "nossosecret") as { id: string };
    const user: Tuser | null = (await User.findOne({
      _id: decoded.id,
    })) as Tuser | null;
    return user;
  } catch (error) {
    res.status(400).json({ message: "Token inválido!", error });
    return null;
  }
};

// const getUserByToken = async (token: string | undefined, res: Response) => {
//   if (!token) {
//     return res.status(401).json({ message: "acesso negado!" });
//   }
//   const decoded = jwt.verify(token, "nossosecret");
//   const userId = decoded.id;
//   const user = await User.findOne({ _id: userId });
//   return user;
// };

export default getUserByToken;
