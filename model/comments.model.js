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

module.exports = {fetchCommentsByArticleID}