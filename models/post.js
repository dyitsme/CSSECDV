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
}

async function getAllPosts() {
  const [rows] = await db.query(`SELECT * FROM posts`);
  return rows;
}

async function getPostById(id) {
  const [result] = await db.query(`
  SELECT * FROM posts WHERE id = ?;
  `, [id])
  return result[0];
}

async function editPostById(title, content, img, docu, id) {
  const result = await db.query(`
  UPDATE posts
  SET title = ?,
  content = ?,
  img = ?,
  docu = ?
  WHERE id = ?;
  `, [title, content, img, docu, id])
  return result;
}

async function deletePostById(id) {
  const result = await db.query(`
  DELETE FROM posts WHERE id = ?;
  `, [id])
  return result;
}

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  editPostById,
  deletePostById
}