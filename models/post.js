const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    body: String,
    tags: String,
});

const Posts = mongoose.model('Post', PostSchema);

module.exports = Posts;