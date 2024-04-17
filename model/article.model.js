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

function fetchArticle(order){
    return db.query(`SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, 
    COUNT(comments.article_id) AS comment_count FROM articles
    LEFT JOIN comments ON comments.article_id =  articles.article_id
    GROUP BY articles.article_id
    ORDER BY articles.created_at ${order}`)
    .then((articles) => {
        return articles.rows
    })
}


module.exports = {fetchArticleById, fetchArticle}