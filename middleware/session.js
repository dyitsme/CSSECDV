const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    // res.status(400).json({ message: "No credentials provided" });
    console.log("message: No credentials provided");
    res.redirect("/login");
  }
};

const isNotAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
    res.redirect("/");
  } else {
    next();
  }
}

module.exports = {
  isAuthenticated,
  isNotAuthenticated
};