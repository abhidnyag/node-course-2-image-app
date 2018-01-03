const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _= require('lodash');
const bcrypt = require('bcryptjs');


var  JWT_SECRET ='asddd89fjk5683es677434ds56tr';

var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        minlength: 1,
        trim: true,
        unique: true
    },
    email: {
      type: String,
      require: true,
      minlength: 1,
      trim: true,
      unique: true,
      validate: [{ validator: validator.isEmail, msg:'invalid email'}]
    },
    password: {
      type: String,
      require: true,
      minlength: 6
    }, 
    tokens: [{
      access: {
        type: String,
        required: true
      },
      token: {
        type: String,
        required: true
      }
    }]
  },{usePushEach: true});

  UserSchema.methods.toJSON = function(){
    var user = this;
    var userObject = user.toObject();
  
    return _.pick(userObject, ['_id', 'username', 'email']);
  };
  
  UserSchema.methods.generateAuthToken = function () {
    var user = this;
  var access = 'auth';
  
   var token = jwt.sign({_id: user._id.toHexString(), access}, process.env.JWT_SECRET).toString();
  
   user.tokens.push({access, token});
  
   return user.save().then(() => {
     return token;
   });
  };
  UserSchema.methods.removeToken = function(token){
    var user = this;
  
    return user.update({
      $pull: {
        tokens: {token}
      }
    });
  };
  
  UserSchema.statics.findByToken = function (token) {
    var User = this;
    var decoded;
  try{
    //console.log('decoded');
    decoded = jwt.verify(token, process.env.JWT_SECRET);
   } catch(e){
    return Promise.reject();
  }
  //console.log(token);
  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
  };

  UserSchema.pre('save', function(next){
    var user = this;
     if(  user.isModified('password')){
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
          user.password = hash;  
          next();
        });
       });
      }else {
        next();
      }
  }); 
   

var User = mongoose.model('User', UserSchema);

module.exports = {User}