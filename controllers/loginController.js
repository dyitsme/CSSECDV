const loginView = (req, res) => {
  res.render("login");
}

const registerView = (req, res) => {
  res.render("register")
}

module.exports = {
  registerView,
  loginView
}