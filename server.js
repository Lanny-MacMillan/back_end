const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const posts = require('./models/post.js')
require('dotenv').config()

const db = mongoose.connection;
const MONGODB_URI  = process.env.MONGODB_URI 
const app = express();

//listeners
app.listen(3000, ()=>{
    console.log('listening, what do you have?');
});

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

//mongoose
mongoose.connect(MONGODB_URI, () => {
})
mongoose.connection.once('open', ()=>{
    console.log('connected to mongod!');
});

//middleware
app.use(express.json()); //use .json(), not .urlencoded()
app.use(cors());

//routes

app.post('/posts', (req, res)=>{
  posts.create(req.body, (err, createdPosts
    )=>{
      res.json(createdPosts
        ); //.json() will send proper headers in response so client knows it's json coming back
  });
});

app.get('/posts', (req, res)=>{
  posts.find({}, (err, foundPosts)=>{
      res.json(foundPosts);
  });
});

app.delete('/posts/:id', (req, res)=>{
  posts.findByIdAndRemove(req.params.id, (err, deletedPosts
    )=>{
      res.json(deletedPosts
        );
  });
});

app.put('/posts/:id', (req, res)=>{
  posts.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedPosts
    )=>{
      res.json(updatedPosts
        );
  });
});