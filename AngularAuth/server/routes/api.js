const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const Todo = require('../models/todo');

const uri = "mongodb+srv://quang:jtP6TSLDrc6faVh2@checklistdb-pvvyv.mongodb.net/todolistdb?retryWrites=true";

mongoose.connect(uri, {useNewUrlParser: true}, (error) => {
  if (error){
    console.log('Error Connecting: ' + error);
  } else {
    console.log('Connected to mongodb');
  }
});

router.get('/', (req, res) => {
  res.send('From API route');
});

function verifyToken(req, res, next){
  if (!req.headers.authorization){
    return res.status(401).send('Unauthorized request');
  }
  let token = req.headers.authorization.split(' ')[1];
  if (token == 'null'){
    return res.status(401).send('Unauthorized request');
  }
  let payload = jwt.verify(token, 'secretKey');
  if (!payload){
    return res.status(401).send('Unauthorized request');
  }

  req.userId = payload.subject;
  next();
}

router.post('/register', (req, res) =>{
  let userData = req.body;
  let user = new User(userData);

  user.save((error, registeredUser) => {
    if (error) {
      console.log('Save Error: ' + error);
    }
    else {
      let payload = {subject: registeredUser._id };
      let token = jwt.sign(payload, 'secretKey');
      res.status(200).send({ token });
    }
  });
});

router.post('/login', (req, res) => {
  let userData = req.body;

  User.findOne({username: userData.username}, (error, user) =>{
    if (error){
      console.log(error);
    } else {
      if (!user){
        res.status(401).send('Invalid username');
      } else {
          if(user.password !== userData.password){
            res.status(401).send('Invalid password');
          } else {
            let payload = { subject: user._id };
            let token = jwt.sign(payload, 'secretKey');
            res.status(200).send({ username: user.username, token });
          }
      }
    }
  });
});

router.get('/events', verifyToken, (req, res) => {
  let events = [
    {
      "_id": "1",
      "name": "Auto Expo",
      "description": "lorem ipsum"
    },
    {
      "_id": "2",
      "name": "Water Park",
      "description": "wet wet"
    }
  ]

  res.json(events);
});

// ==== TESTING API FOR TODO COLLECTION ====
router.get('/:user', (req, res) => {
  //QUERYING IS DIFFERENT
  var query  = Todo.where({ user: req.params.user }); // <-- Use the correct param name

  query.find(function (err, userInfo) {
        if (err){
          res.status(401).send('User not found: ' + err);
        } else {
          res.json(userInfo);
        }
  });
});

module.exports = router;
