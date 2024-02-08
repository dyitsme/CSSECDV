require("dotenv").config();
const express = require("express");
const routes = require("./routes/routes");
const flash = require("express-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser")
const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser(process.env.session_secret))
app.use(session({
  cookie: { maxAge: 60000 }
}));
app.use(flash());

app.set("view engine", "ejs");

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started on port "+ process.env.PORT);
});

app.use("/", routes);