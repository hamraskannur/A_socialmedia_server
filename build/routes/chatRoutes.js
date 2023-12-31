"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chat_1 = require("../controllers/chat");
const router = (0, express_1.Router)();
const authMiddleware = require('../middleware/authMiddleware');
router.post("/createChat", authMiddleware, chat_1.createChat);
router.get("/:userId", authMiddleware, chat_1.getChat);
router.get("/chatFind/:firstId/:secondId", authMiddleware, chat_1.chatFind);
router.post("/addMessage", authMiddleware, chat_1.addMessage);
router.get("/getMessages/:chatId/:userId", authMiddleware, chat_1.getMessages);
router.get("/getCount/:id", authMiddleware, chat_1.getCount);
router.get("/viewMessage/:id", authMiddleware, chat_1.viewMessage);
router.use(function (req, res, next) {
    next(createError(404));
});
router.use(function (err, req, res, next) {
    res.status(500).json(err);
});
module.exports = router;
function createError(arg0) {
    throw new Error("Function not implemented.");
}
