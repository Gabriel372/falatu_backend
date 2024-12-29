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
const Contact_1 = __importDefault(require("../models/Contact"));
const User_1 = __importDefault(require("../models/User"));
const get_token_1 = require("../helpers/get-token");
const get_user_by_token_1 = __importDefault(require("../helpers/get-user-by-token"));
//import Document from "next/document";
const ObjectId = require("mongoose").Types.ObjectId;
class ContactController {
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, userId } = req.body;
            if (!name) {
                res.status(422).json({ message: "preenhca o nome" });
                return;
            }
            if (!email) {
                res.status(422).json({ message: "preenhca o email" });
                return;
            }
            const token = (0, get_token_1.getToken)(req);
            const user = yield (0, get_user_by_token_1.default)(token, res);
            //APOS O LOGIN TOKEN ESTA VINDO UNDEFINED
            const idOfUser = user && "_id" in user ? user._id : undefined;
            const emailContact = yield Contact_1.default.findOne({ email: email });
            if (emailContact === null || emailContact === void 0 ? void 0 : emailContact.userId.equals(idOfUser)) {
                res.status(422).json({
                    message: "email ja criado na sua lista de contatos",
                });
                return;
            }
            const contactExists = yield User_1.default.findOne({ email: email });
            if (!contactExists) {
                res.status(422).json({
                    message: "email de contato ainda nao cadastrado",
                });
                return;
            }
            const contact = new Contact_1.default({
                name,
                email,
                userId: user === null || user === void 0 ? void 0 : user._id,
            });
            try {
                const newContact = yield contact.save();
                res.status(200).json({ newContact });
            }
            catch (error) {
                res.status(500).json({
                    message: "Erro interno ao salvar o contato",
                });
                return;
            }
        });
    }
    static getAllUserContacts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = (0, get_token_1.getToken)(req);
            const user = yield (0, get_user_by_token_1.default)(token, res);
            if (user && "_id" in user) {
                try {
                    const contacts = yield Contact_1.default.find({ userId: user._id });
                    res.status(200).json({ contacts });
                    return;
                }
                catch (error) {
                    res.status(500).json({ message: "Erro ao buscar os contatos" });
                }
            }
            else {
                res.status(404).json({ message: "Usuário não encontrado" });
            }
        });
    }
    static deleteContactById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            if (!ObjectId.isValid(id)) {
                res.status(422).json({ message: "id invalido!" });
                return;
            }
            const contact = yield Contact_1.default.findOne({ _id: id });
            if (!contact) {
                res.status(404).json({ message: "contato nao encontrado!" });
                return;
            }
            const token = (0, get_token_1.getToken)(req);
            const user = yield (0, get_user_by_token_1.default)(token, res);
            if (contact.userId.toString() !== (user === null || user === void 0 ? void 0 : user._id.toString())) {
                res
                    .status(422)
                    .json({ message: "esse contato não pertence a esse usuario!" });
                return;
            }
            yield Contact_1.default.findByIdAndDelete(id);
            res.status(200).json({ message: "contato removido com sucesso!" });
        });
    }
}
exports.default = ContactController;
