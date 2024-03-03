const mysql = require("mysql2")

const db  = mysql.createPool({
  // connectionLimit : 10,
  host     : process.env.host,
  user     : process.env.user,
  password : process.env.password,
  database : process.env.database
}).promise();

async function createPost(userId, title, content, img, docu) {
  const result = await db.query(`
    INSERT INTO posts (userId, title, content, date, img, docu)
    VALUES (?, ?, ?, CURRENT_TIMESTAMP, ?, ?)
    `, [userId, title, content, img, docu]);
  return result;
};

module.exports = {
  createPost
}