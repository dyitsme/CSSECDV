const mysql = require("mysql2")

const db  = mysql.createPool({
  connectionLimit : 10,
  host     : process.env.host,
  user     : process.env.user,
  password : process.env.password,
  database : process.env.database
});
