var moment = require('moment');

var generateMessage = (from, text) => {
    return{
        from, 
        text,
        createdAt: moment().valueOf()
    };
};

var generateImageMessage = (from, imageName) => {
    return {
       from,
       image: `/home/infiny/${imageName}.jpg`,
       createdAt: moment().valueOf()
    };
 };  
 module.exports = {generateMessage, generateImageMessage};