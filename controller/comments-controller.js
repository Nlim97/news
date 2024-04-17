const {fetchCommentsByArticleID, createCommentByArticleId} = require('../model/comments.model')

function getCommentsByArticleId(request, response, next){
    const articleId = request.params.article_id
    fetchCommentsByArticleID(articleId).then((comments) => {
        response.status(200).send(comments)
    }).catch((err) => {
        next(err)
    })
}

function postCommentByArticleId(request, response, next){
    const { article_id } = request.params
    const comment = request.body
    return createCommentByArticleId(article_id, comment).then((newComment) => {
        response.status(201).send({newComment})
    }).catch((err) => {
        next(err)
    })
}

module.exports = {getCommentsByArticleId, postCommentByArticleId}