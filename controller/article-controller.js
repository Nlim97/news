const {fetchArticle} = require("../model/article.model")


function getArticle(request, response, next){
    const { article_id } = request.params;
    fetchArticle(article_id).then((article) => {
        response.status(200).send({article})
    }).catch((err) => {
        next(err)
    })
}


module.exports = {getArticle};