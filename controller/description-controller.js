const { fetchDescription } = require("../model/description-model")

function getDescription(request, response, next){
    fetchDescription().then((data) => {
        const parsedData = JSON.parse([data])
        console.log({parsedData})
        response.status(200).send({parsedData})
    })
}


module.exports = { getDescription }