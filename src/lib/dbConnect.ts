import mongoose from "mongoose";

// ki database connection ke baad jo object aa rha hai usme se kya value chahiye and uska datatype kya h


type ConnectionObject = {
  // optional return hota hai iska
  // hum connect string bhi return mein le skte h
  isConnected?: number
}

const connection : ConnectionObject = {}

// database humesha dusre continent mein hota hai and database connection mein time lgta hai and failed bhi hoskta hai

// return mein promise milega 
// void for ki humein farak nhi padta ki kis tarike ka data return aa rha hai

// URI stands for Uniform Resource Identifier. It's a string that identifies a resource, such as a document, photo, or binary data. URIs are used to identify resources on the internet or a private intranet. 

// we have to study about the options in mongoose dbConnect


async function dbConnect(): Promise<void>{
  if(connection.isConnected){
    console.log("Already connected to database");
    return
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URL || '')
    // console.log(db);

    connection.isConnected = db.connections[0].readyState
    // console.log(db.connections);
    

    console.log("DB connected successfully");
    
  } catch (error) {
    // exit the process gracefully because db is not connected
    console.log("Database connection failed",error);
    process.exit(1)
  }
}

export default dbConnect