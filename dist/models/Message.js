"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const conn_1 = __importDefault(require("../db/conn"));
const { Schema } = conn_1.default;
const Message = conn_1.default.model("Message", new Schema({
    from: {
        type: String,
        required: true,
    },
    to: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    _id: {
        type: String,
        required: true,
    },
}, { timestamps: true }));
exports.default = Message;
