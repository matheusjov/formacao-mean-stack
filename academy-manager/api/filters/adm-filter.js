'use strict';

var debug = require('../config/debug-config')('api:profile')
  , error = require('../models/error-model');

module.exports = function(req, res, next) {
  var user = req.user.profile;

  if(user == 'Administrator'){
    next();
  }else{
    next(new error.AuthorizationRequired(res));
  }

};
