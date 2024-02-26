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

async function getNonAdminUsers() {
  const [rows] = await db.query(`SELECT * FROM users WHERE isAdmin = 0`);
  return rows;
}

async function createUser(firstName, lastName, email, phone, password, img) {
  const result = await db.query(`
    INSERT INTO users (firstName, lastName, email, phone, password, img)
    VALUES (?, ?, ?, ?, ?, ?)
    `, [firstName, lastName, email, phone, password, img]);
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
  getNonAdminUsers,
  createUser,
  getUserByEmail
};