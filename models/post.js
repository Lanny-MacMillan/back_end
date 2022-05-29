const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    body: String,
    img: String,
    tags: String,
});

const Posts = mongoose.model('Post', postSchema);

module.exports = Posts;