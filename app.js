require('dotenv').config();
const express = require('express');
const routes = require('./routes/routes');
const flash = require('express-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const rateLimit = require('express-rate-limit');
const { loginUser } = require('./controllers/loginController');
const path = require('path');
const nocache = require("nocache");

const app = express();

// parse from FE to BE
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(nocache());

const options = {
  host     : process.env.host,
  port     : process.env.dbport,
  user     : process.env.user,
  password : process.env.password,
  database : process.env.database
};

const sessionStore = new MySQLStore(options);

app.use("/postUploads", express.static(path.join(__dirname, "public/postUploads")));
app.use("/profileUploads", express.static(path.join(__dirname, "public/profileUploads")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: process.env.session_secret,
  cookie: { maxAge: 60 * 60 * 1000 },
  saveUninitialized: true,
  resave: false,
  store: sessionStore
}));

app.use(flash());

app.set('view engine', 'ejs');

const limiter = rateLimit({
	windowMs: 5 * 60 * 1000, // 1 minute
	max: 3, // Limit each IP to 3 requests per `window` (here, per 1 minute)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.post('/api/login', limiter, loginUser);

app.listen(process.env.PORT || 3000, () => {
  console.log('Server started on port '+ process.env.PORT);
});

app.use('/', routes);