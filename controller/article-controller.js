const {fetchArticleById, fetchArticle} = require("../model/article.model")


function getArticleById(request, response, next){
    const { article_id } = request.params;
    fetchArticleById(article_id).then((article) => {
        response.status(200).send({article})
    }).catch((err) => {
        next(err)
    })
}

function getArticle(request, response, next){
    const { order } = request.query
    const isOrder = order.toUpperCase()
    console.log(isOrder)
    fetchArticle(isOrder).then((articles) => {
        response.status(200).send({articles})
    }).catch((err) => {
        next(err)
    })
}


module.exports = {getArticleById, getArticle};