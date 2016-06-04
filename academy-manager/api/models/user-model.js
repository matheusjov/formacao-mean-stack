'use strict';

var mongoose = require('mongoose')
  , error = require('./error-model')
  , schema = new mongoose.Schema({
      name: { type: mongoose.Schema.Types.String, required: true, trim: true },
      password: { type: mongoose.Schema.Types.String, required: true, trim: true },
      profile: { type: mongoose.Schema.Types.String, enum: ['Administrator', 'User'], default: 'User' },
      email: { type: mongoose.Schema.Types.String, required: true, trim: true, unique: true },
      active: { type: mongoose.Schema.Types.Boolean, default: true }
    })
  , User = mongoose.model('User', schema);

module.exports.authenticate = function authenticate(name, password) {
  return new Promise(function(resolve, reject) {
    let _query = {
      name: name
    , password: password
    };

    User.findOne(_query, function(err, user) {
      if(err) {
        reject(err);
      } else {
        if(user) {
          resolve(user);
        } else {
          reject(err);
        }
      }
    });

  });
};

/**
 * Find all active users
 * @return {Promise}
 */
module.exports.findAll = function findAll(user) {

  return new Promise(function(resolve, reject) {
    var query = { _id: {$ne: user._id} };

    User.find(query, function(err, data) {
      if(err) {
        reject(new error.MongooseError(err));
      } else {
        resolve(data);
      }
    });
  });
};

/**
 * Find User by _ID
 * @param  {String} userId [required] ObjectId
 * @return {Promise}
 */
module.exports.findById = function findById(userId) {
  return new Promise(function(resolve, reject) {
    let query = { _id: userId};

    User.findOne(query, function(err, data) {
      if(err) {
        reject(new error.MongooseError(err));
      } else {
        resolve(data);
      }
    });
  });
};

/**
 * Insert User
 * @param  {User} user [required]
 * @return {Promise}
 */
module.exports.save = function save(user) {
  return new Promise(function(resolve, reject) {
    new User(user).save(function(err, data) {
      if(err) {
        reject(new error.MongooseError(err));
      } else {
        resolve(data);
      }
    });
  });
};

/**
 * Modify User
 * @param  {User} user [required]
 * @return {Promise}
 */
module.exports.update = function update(user) {
  return new Promise(function(resolve, reject) {
    let query = { _id : user._id };

    User.update(query, user, function(err, data) {
      if(err) {
        reject(new error.MongooseError(err));
      } else {
        resolve(data);
      }
    });
  });
};

/**
 * Inactivate User by _ID
 * @param  {String} userId [required] ObjectId
 * @return {Promise}
 */
module.exports.remove = function remove(userId) {
  return new Promise(function(resolve, reject) {
    let query = { _id : userId }
      , mod = { active: false };

    User.update(query, mod, function(err, data) {
      if(err) {
        reject(new error.MongooseError(err));
      } else {
        resolve(data);
      }
    });
  });
};
