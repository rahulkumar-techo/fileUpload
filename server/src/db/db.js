import mongoose from "mongoose";

const db = async () => {
  try {
    const connected = await mongoose.connect(
      `mongodb+srv://mernme:${process.env.MONGODB_PASSWORD}@cluster1.fe0jso1.mongodb.net/upload?retryWrites=true&w=majority`
    );

    console.log(
      `Data base is connected successfully ${connected.connection.host}`
    );
  } catch (error) {
    console.log(`data base is not able to connect ${error}`);
  }
};

export default db;
