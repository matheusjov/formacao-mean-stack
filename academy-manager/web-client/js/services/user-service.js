(function(angular) {
  'use strict';

  angular.module('am').factory('UserService', factory);

  factory.$inject = ['$q', '$http', 'api', '$cookies'];

  function factory($q, $http, api, $cookies) {
    var svc = {}
    , TAG_USER = 'USER';

    function defaultRequestCallback(request, resolve, reject) {
      request
      .success(function(resp) {
        resolve(resp);
      })
      .error(function(resp) {
        reject(resp);
      });
    };

    svc.getAll = function() {
      return $q(function(resolve, reject) {
        var request = $http.get(api.users);
        defaultRequestCallback(request, resolve, reject);
      });
    };

    function generateCredentials(user) {
      return btoa(user.name + ':' + user.password);
    }

    svc.getById = function(id) {
      return $q(function(resolve, reject) {
        $http.get(api.users + id)
        .success(function(resp) {
          resolve(resp);
        })
        .error(function(resp) {
          reject(resp);
        });
      });
    };

    svc.save = function(user) {
      return $q(function(resolve, reject) {
        var request = null;

        if(user._id) {
          request = $http.put(api.users + user._id, user);
        } else {
          request = $http.post(api.users, user);
        }

        defaultRequestCallback(request, resolve, reject);
      });
    };

    svc.remove = function(id) {
      return $q(function(resolve, reject) {
        var request = $http.delete(api.users + id);
        defaultRequestCallback(request, resolve, reject);
      });
    };

    svc.login = function(user) {
      return $q(function(resolve, reject) {
        var _options = {
          headers: {
            Authorization: 'Basic ' + generateCredentials(user)
          }
        };

        $http.get(api.userProfile, _options)
        .success(function(resp) {
          $cookies.putObject(TAG_USER, resp.data);
          resolve(resp.data);
        })
        .error(function(resp) {
          reject();
        });
      });
    };

    svc.clearCredentials = function() {
      $cookies.remove(TAG_USER);
    };

    svc.getUser = function() {
      var _user = $cookies.getObject(TAG_USER);
      _user.isAdm = function(){
        return this.profile == 'Administrator';
      };
      return _user;
    };

    return svc;
  }

})(angular);
