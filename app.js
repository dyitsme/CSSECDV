require("dotenv").config();
const express = require("express");
const routes = require("./routes/routes");
const flash = require("express-flash");
const session = require("express-session");
const MySQLStore = require('express-mysql-session')(session);

const app = express();

const options = {
  host     : process.env.host,
  port     : process.env.dbport,
  user     : process.env.user,
  password : process.env.password,
  database : process.env.database
};

const sessionStore = new MySQLStore(options);

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: process.env.session_secret,
  cookie: { maxAge: 60000 },
  saveUninitialized: true,
  resave: false,
  store: sessionStore
}));

app.use(flash());

app.set("view engine", "ejs");

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started on port "+ process.env.PORT);
});

app.use("/", routes);