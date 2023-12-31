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
exports.getUserChart = exports.checkNewNotification = exports.getAllNotifications = exports.blockPost = exports.getAllReportPost = exports.changeStatus = exports.getAllUser = exports.adminLogin = void 0;
const jws_1 = require("../utils/jws");
const userSchema_1 = __importDefault(require("../models/userSchema"));
const adminSchema_1 = __importDefault(require("../models/adminSchema"));
const photoSchema_1 = __importDefault(require("../models/photoSchema"));
const bcrypt = require("bcrypt");
const ReportSchema_1 = __importDefault(require("../models/ReportSchema"));
const mongoose_1 = __importDefault(require("mongoose"));
const adminLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let status = false;
    let message = "";
    let token = "";
    try {
        const { email, password } = req.body;
        const Admin = yield adminSchema_1.default.findOne({ email });
        if (Admin) {
            const passwordVerify = yield bcrypt.compare(password, Admin === null || Admin === void 0 ? void 0 : Admin.password);
            if (passwordVerify) {
                const getToken = yield (0, jws_1.generateToken)({ id: Admin === null || Admin === void 0 ? void 0 : Admin._id.toString() });
                status = true;
                token = getToken;
                res.status(200).send({ status, token });
            }
            else {
                message = "your password wrong";
                status = false;
                res.send({ status, message });
            }
        }
        else {
            message = "your Email wrong";
            status = false;
            res.send({ status, message });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.adminLogin = adminLogin;
const getAllUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Users = yield userSchema_1.default.find({ verified: true }).select('-password');
        res.send(Users);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllUser = getAllUser;
const changeStatus = (req, res, next) => {
    const { status, userId } = req.params;
    try {
        void userSchema_1.default
            .updateOne({ _id: userId }, {
            $set: {
                status: status,
            },
        })
            .then((date) => {
            res.status(200).send({ status: true });
        });
    }
    catch (error) {
        next(error);
    }
};
exports.changeStatus = changeStatus;
const getAllReportPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allPost = yield ReportSchema_1.default.find()
            .populate("PostId")
            .populate("userText.userId", { username: 1, name: 1, _id: 1, ProfileImg: 1 });
        res.status(200).send({ Status: true, Posts: allPost });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllReportPost = getAllReportPost;
const blockPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId, status } = req.body;
        yield photoSchema_1.default.findByIdAndUpdate({
            _id: new mongoose_1.default.Types.ObjectId(postId)
        }, {
            $set: {
                status: status,
            },
        });
        res.status(200).send({ Status: true });
    }
    catch (error) {
        next(error);
    }
});
exports.blockPost = blockPost;
const getAllNotifications = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const admin = yield adminSchema_1.default.find({ username: "admin" }).populate('notification.userId', { username: 1, name: 1, _id: 1, ProfileImg: 1 });
        if (admin) {
            yield adminSchema_1.default.updateOne({ username: "admin" }, { $set: {
                    read: false,
                } });
            res.status(200).send({ Status: true, admin: (_a = admin[0]) === null || _a === void 0 ? void 0 : _a.notification });
        }
        else {
            res.status(200).send({ Status: false });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.getAllNotifications = getAllNotifications;
const checkNewNotification = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admin = yield adminSchema_1.default.findOne({ read: false });
        if (admin) {
            return res.status(200).send({ status: true });
        }
        else {
            return res.status(200).send({ status: false });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.checkNewNotification = checkNewNotification;
const getUserChart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userCount = yield userSchema_1.default.find({ verified: true }).count();
        const postCount = yield photoSchema_1.default.find({ shorts: null }).count();
        const shortsCount = yield photoSchema_1.default.find({ shorts: { $ne: null } }).count();
        const userGraph = yield userSchema_1.default.aggregate([
            {
                $match: {
                    verified: {
                        $eq: true
                    }
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 }
            },
            {
                $limit: 7
            }
        ]);
        const postGraph = yield photoSchema_1.default.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 }
            },
            {
                $limit: 7
            }
        ]);
        return res.status(200).send({ status: true, userGraph, postGraph, userCount, postCount, shortsCount });
    }
    catch (error) {
        next(error);
    }
});
exports.getUserChart = getUserChart;
