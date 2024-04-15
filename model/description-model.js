const fs =  require("node:fs/promises");

const fetchDescription = () => {
    return fs.readFile('./endpoints.json', 'utf-8', (err, data) => {
        if(err){
            console.log(err)
            return;
        }else{
            return data
        }
    })
};

module.exports = { fetchDescription };