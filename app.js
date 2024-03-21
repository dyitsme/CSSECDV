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
const https = require('https');
const fs = require ('fs');

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
  cookie: { maxAge: 60 * 1000 },
  saveUninitialized: true,
  resave: false,
  store: sessionStore
}));

app.use(flash());
app.use(express.static('public'));

const checkIdleTimeout = (req, res, next) => {
  const idleTimeout = 10 * 1000; // Idle timeout duration in milliseconds (e.g., 15 minutes)

  // Check if the user is authenticated and if the session has a lastActive timestamp
  if (req.session && req.session.user && req.session.lastActive) {
      const elapsedTime = Date.now() - req.session.lastActive;
      if (elapsedTime > idleTimeout) {
          // If user is inactive for more than the idle timeout period, destroy the session and logout the user
          req.session.destroy((err) => {
              if (err) {
                  console.error('Error destroying session:', err);
              }
              // Respond with a status indicating logout or redirect to the login page
              res.sendStatus(401); // Unauthorized status
          });
          return; // Exit middleware to prevent further processing
      } else {
          // Update the lastActive timestamp for the user's session
          req.session.lastActive = Date.now();
      }
  }
  next(); // Continue processing the request
};

// Apply the checkIdleTimeout middleware to relevant routes or all routes
app.use(checkIdleTimeout);

app.set('view engine', 'ejs');

const limiter = rateLimit({
	windowMs: 5 * 60 * 1000, // 1 minute
	max: 3, // Limit each IP to 3 requests per `window` (here, per 1 minute)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// authentication
app.post('/api/login', limiter, loginUser);

const httpsOptions = {
  key: fs.readFileSync(path.join(__dirname, 'ssl', 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'ssl', 'cert.pem')),
};

https.createServer(httpsOptions, app).listen(process.env.PORT || 3000, () => {
  console.log('Server started on port '+ process.env.PORT);
});

app.use('/', routes);