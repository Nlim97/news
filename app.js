const express = require('express');
const { getTopics } = require("./controller/topics-controller")
const app = express();

app.use(express.json())

app.get("/api/topics", getTopics);

app.use((err, request, response, next) => {
    if(err.status && err.msg){
      response.status(err.status).send({msg: err.msg})
    }
    next(err)
  })


module.exports = app