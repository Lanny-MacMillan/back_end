const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Posts = require('./models/post.js')
require('dotenv').config()
const http = require("http");
const { Server } = require("socket.io");

const db = mongoose.connection;
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    // origin: "http://localhost:3002",
    // origin: "https://stark-crag-15310-backend.herokuapp.com/",
    origin: "https://mighty-tor-36415-frontend.herokuapp.com/",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(3001, () => {
  console.log("SERVER RUNNING");
});



//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3003;

//listeners
app.listen(PORT, ()=>{
    console.log('listening, what do you have?');
});



//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
// mongoose.connect(MONGODB_URI , { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
// );
mongoose.connect(MONGODB_URI, () => {
  console.log('connected to mongo')
});



// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

//mongoose
// mongoose.connect(MONGODB_URI, () => {
// })
mongoose.connection.once('open', ()=>{
    console.log('connected to mongod!');
});

//middleware
app.use(express.json()); //use .json(), not .urlencoded()
app.use(cors());

//routes
//========================= REDIRECT ========================================

// redirect for heroku route
app.get('/', (req, res) => {
  res.redirect('/posts')
})

//=========================== CREATE ========================================

app.post('/posts', (req, res)=>{
  Posts.create(req.body, (err, createdPosts
    )=>{
      res.json(createdPosts
        ); //.json() will send proper headers in response so client knows it's json coming back
  });
});

//============================ SHOW ========================================

app.get('/posts', (req, res)=>{
  Posts.find({}, (err, foundPosts)=>{
      res.json(foundPosts);
  });
});

//=========================== DELETE ========================================

app.delete('/posts/:id', (req, res)=>{
  Posts.findByIdAndRemove(req.params.id, (err, deletedPosts
    )=>{
      res.json(deletedPosts
        );
  });
});
//=========================== EDIT ========================================

app.put('/posts/:id', (req, res)=>{
  Posts.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedPosts
    )=>{
      res.json(updatedPosts
        );
  });
});

