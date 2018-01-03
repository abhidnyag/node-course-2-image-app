const path = require('path');
const http = require('http');
const _=require('lodash');
var fs = require('fs');
var Grid = require("gridfs-stream");

const express = require('express');
const bodyParser = require('body-parser');

const {ObjectID} = require('mongodb');
var {mongoose} = require('./db/mongoose');
var {User} = require('./models/user');
var {Image} = require('./models/image');
var {authenticate} = require('./middleware/authenticate');

const socketIO = require('socket.io');
const publicPath = path.join(__dirname, '../public');
const {generateMessage, generateImageMessage} = require('./utils/image');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');



var app = express();
var server = http.createServer(app);
var io = socketIO(server);
const port = 3000;
var users = new Users();
app.set('view engine', 'ejs');

app.use(express.static(publicPath));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    fs.readFile("public/index.html", function (error, pgResp) {
             if (error) {
                 res.writeHead(404);
                 res.write('Contents you are looking are Not Found');
             } else {
                 res.writeHead(200, { 'Content-Type': 'text/html' });
                 res.write(pgResp);
             }
              
             res.end();
         });
 });
 app.get('/users/:id', (req, res) => {
   User.find().then((data) => {
    res.render('users/list', {data:data}); 
   
   }, (e) => {
     res.status(400).send(e);
   });
 });
 
 
 app.post('/users', function(req, res) {
  
  const user = new User({
     username:req.body.username,
     email:req.body.email,
     password:req.body.password
  });
  user
     .save()
     .then(result =>{
         console.log(result);
     })
     .catch(err => console.log(err));
     var id = req.body._id;
     res.redirect('/images/' +id);
    /*  res.render('users/success', {user:user}); */
    // var id = req.body._id;
    // res.redirect('/users/' + id); 
    //  res.status(201).json({
    //      message: 'Handling POST request to /page',
    //      createdBook : user
    //  });
     
 });
 app.get('/images/:id', (req,res) => {
    Image.find().then((data) => {
        res.render('images/image', {data:data}); 
    }, (e) =>{
    res.status(400).send(e);
    });
 });
 
 app.post('/images', (req, res) => {
    //console.log(req.body);
  
    var image = new Image({
        from: req.body.from,
        text: req.body.text,
        createdAt: req.body.createdAt
    });
    
    image
    .save()
    .then(doc=> {
        console.log(doc);
    }) 
    .catch(err => console.log(err));
    res.render('images/success', {image:image});
    });
 
io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('join', (params, callback) => {
        if(!isRealString(params.username) || !isRealString(params.password)){
          return callback('Name and password name are required.');
       
       }
       if(users.addUser(socket.id, params.username, params.email, params.password) == false ) {
        return callback('Username Already exists');
       }
      
       socket.join();
       users.removeUser(socket.id);
       users.addUser(socket.id, params.username, params.email, params.password);
       io.emit('updateUserList', users.getUserList());
       callback();
    });
    
});



app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports =  {app};
