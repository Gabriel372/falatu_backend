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
const User_1 = __importDefault(require("../models/User"));
// import bcrypt from "bcrypt"
const mongoose_1 = require("mongoose");
const create_user_token_1 = require("../helpers/create-user-token");
const get_token_1 = require("../helpers/get-token");
// import * as jwt from  'jsonwebtoken' ;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { ObjectId } = mongoose_1.Types;
class UserController {
    static register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
            const userExists = yield User_1.default.findOne({ email: email });
            if (userExists) {
                res.status(422).json({
                    message: "email ja existe",
                });
                return;
            }
            const salt = yield bcrypt.genSalt(12);
            const passwordHash = yield bcrypt.hash(password, salt);
            const user = new User_1.default({
                name,
                email,
                password: passwordHash,
            });
            try {
                const newUser = yield user.save();
                yield (0, create_user_token_1.createUserToken)(newUser, req, res);
            }
            catch (error) {
                res.status(500).json({ message: error });
                return;
            }
        });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            if (!email) {
                res.status(422).json({ message: "o email e obrigatorio" });
                return;
            }
            if (!password) {
                res.status(422).json({ message: "a senha e obrigatoria" });
                return;
            }
            const user = yield User_1.default.findOne({ email: email });
            if (!user) {
                res.status(422).json({ message: "email nao cadastrado" });
                return;
            }
            const checkPassword = yield bcrypt.compare(password, user.password);
            if (!checkPassword) {
                res.status(422).json({
                    message: "senha invalida",
                });
                return;
            }
            yield (0, create_user_token_1.createUserToken)(user, req, res);
            return;
        });
    }
    static checkUserByToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let currentUser;
            if (req.headers.authorization) {
                const token = (0, get_token_1.getToken)(req);
                const decoded = jwt.verify(token, "nossosecret");
                currentUser = yield User_1.default.findById(decoded.id);
                if (currentUser === null || currentUser === void 0 ? void 0 : currentUser.password) {
                    currentUser.password = undefined;
                }
            }
            else {
                currentUser = null;
            }
            res.status(200).send(currentUser);
        });
    }
}
exports.default = UserController;
