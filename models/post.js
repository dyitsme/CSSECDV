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

async function getAllPosts(userId) {
  // const [rows] = await db.query(`SELECT * FROM posts`);
  // return rows;
  const [result] = await db.query(`
    SELECT u.firstName, p.*, COUNT(pl.postId) AS total_likes, 
    EXISTS(SELECT * FROM post_likes pl WHERE pl.postId = p.id AND pl.userId = ?) AS isLiked
    FROM posts p
    LEFT JOIN users u ON p.userId = u.id
    LEFT JOIN post_likes pl ON p.id = pl.postId
    GROUP BY p.id;
  `, [userId]) 
  return result;
}

async function getPostById(id) {
  const [result] = await db.query(`
  SELECT * FROM posts WHERE id = ?;
  `, [id])
  return result[0];
}

async function getUserPostById(id, userId) {
  const [result] = await db.query(`
  SELECT * FROM posts WHERE id = ? AND userId = ?;
  `, [id, userId])
  return result[0];

}

async function editPostById(id, title, content, img, docu) {

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

async function likePost(userId, postId) {
  const result = await db.query(`
    INSERT INTO post_likes (userId, postId)
    VALUES (?, ?)
    `, [userId, postId]);
  return result;
}

async function unlikePost(userId, postId) {
  const result = await db.query(`
  DELETE FROM post_likes WHERE userId = ? AND postId = ?;
  `, [userId, postId])
  return result;
}

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  getUserPostById,
  editPostById,
  deletePostById,
  likePost,
  unlikePost
}