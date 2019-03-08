const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');

const uri = "mongodb+srv://quang:Qt185475@checklistdb-pvvyv.mongodb.net/todolistdb?retryWrites=true";
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

router.post('/register', (req, res) =>{
  let userData = req.body;
  let user = new User(userData);

  user.save((error, registeredUser) => {
    if (error) {
      console.log('Save Error: ' + error);
    }
    else {
      res.status(200).send(registeredUser);
    }
  });
});

router.post('/login', (req, res) => {
  let userData = req.body;

  User.findOne({email: userData.email}, (error, user) =>{
    if (error){
      console.log(error);
    } else {
      if (!user){
        res.status(401).send('Invalid email');
      } else {
          if(user.password !== userData.password){
            res.status(401).send('Invalid password');
          } else {
            res.status(200).send(user);
          }
      }
    }
  });
});

router.get('/events', (req, res) => {
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

module.exports = router;
