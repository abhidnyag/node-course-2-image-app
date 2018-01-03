var {User} = require('./../models/user');

var authenticate = (req, res, next) => {

    var username = req.body('username');
       User.findByToken(username).then((user) => {
       
        if(!user){
           return Promise.reject();
      }
  
      req.user = user;
      req.username = username;

      next();

       }).catch((e) => {
      
            res.status(401).send();
       });
  };

  module.exports = {authenticate};