const db = require("../db/connection");

function fetchArticle(num){
    return db.query("SELECT * FROM articles WHERE article_id = $1", [num])
    .then((article) => {
        if(article.rows[0] === undefined){
            return Promise.reject({status: 404, msg: 'article does not exist'})
        }
        return article.rows[0]
    })
}

module.exports = {fetchArticle}