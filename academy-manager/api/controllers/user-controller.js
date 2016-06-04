'use strict';

var User = require('../models/user-model')
  , success = require('../models/success-response-model')
  , ctrl = {};

ctrl.getProfile = function(req, res, next) {
  let _user = req.user;
  delete _user.password;
  new success.FindOne(_user).send(req, res);
};

ctrl.findAll = function(req, res, next) {
  User.findAll(req.user)
    .then(function(users) {
      new success.FindMany(users).send(req, res);
    })
    .catch(function(err) {
      next(err);
    });
};

ctrl.findById = function(req, res, next) {
  User.findById(req.params.id)
    .then(function(user) {
      new success.FindOne(user).send(req, res);
    })
    .catch(function(err) {
      next(err);
    });
};

ctrl.save = function(req, res, next) {
  User.save(req.body)
    .then(function(user) {
      new success.Inserted(user._id).send(req, res);
    })
    .catch(function(err) {
      next(err);
    });
};

ctrl.update = function(req, res, next) {
  var user = req.body;
  user._id = req.params.id;

  User.update(user)
    .then(function(data) {
      new success.Updated(user._id).send(req, res);
    })
    .catch(function(err) {
      next(err);
    });
};

ctrl.remove = function(req, res, next) {
  User.remove(req.params.id)
    .then(function(data) {
      new success.Removed().send(req, res);
    })
    .catch(function(err) {
      next(err);
    });
};

module.exports = ctrl;
