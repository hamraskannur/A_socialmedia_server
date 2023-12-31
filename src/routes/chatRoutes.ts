import { Router } from 'express'
import { createChat, getChat, chatFind, addMessage, getMessages, getCount, viewMessage } from '../controllers/chat'
const router = Router()
const authMiddleware = require('../middleware/authMiddleware')
import { Request, Response, NextFunction } from "express";


router.post("/createChat", authMiddleware, createChat);

router.get("/:userId", authMiddleware, getChat);

router.get("/chatFind/:firstId/:secondId", authMiddleware, chatFind);

router.post("/addMessage", authMiddleware, addMessage);

router.get("/getMessages/:chatId/:userId", authMiddleware, getMessages);

router.get("/getCount/:id",authMiddleware, getCount);

router.get("/viewMessage/:id",authMiddleware, viewMessage);


router.use(function (req, res, next) {
    next(createError(404));
  });
  
  router.use(function (err:object, req:Request, res:Response, next:NextFunction) {
    res.status(500).json(err);
  });
  
  
module.exports = router
    
  function createError(arg0: number): any {
    throw new Error("Function not implemented.");
  }