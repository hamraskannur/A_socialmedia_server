"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-var-requires */
const express_1 = __importDefault(require("express"));
const bodyParser = require('body-parser');
const CORS = require("cors");
const app = (0, express_1.default)();
const adminRouter = require("./routes/adminRoutes");
const userRouter = require("./routes/userRoutes");
const postRouter = require("./routes/postRoutes");
const chatRouter = require("./routes/chatRoutes");
const videoRouter = require("./routes/videoRoutes");
const cookieParser = require("cookie-parser");
const dbConnect = require("./config/connects");
app.use(express_1.default.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(CORS({
    origin: "http://localhost:4200",
    // origin: "https://locomate-frontend.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS"],
    credentials: true,
    exposedHeaders: ["Content-Length", "X-Foo", "X-Bar"],
}));
dbConnect;
app.use("/", userRouter);
app.use("/admin", adminRouter);
app.use("/post", postRouter);
app.use("/chat", chatRouter);
app.use("/video", videoRouter);
const port = 3008;
app.listen(port, () => {
    console.log(`connected port ${port}`);
});
