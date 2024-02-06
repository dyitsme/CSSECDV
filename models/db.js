const mysql = require("mysql2")

const db  = mysql.createPool({
  // connectionLimit : 10,
  host     : process.env.host,
  user     : process.env.user,
  password : process.env.password,
  database : process.env.database
}).promise();

async function getAllUsers() {
  const [rows] = await db.query(`SELECT * FROM users`);
  return rows;
};

async function createUser(firstName, lastName, email, phone, password) {
  const result = await db.query(`
    INSERT INTO users (firstName, lastName, email, phone, password)
    VALUES (?, ?, ?, ?, ?)
    `, [firstName, lastName, email, phone, password]);
  return result;

};

async function getUserByEmail(email) {
  const [result] = await db.query(`
    SELECT * FROM cssecdv.users
    WHERE email = ?
  `, [email])
  return result[0];  
};

module.exports = {
  getAllUsers,
  createUser,
  getUserByEmail
};