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
const jwt = require("jsonwebtoken");
const User_1 = __importDefault(require("../models/User"));
const getUserByToken = (token, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!token) {
        res.status(401).json({ message: "Acesso negado!", token: `res, ${token}` });
        return null;
    }
    try {
        const decoded = jwt.verify(token, "nossosecret");
        const user = (yield User_1.default.findOne({
            _id: decoded.id,
        }));
        return user;
    }
    catch (error) {
        res.status(400).json({ message: "Token inválido!", error });
        return null;
    }
});
// const getUserByToken = async (token: string | undefined, res: Response) => {
//   if (!token) {
//     return res.status(401).json({ message: "acesso negado!" });
//   }
//   const decoded = jwt.verify(token, "nossosecret");
//   const userId = decoded.id;
//   const user = await User.findOne({ _id: userId });
//   return user;
// };
exports.default = getUserByToken;
