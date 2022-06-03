const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    name: String,
    body: String,
    img: String,
    tags: String,
    comments: Array,
    showEdit: false,
    showDelete: false,
    showComments: false
});

const Posts = mongoose.model('Post', postSchema);

module.exports = Posts;