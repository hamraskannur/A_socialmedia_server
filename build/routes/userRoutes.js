"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = require("express");
const user_1 = require("../controllers/user");
const router = (0, express_1.Router)();
const authMiddleware = require("../middleware/authMiddleware");
router.post("/register", user_1.postSignup);
router.get("/verifyRegistration/:id/:token", user_1.verify);
router.post("/login", user_1.userLogin);
router.post("/googleLogin", user_1.googleLogin);
router.get("/getMyProfile", authMiddleware, user_1.getUserData);
router.get("/getMyPost", authMiddleware, user_1.getMyPost);
router.get("/getFriendsAccount/:userId", authMiddleware, user_1.getFriendsAccount);
router.get("/getUserData", authMiddleware, user_1.getUserData);
router.put("/updateUserData", authMiddleware, user_1.updateUserData);
router.put("/followUser", authMiddleware, user_1.followUser);
router.get("/getAllRequest", authMiddleware, user_1.getAllRequest);
router.put("/acceptRequest", authMiddleware, user_1.acceptRequest);
router.delete("/deleteRequests/:deleteId", authMiddleware, user_1.deleteRequests);
router.get('/getFollowingUser/:userId', authMiddleware, user_1.getFollowingUser);
router.get('/getFollowersUser/:userId', authMiddleware, user_1.getFollowersUser);
router.put('/changeToPrivate', authMiddleware, user_1.changeToPrivate);
router.post('/searchUser', authMiddleware, user_1.searchUser);
router.get('/getAllNotifications', authMiddleware, user_1.getAllNotifications);
router.get('/suggestionUsers', authMiddleware, user_1.suggestionUsers);
// router.use(function (req, res, next) {
//   next(createError(404));
// });
// router.use(function (err:object, req:Request, res:Response, next:NextFunction) {
//   res.status(500).json(err);
// });
module.exports = router;
// function createError(arg0: number): any {
//   throw new Error("Function not implemented.");
// }
