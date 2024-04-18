const express = require('express');
const { getTopics } = require("./controller/topics-controller")
const { getDescription } = require("./controller/description-controller")
const { getArticleById, getArticle, patchArticleById } = require("./controller/article-controller")
const {getCommentsByArticleId, postCommentByArticleId, deleteCommentById} = require("./controller/comments-controller")
const { getUsers } = require('./controller/users-controller')
const app = express();

app.use(express.json())

app.get("/api", getDescription);
app.get("/api/topics", getTopics);
app.get("/api/articles", getArticle)
app.get("/api/articles/:article_id", getArticleById);
app.get('/api/articles/:article_id/comments', getCommentsByArticleId)
app.post("/api/articles/:article_id/comments", postCommentByArticleId)
app.patch('/api/articles/:article_id', patchArticleById)
app.delete('/api/comments/:comment_id', deleteCommentById)
app.get("/api/users", getUsers)



app.use((err, request, response, next) => {
  if(err.code === '22P02'){
    response.status(400).send({msg: 'Bad request'})
  }
  next(err)
})
app.use((err, request, response, next) => {
  if(err.code === '23503'){
    response.status(404).send({msg: 'Author not found'})
  }
  next(err)
})


app.use((err, request, response, next) => {
    if(err.status && err.msg){
      response.status(err.status).send({msg: err.msg})
    }
    next(err)
  })


module.exports = app