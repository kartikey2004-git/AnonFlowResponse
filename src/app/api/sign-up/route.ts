import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";

import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

// next js mein routes /url automatically handled h
// and we named the function ki hum kis tarike ki req handle kr rhe hai

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, email, password } = await request.json();

    const existingUserVerifiedByUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingUserVerifiedByUsername) {
      return Response.json(
        {
          success: false,
          message: "Username exists already",
        },
        { status: 400 }
      );
    }

    const existingUserByEmail = await UserModel.findOne({ email });

    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    if (existingUserByEmail) {
      // true TODO Back here
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      const expiryDate = new Date();
      // new keyword ek naya instance create hota hai from current date

      // Date ek object mil rha hai,object memory ke andar ek reference point hai jo ki pura area h, uske andar values change hoti h

      expiryDate.setHours(expiryDate.getHours() + 1);

      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
        verifyCode,
        verifyCodeExpiry: expiryDate,
        isVerified: false,
        isAcceptingMessage: true,
        messages: [],
        // by default messages ka array empty hoga naye user ke liye
      });

      await newUser.save()
    }

    // send verification email to new user 
    const emailResponse = await sendVerificationEmail({
      email,
      username,
      verifyCode
    })


  } catch (error) {
    console.error("Error registering user", error);

    return Response.json(
      {
        success: false,
        message: "Error registering user",
      },
      {
        status: 500,
      }
    );
  }
}

// A 400 status code, also known as a "Bad Request" error, indicates that a server cannot process a request. This can happen when the server perceives the request to be a client error.

// A 500 error code, also known as an HTTP 500 Internal Server Error, is a generic error that indicates a problem with a website's server.