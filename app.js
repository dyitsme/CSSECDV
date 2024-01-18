require("dotenv").config();
const express = require("express");
const routes = require("./routes/routes");
const app = express();

app.set("view engine", "ejs");

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started on port "+ process.env.PORT);
});

app.use("/", routes)