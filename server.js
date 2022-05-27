const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

app.listen(3000, ()=>{
    console.log('listening, what do you have?');
});

mongoose.connect('mongodb://localhost:27017/chatcrud')
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