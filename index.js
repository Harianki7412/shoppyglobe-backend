import mongoose from "mongoose";
import app from "./app.js";



const PORT = 5000;

mongoose
  .connect("mongodb+srv://hariomverma00004:JPC9mTuDjTcIqGeT@cluster0.zs8svy1.mongodb.net/")
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });