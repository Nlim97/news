const db = require('../db/connection')

function fetchCommentsByArticleID(id){
    return db.query(`SELECT comments.comment_id, comments.votes, comments.created_at, comments.author, comments.body, comments.article_id
    FROM comments WHERE article_id = $1 ORDER BY comments.created_at ASC`, [id]).then(({rows}) => {
        if(rows.length === 0){
            return Promise.reject({status:404, msg: 'Article does not exist'})
        }
        return rows
    })
}

function createCommentByArticleId(id, obj){
    const { username, body} = obj
    const created_at = new Date()
    return db.query(`INSERT INTO comments 
    (body, votes, author, article_id, created_at)
    VALUES 
    ($1, $2, $3, $4, $5) 
    RETURNING body, votes, author, article_id, created_at;`, [body, 0, username, id, created_at])
    .then((comment) => {
        return comment.rows[0]
    })
}


module.exports = {fetchCommentsByArticleID, createCommentByArticleId}