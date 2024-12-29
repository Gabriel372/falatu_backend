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
const Message_1 = __importDefault(require("../models/Message"));
const get_token_1 = require("../helpers/get-token");
const get_user_by_token_1 = __importDefault(require("../helpers/get-user-by-token"));
class MessageController {
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
            const messageExists = yield Message_1.default.findOne({ _id: _id });
            if (messageExists) {
                res.status(422).json({ newMessage: messageExists });
                return;
            }
            const message = new Message_1.default({ from, to, content, _id });
            try {
                const newMessage = yield message.save();
                res.status(200).json({ newMessage });
                return;
            }
            catch (error) {
                res.status(500).json({ message: error });
                return;
            }
        });
    }
    static giveListMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { chattingToEmail } = req.body;
            if (!chattingToEmail) {
                return res
                    .status(422)
                    .json({ message: "Preencha o email do usuário alvo da conversa" });
            }
            const token = (0, get_token_1.getToken)(req);
            const userLoged = yield (0, get_user_by_token_1.default)(token, res);
            try {
                const listMessages = yield Message_1.default.find({
                    $or: [
                        { from: userLoged === null || userLoged === void 0 ? void 0 : userLoged.email, to: chattingToEmail },
                        { from: chattingToEmail, to: userLoged === null || userLoged === void 0 ? void 0 : userLoged.email },
                    ],
                }).sort({ createdAt: 1 });
                return res.status(200).json({ listMessages });
            }
            catch (err) {
                console.error("Erro ao buscar mensagens:", err);
                return res.status(500).json({
                    message: "Erro ao buscar mensagens, tente novamente mais tarde",
                });
            }
        });
    }
}
exports.default = MessageController;
