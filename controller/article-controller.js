const {fetchArticleById, fetchArticle, changeVotesInArticle} = require("../model/article.model")


function getArticleById(request, response, next){
    const { article_id } = request.params;
    fetchArticleById(article_id).then((article) => {
        response.status(200).send({article})
    }).catch((err) => {
        next(err)
    })
}

function getArticle(request, response, next){
    const { topic } = request.query
    fetchArticle(topic).then((articles) => {
        response.status(200).send(articles)
    }).catch((err) => {
        next(err)
    })
    
}

function patchArticleById(request, response, next){
    const { article_id } = request.params
    const { inc_votes } = request.body
    changeVotesInArticle(article_id, inc_votes).then((article) => {
        response.status(200).send({article})
    }).catch((err) => {
        next(err)
    })
}


module.exports = {getArticleById, getArticle, patchArticleById};