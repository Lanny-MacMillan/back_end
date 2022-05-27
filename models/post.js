const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    body: String,
    tags: Array,
});

const Posts = mongoose.model('Post', postSchema);

module.exports = Posts;