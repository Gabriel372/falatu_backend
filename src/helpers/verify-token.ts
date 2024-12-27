import {getToken} from './get-token'
import * as jwt from  'jsonwebtoken' ;
import { Request,Response } from "express";


const checkToken = (req:any, res:Response, next:any)=> {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "acesso negado!" });
  }
  const token = getToken(req);
  if (!token) {
    return res.status(401).json({ message: "acesso negado!" });
  }
  try {
    const verified = jwt.verify(token, "nossosecret");
    req.user = verified;
    next();
  } catch (error) {
    return res.status(400).json({ message: "token invalido!" });
  }
};
export default checkToken
