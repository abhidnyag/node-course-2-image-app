var mongoose = require('mongoose');
var dataFormat = require('dateformat');
var now = new Date();
var Image = mongoose.model('Image', {
   from: {
        type: String,
        required: true
    }, 
    text: {
      type: String,
      required: true,
      minlength: 1,
      trim: true
    },
    createdAt: {
      type: String,
      default: dataFormat(now,"ddd, mmm dS, yyyy, h:MM:ss TT")
    },
    image: {

    }
    /* ,
   _creator: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    } */
});

module.exports = {Image};