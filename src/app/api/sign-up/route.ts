import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";

import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

// next js mein routes /url automatically handled h
// and we named the function ki hum kis tarike ki req handle kr rhe hai

export async function POST(request: Request) {
  await dbConnect();

  try {
    // const {username,email,password} = await request.json()

  } catch (error) {
    console.error("Error registering user", error);

    return Response.json(
      {
        success: false,
        message: "Error registering user",
      },
      {
        status: 500,
        // A 500 error code, also known as an HTTP 500 Internal Server Error, is a generic error that indicates a problem with a website's server.
      }
    );
  }
}
