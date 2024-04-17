const {fetchCommentsByArticleID} = require('../model/comments.model')

function getCommentsByArticleId(request, response, next){
    const articleId = request.params.article_id
    fetchCommentsByArticleID(articleId).then((comments) => {
        response.status(200).send(comments)
    }).catch((err) => {
        next(err)
    })
}


module.exports = {getCommentsByArticleId}