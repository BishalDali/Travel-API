import { connect, set } from "mongoose";
require("dotenv").config();
export const Connection = async () => {
  try {
    if (!process.env.MONGO_URL) {
      throw new Error("No Information to connect to database");
    }
    await connect(process.env.MONGO_URL);
    set("strictQuery", false);
    console.log("Database Connected Succesfully");
  } catch (error: unknown) {
    console.log("Connection error: ", error);
  }
};