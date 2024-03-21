const isAuthenticated = (req, res, next) => {
  if (req.session && !req.session.user) {
    // Session has expired
    // Redirect or render a page with a message indicating session expiry
    res.render("expired");
  } else if (req.session && req.session.user) {
    next()
  } else {
    // res.status(400).json({ message: "No credentials provided" });
    console.log("message: No credentials provided");
    res.redirect("/login");
  }
};

const isAuthenticatedAdmin = (req, res, next) => {
  if (req.session && !req.session.user) {
    // Session has expired
    // Redirect or render a page with a message indicating session expiry
    res.render("expired");
  } else if (req.session && req.session.user) {
    if (req.session.user.isAdmin) {
      if (req.session.user.isAdmin == 1) {
        next()
      }
    }
    else {
      console.log("message: Not an admin");
      res.redirect("/");
    }
  } else {
    // res.status(400).json({ message: "No credentials provided" });
    console.log("message: No credentials provided");
    res.redirect("/login")
  }
}

const isNotAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
    res.redirect("/");
  } else {
    next();
  }
}

const isSessionExpired = (req, res) => {
  if (!req.session.user) {
    // Session has expired
    // Redirect or render a page with a message indicating session expiry
    res.render("expired");
  }
}


module.exports = {
  isAuthenticated,
  isAuthenticatedAdmin,
  isNotAuthenticated
};