import { NextFunction, Request, Response } from "express";
import chatCollection from "../models/chatSchema";
import messageCollection from "../models/messageSchema";

export const createChat = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const chat = await chatCollection.findOne({
      members: [req.body.senderId, req.body.receiverId],
    });

    if (!chat) {
      const newChat = new chatCollection({
        members: [req.body.senderId, req.body.receiverId],
      });

      const result = await newChat.save();
      return res.status(200).json(result);
    }
    res.status(200).json("ok");
  } catch (error) {
    next(error);
  }
};

export const getChat = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const chat = await chatCollection.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    next(error);
  }
};

export const chatFind = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const chat = await chatCollection.findOne({
      members: { $all: [req.params.firstId, req.params.secondId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    next(error);
  }
};

export const addMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { chatId, senderId, text } = req.body;

  const message = new messageCollection({
    chatId,
    senderId,
    text,
  });

  try {
    const result = await message.save();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { chatId, userId } = req.params;
  try {
    const result = await messageCollection.find({ chatId });

    const query = { chatId, senderId: userId };
    const update = { $set: { seen: true } };
    await messageCollection.updateMany(query, update);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getCount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const messageCount = await messageCollection.countDocuments({senderId: id,seen:false});
      
    res.status(200).json(messageCount);
  } catch (error) {
    next(error);
  }
};

export const viewMessage=async(  req: Request,
  res: Response,
  next: NextFunction)=>{
    const { id } = req.params;
    try {
      const updateMessage = await messageCollection.updateOne(
        { _id: id },
        {
            $set: {
                seen: true
            }
        }
    );

    if (updateMessage.modifiedCount === 1) {
      res.status(200).json("Message seen status updated successfully.")
    } else {
      res.status(200).json("No matching document found for update.")
    }
    } catch (error) {
      next(error);
    }
}
