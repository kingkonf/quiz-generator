const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
require("dotenv").config()
const app = express();

// models whcih we use here
// const Username = require("./models/Username");
const quizmodel = require("./models/Quizmodel");

mongoose.connect(process.env.MONGODB_URI);


app.use(cors());

app.use(express.json());

// for username
// app.post("/username", (req,res)=>{
//     const {username} = req.body;
//     Username.create({
//            username: username 
//     })
//     .then(result => res.json({ status: "success", result: result }))
//     .catch(err => res.status(500).json({ status: 'error', message: err.message }));
// });


app.post('/users', (req, res) => {
    const { username, email, resultstatus, percentage, resulttype } = req.body;
  
    // Create a new user
    quizmodel.create({
      username,
      email,
      resultstatus,
      percentage,
      resulttype,
    
    })
    .then(result => {
      res.status(201).json({ status: "success", result: result });
    })
    .catch(err => {
      res.status(500).json({ status: 'error', message: err.message });
    });
  });

  app.get("/users", (req, res) => {
    quizmodel.find({})
        .then(function(users) {
            res.json(users);
        })
        .catch(function(err) {
            res.json(err);
        });
});




app.listen(3001, () => {
    console.log("server is running");
});

// Export the Express API
module.exports = app;