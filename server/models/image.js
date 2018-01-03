var mongoose = require('mongoose');

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
      type: Date,
      default: Date.now
    }
    
    /* ,
   _creator: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    } */
});

module.exports = {Image};