const express = require("express");
const mongoose = require("mongoose");
const colors = require("colors");
const cors = require("cors");
const connectDB = require("./src/config/connectDB");
const userRoutes = require("./src/routes/userRoute");

const PORT = process.env.PORT || 5000;
const app = express();

// User Middlewares
app.use(cors());
app.use(express.json());
mongoose.set("strictQuery", true);
connectDB();
colors.enable();

app.get("/", (req, res) => {
  res.send(
    "<h2 style='color:green;box-sizing:border-box; margin:0'>Server is Running!<h2>"
  );
});

// User Routes
app.use("/api", userRoutes);

// Listen Application
mongoose.connection.once("open", () => {
  console.log(
    colors.green.underline(`📗Connected`),
    colors.yellow.underline("to Server!")
  );
  app.listen(PORT, () => console.log(`Server running in port no : ${PORT}`));
});
mongoose.connection.on("error", (err) => {
  console.log(colors.red("📕", err));
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log"
  );
});
