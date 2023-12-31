/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import {
  adminLogin,
  getAllUser,
  changeStatus,
  getAllReportPost,
  blockPost,
  getAllNotifications,
  checkNewNotification,
  getUserChart
} from "../controllers/admin";
import {
  getFriendsAccount,
  getFollowingUser,
  getFollowersUser,
} from "../controllers/user";
import {
  getUserAllPost,
  getComment,
  getReplayComment,
  getOnePost,
  getUserAllShorts,
  getAllPosts,
} from "../controllers/post";
import { getAllVideo } from "../controllers/video";
import { Request, Response, NextFunction } from "express";

const router = Router();
const authMiddleware = require("../middleware/authMiddleware");

router.post("/login", adminLogin);

router.get("/getAllUser", authMiddleware, getAllUser);

router.get("/changeStatus/:status/:userId", authMiddleware, changeStatus);

router.get("/getAllReportPost", authMiddleware, getAllReportPost);

router.put("/blockPost/", authMiddleware, blockPost);

router.get("/getFriendsAccount/:userId", authMiddleware, getFriendsAccount);

router.get("/getUserAllPost/:userId", authMiddleware, getUserAllPost);

router.get("/getComment/:postId", authMiddleware, getComment);

router.get("/getReplayComment/:commentId", authMiddleware, getReplayComment);

router.get("/getOnePost/:postId", authMiddleware, getOnePost);

router.get("/getUserAllShorts/:userId", authMiddleware, getUserAllShorts);

router.get("/getFollowingUser/:userId", authMiddleware, getFollowingUser);

router.get("/getFollowersUser/:userId", authMiddleware, getFollowersUser);

router.get("/getAllNotifications", authMiddleware, getAllNotifications);

router.get("/checkNewNotification", authMiddleware, checkNewNotification);

router.get("/getAllPost", authMiddleware, getAllPosts);

router.get("/getAllVideo", authMiddleware, getAllVideo);

router.get("/getChart", authMiddleware,getUserChart)

router.use(function (req, res, next) {
  next(createError(404));
});

router.use(function (
  err: object,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(500).json(err);
});

module.exports = router;

function createError(arg0: number): any {
  throw new Error("Function not implemented.");
}
