import mongoose, { Schema, Document } from "mongoose";


export  interface message extends Document{
     chatId:string
     senderId:String
     text:string
}

const messageSchema:Schema=new Schema({
 chatId:{
    type:String
 },
 senderId:{
    type:String
 },
 text:{
    type:String
 },
 seen:{
   type:Boolean,
   default: false

 }
},{
    timestamps:true
})

export default mongoose.model<message>("message",messageSchema );