import * as jwt from "jsonwebtoken";
import { Request, Response } from "express";

export const createUserToken = async (
  userData: any,
  req: Request,
  res: Response
) => {
  const token = jwt.sign(
    {
      name: userData.name,
      id: userData.id,
    },
    "nossosecret"
  );
  const user = {
    name: userData.name,
    email: userData.email,
    _id: userData._id,
  };
  res.status(200).json({ message: "vc esta autenticado", token: token, user });
};
