const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const post = require('../models/post');
const config = require('../../config')
const User = mongoose.model("User");
const loginRequired = require('./auth')
// console.log(loginRequired)
const db = config.database;

mongoose.Promise = global.Promise;
mongoose.connect(db, function(err) {
    if(err) {
        console.log('Connection error');
    }
});

router.get('/posts', function(req, res) {
    console.log('Requesting posts');
    post.find({})
        .populate({
            path: "owner", 
            select: "username"
        })
        .sort({createdAt: -1})
        .exec(function(err, posts) {
            if (err) {
                console.log('Error getting the posts');
            } else {
                res.json(posts);
            }
        });
});

router.get('/details/:id', function(req, res) {
    console.log('Requesting post');
    post.findById(req.params.id)
        .exec(function(err, post) {
            if (err) {
                console.log('Error getting the post');
            } else {
                res.json(post);
            }
        });
});

router.post('/posts', loginRequired, function(req, res) {
    console.log('Posting a post');
    User.findOne({_id: req.payload.id},(err, user) => {
        if(err || !user){
            return res.status(404).json({
                message: "user not found"
            })
        }
        var newPost = new post();
        newPost.title = req.body.title;
        newPost.url = req.body.url;
        newPost.description = req.body.description;
        newPost.owner = user._id
        newPost.save(function(err, addedPost) {
            if (err) {
                console.log('Error inserting the post');
            } else {
                res.json(addedPost);
            }
        });
    });
});


module.exports = router;