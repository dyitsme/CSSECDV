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
}

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

}

async function getUserByEmail(email) {
  const [result] = await db.query(`
    SELECT * FROM cssecdv.users
    WHERE email = ?
  `, [email])
  return result[0];  
}

async function deleteUserById(id) {
  const result = await db.query(`
  DELETE FROM users WHERE id = ?;
  `, [id])
  return result;
}

async function getUserById(id) {
  const [result] = await db.query(`
    SELECT * FROM cssecdv.users
    WHERE id = ?
  `, [id])
  return result[0];  
}

async function deactivateUserById(id) {
  const result = await db.query(`
  UPDATE users
  SET status = 'deactivated'
  WHERE id = ?;
  `, [id])
  return result;
}

async function activateUserById(id) {
  const result = await db.query(`
  UPDATE users
  SET status = 'activated'
  WHERE id = ?;
  `, [id])
  return result;
}

module.exports = {
  getAllUsers,
  createUser,
  getUserByEmail,
  deleteUserById,
  getNonAdminUsers,
  getUserById,
  deactivateUserById,
  activateUserById
};