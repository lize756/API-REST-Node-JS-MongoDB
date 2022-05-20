const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const userRoutes = require("./routes/user");
const vehicleRoutes = require("./routes/vehicle");

const app = express();
const port = process.env.PORT || 9000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", userRoutes);
app.use("/api", vehicleRoutes);

//routes
app.get("/", (req, res) => {
  res.send("welcome to my API");
});

//mongoDB  connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected MongoDB Atlas"))
  .catch((error) => console.error(error));

app.listen(port, () => console.log("server listening on port", port));
