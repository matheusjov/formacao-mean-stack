(function(angular){

  angular.module('am').controller('UserCtrl', controller);

  controller.$inject = ['UserService', '$location', '$routeParams', '$mdToast', 'MessageService'];

  function controller(userService, $location, $routeParams, $mdToast, messageService){
    var ctrl = this;

    ctrl.init = function() {
      ctrl.user = {};
      ctrl.user.profile = 'User';

      var id = $routeParams.id;
      if(id) {
        userService.getById(id)
        .then(function(res) {
          console.log(res);
          ctrl.user = res.data;
        })
        .catch(function(res) {
          messageService.showError(res.messages);
        });
      }
    };

    ctrl.save = function(user) {
      userService.save(user)
      .then(function(res) {
        messageService.showSuccess(res.messages);
        user._id = res.data;
        $location.search({}).path('/user/' + user._id + '/edit');
      })
      .catch(function(res) {
        messageService.showError(res.messages);
      });
    };

    ctrl.remove = function(id) {
      userService.remove(id)
      .then(function(res) {
        messageService.showSuccess(res.messages);
        ctrl.user = {};
        $location.search({}).path('/user/new');
      })
      .catch(function(res) {
        messageService.showError(res.messages);
      });
    };

    ctrl.cancel = function() {
      $location.search({}).path('/users');
    };

    ctrl.new = function() {
      $location.search({}).path('/user/new');
    };


  }
})(angular);
