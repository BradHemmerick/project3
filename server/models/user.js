const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken')
const config = require('../../config')

const UserSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  username: String,
  password: String,
  created: { type: Date, default: Date.now },
});

UserSchema.methods.toAuthJSON = function() {
  console.log('hello')
 const user = this
 return{
  //  username: user.username,
  //  email: user.email,
   token: user.generateJWT()
 }
}

UserSchema.methods.generateJWT = function(user) {
  return jwt.sign({
    id: this._id,
    username: this.username,
    email: this.email
  }, config.secret, {
    expiresIn: "1w"
  })
}

UserSchema.pre('save', function(next) {
  var user = this;

  if (!user.isModified('password')) return next();
  
  bcrypt.hash(user.password, null, null, function(err, hash) {
    if (err) return next(err);
    
    user.password = hash;
    next();
  });
});

UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);