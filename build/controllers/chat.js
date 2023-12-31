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
exports.viewMessage = exports.getCount = exports.getMessages = exports.addMessage = exports.chatFind = exports.getChat = exports.createChat = void 0;
const chatSchema_1 = __importDefault(require("../models/chatSchema"));
const messageSchema_1 = __importDefault(require("../models/messageSchema"));
const createChat = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chat = yield chatSchema_1.default.findOne({
            members: [req.body.senderId, req.body.receiverId],
        });
        if (!chat) {
            const newChat = new chatSchema_1.default({
                members: [req.body.senderId, req.body.receiverId],
            });
            const result = yield newChat.save();
            return res.status(200).json(result);
        }
        res.status(200).json("ok");
    }
    catch (error) {
        next(error);
    }
});
exports.createChat = createChat;
const getChat = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chat = yield chatSchema_1.default.find({
            members: { $in: [req.params.userId] },
        });
        res.status(200).json(chat);
    }
    catch (error) {
        next(error);
    }
});
exports.getChat = getChat;
const chatFind = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chat = yield chatSchema_1.default.findOne({
            members: { $all: [req.params.firstId, req.params.secondId] },
        });
        res.status(200).json(chat);
    }
    catch (error) {
        next(error);
    }
});
exports.chatFind = chatFind;
const addMessage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { chatId, senderId, text } = req.body;
    const message = new messageSchema_1.default({
        chatId,
        senderId,
        text,
    });
    try {
        const result = yield message.save();
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});
exports.addMessage = addMessage;
const getMessages = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { chatId, userId } = req.params;
    try {
        const result = yield messageSchema_1.default.find({ chatId });
        const query = { chatId, senderId: userId };
        const update = { $set: { seen: true } };
        yield messageSchema_1.default.updateMany(query, update);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});
exports.getMessages = getMessages;
const getCount = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const messageCount = yield messageSchema_1.default.countDocuments({ senderId: id, seen: false });
        res.status(200).json(messageCount);
    }
    catch (error) {
        next(error);
    }
});
exports.getCount = getCount;
const viewMessage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const updateMessage = yield messageSchema_1.default.updateOne({ _id: id }, {
            $set: {
                seen: true
            }
        });
        if (updateMessage.modifiedCount === 1) {
            res.status(200).json("Message seen status updated successfully.");
        }
        else {
            res.status(200).json("No matching document found for update.");
        }
    }
    catch (error) {
        next(error);
    }
});
exports.viewMessage = viewMessage;
