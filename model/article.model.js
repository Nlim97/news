const db = require("../db/connection");

function fetchArticleById(num){
    return db.query(`SELECT articles.*, COUNT(comments.article_id) AS comment_count 
    FROM articles 
    LEFT JOIN comments ON comments.article_id = articles.article_id 
    WHERE articles.article_id = $1 
    GROUP BY articles.article_id`, [num])
    .then((article) => {
        if(article.rows[0] === undefined){
            return Promise.reject({status: 404, msg: 'article does not exist'})
        }
        return article.rows[0]
    })
}

function fetchArticle(order='desc',sort_by='created_at', topic){
    let sqlString = `SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, 
    COUNT(comments.article_id) AS comment_count FROM articles
    LEFT JOIN comments ON comments.article_id = articles.article_id `
    if(topic){
        sqlString+= 'WHERE topic = $1 '
    }
    sqlString += `GROUP BY articles.article_id
    ORDER BY articles.${sort_by} ${order.toUpperCase()}`
    console.log(sqlString)
    const topics = ['mitch', 'cats', 'paper']
    if(topic && !topics.includes(topic)){
        return Promise.reject({status:404, msg: 'not found'})
    }
    const orderBy = ['desc', 'asc']
    if(!orderBy.includes(order)){
        return Promise.reject({status:400, msg: 'Bad request'})
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