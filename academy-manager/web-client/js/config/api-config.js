(function(angular) {
  'use strict';

  var BASE_API_PATH = 'http://localhost:3000/api/v1/'
    , api = {
        userProfile: buildResourceUri('user/profile')
      , students: buildResourceUri('students')
      , users: buildResourceUri('users')
      };

  function buildResourceUri(name) {
    return BASE_API_PATH + name + '/';
  }

  angular.module('am').constant('api', api);

})(angular);
