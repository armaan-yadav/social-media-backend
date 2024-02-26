import express from "express";
import mongoose from "mongoose";
import router from "./src/routes/user.route.js";
const app = express();
const port = 5000;


app.use(express.json());
app.use("/api/user", router);
// connecting databse with mongodb
mongoose
  .connect(
    `mongodb+srv://yadavarmaan10:kUmdqmlPyTuGEWiL@cluster0.a2hvycx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    app.listen(port, () => {
      console.log("Express app is running at port ", port);
    });
  })
  .catch((err) => {
    console.log("Could not connect with database , ERROR : ", err);
  });
