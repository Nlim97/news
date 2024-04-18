const db = require("../db/connection");

function fetchArticleById(num){
    return db.query("SELECT * FROM articles WHERE article_id = $1", [num])
    .then((article) => {
        if(article.rows[0] === undefined){
            return Promise.reject({status: 404, msg: 'article does not exist'})
        }
        return article.rows[0]
    })
}

function fetchArticle(topic){
    let sqlString = `SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, 
    COUNT(comments.article_id) AS comment_count FROM articles
    LEFT JOIN comments ON comments.article_id = articles.article_id `
    if(topic){
        sqlString+= 'WHERE topic = $1 '
    }
    sqlString += `GROUP BY articles.article_id
    ORDER BY articles.created_at DESC`
    const topics = ['mitch', 'cats', 'paper']
    if(topic && !topics.includes(topic)){
        return Promise.reject({status:404, msg: 'not found'})
    }
    const params = topic ? [topic] : [];
    return db.query(sqlString,params)
    .then((articles) => { 
        return articles.rows
    })
}

function changeVotesInArticle(id, num){
    return db.query(`UPDATE articles SET votes = votes + $1 WHERE articles.article_id = $2 RETURNING *`, [num, id])
    .then((article) => {
        if(article.rows.length === 0){
            return Promise.reject({status: 404, msg: 'Article does not exist'})
        }
        return article.rows[0]
    })
}



module.exports = {fetchArticleById, fetchArticle, changeVotesInArticle}