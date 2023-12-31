"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = require("express");
const admin_1 = require("../controllers/admin");
const user_1 = require("../controllers/user");
const post_1 = require("../controllers/post");
const video_1 = require("../controllers/video");
const router = (0, express_1.Router)();
const authMiddleware = require("../middleware/authMiddleware");
router.post("/login", admin_1.adminLogin);
router.get("/getAllUser", authMiddleware, admin_1.getAllUser);
router.get("/changeStatus/:status/:userId", authMiddleware, admin_1.changeStatus);
router.get("/getAllReportPost", authMiddleware, admin_1.getAllReportPost);
router.put("/blockPost/", authMiddleware, admin_1.blockPost);
router.get("/getFriendsAccount/:userId", authMiddleware, user_1.getFriendsAccount);
router.get("/getUserAllPost/:userId", authMiddleware, post_1.getUserAllPost);
router.get("/getComment/:postId", authMiddleware, post_1.getComment);
router.get("/getReplayComment/:commentId", authMiddleware, post_1.getReplayComment);
router.get("/getOnePost/:postId", authMiddleware, post_1.getOnePost);
router.get("/getUserAllShorts/:userId", authMiddleware, post_1.getUserAllShorts);
router.get("/getFollowingUser/:userId", authMiddleware, user_1.getFollowingUser);
router.get("/getFollowersUser/:userId", authMiddleware, user_1.getFollowersUser);
router.get("/getAllNotifications", authMiddleware, admin_1.getAllNotifications);
router.get("/checkNewNotification", authMiddleware, admin_1.checkNewNotification);
router.get("/getAllPost", authMiddleware, post_1.getAllPosts);
router.get("/getAllVideo", authMiddleware, video_1.getAllVideo);
router.get("/getChart", authMiddleware, admin_1.getUserChart);
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
