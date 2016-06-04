(function(angular) {
  'use strict';

  angular.module('am').controller('UsersCtrl', controller);

  controller.$inject = ['UserService', '$location'];

  function controller(userService, $location) {
    var ctrl = this;

    ctrl.init = function() {
      userService.getAll()
        .then(function(res) {
          ctrl.users = res.data;
        })
        .catch(function(res) {
          console.log(res);
        });
    };

    ctrl.new = function() {
      $location.search({}).path('/user/new');
    };

    ctrl.edit = function(id) {
      $location.search({}).path('/user/' + id + '/edit');
    };

  }

})(angular);
