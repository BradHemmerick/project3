const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    title: String,
    url: String,
    description: String
}, {timestamps: true});

module.exports = mongoose.model('post', postSchema);