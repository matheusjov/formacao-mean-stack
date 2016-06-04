'use strict';

var express = require('express')
  , route = express.Router()
  , ctrl = require('../controllers/user-controller')
  , admFilter = require('../filters/adm-filter');

route.get('/user/profile', ctrl.getProfile);
route.get('/users', admFilter, ctrl.findAll);
route.get('/users/:id', admFilter, ctrl.findById);
route.post('/users', admFilter, ctrl.save);
route.put('/users/:id', admFilter, ctrl.update);
route.delete('/users/:id', admFilter, ctrl.remove);

module.exports = route;
