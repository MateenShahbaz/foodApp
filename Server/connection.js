import mongoose from "mongoose";

export const connectDB = () => {
  mongoose.connect("mongodb://localhost:27017", {
    dbName: "yourFood",
  })
  .then((e)=> console.log(`DB connect to ${e.connection.host}`))
  .catch((e)=> console.log(e))
};
