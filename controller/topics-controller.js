const { fetchTopics } = require("../model/topics-model")


function getTopics(request, response, next){
    fetchTopics().then((topics) => {
        response.status(200).send( topics );
    })
};


module.exports = { getTopics };