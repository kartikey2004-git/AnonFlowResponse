// mongoose ek orm hai for connection between mongodb
//  interface datatype for defining the type of data

import mongoose, { Schema, Document } from "mongoose";

// saara schema jayega toh database mein hi, toh database mein mongoose ke document hi banenge isse

export interface Message extends Document{
  content: string;
  createdAt: Date;
}

// type safety introduce by typescript

const MessageSchema: Schema<Message> = new Schema({
  content: {
    type: String,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});


export interface User extends Document{
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  // for veryfying the user
  verifyCodeExpiry: Date;
  isVerified: boolean;
  isAcceptingMessage: boolean;
  // user ke har message ka pura ek document banega
  messages: Message[]
}


const UserSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: [true,"Username is required"],
    trim: true,
    unique : true
  },
  email: {
    type: String,
    required: [true,"Email is required"],
    unique: true,
    // for checking of email by match operator in regex
    match: [/.+\@.+\..+/,'please use a valid email address']
  },
  password:{
    type: String,
    required: [true , "Password is required"],
  },
  verifyCode:{
    type: String,
    required: [true , "Verify code is required"],
  },
  verifyCodeExpiry:{
    type: Date,
    required: [true , "Verify code expiry is required"],
  },
  isVerified:{
    type: Boolean,
    default: false
  },
  isAcceptingMessage:{
    type: Boolean,
    default: true
  },
  messages: [MessageSchema]
});

//Note: next js mein edge time cheezein run ho rhi hai , lekin jab hum pura dedicated backend banate hai express wagerah ko use krke , toh usme server bn gaya hai and wo har samay chalta hi rehta hai always kyuki ek baar intialisation hogya hai


// type safety mein kya hai jo return datatype aane wala  hai , wo jo mongoose ka model tye User hona chahiye

const UserModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>("User",UserSchema))

export default UserModel