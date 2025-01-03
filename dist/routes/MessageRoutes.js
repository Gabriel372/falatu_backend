"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MessageController_1 = __importDefault(require("../controllers/MessageController"));
const router = (0, express_1.Router)();
router.post("/create", MessageController_1.default.create);
router.post("/listmessages", MessageController_1.default.giveListMessage);
exports.default = router;
