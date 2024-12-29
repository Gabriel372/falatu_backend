"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ContactController_1 = __importDefault(require("../controllers/ContactController"));
const router = (0, express_1.Router)();
router.post("/create", ContactController_1.default.create);
router.get("/allusercontacts", ContactController_1.default.getAllUserContacts);
router.delete("/:id", ContactController_1.default.deleteContactById);
exports.default = router;
