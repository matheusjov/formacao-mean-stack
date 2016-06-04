(function(angular) {
  'use strict';

  angular.module('am').config(config);

  config.$inject = ['$routeProvider'];

  function config($routeProvider) {
    registerStudentRoute($routeProvider);
    registerUserRoute($routeProvider);
  }

  function registerStudentRoute($routeProvider) {
    $routeProvider
			.when('/students', {
				templateUrl: 'view/students.html',
				controller: 'StudentsCtrl',
				controllerAs: 'studentsCtrl'
			})
      .when('/student/new', {
				templateUrl: 'view/student.html',
				controller: 'StudentCtrl',
				controllerAs: 'studentCtrl'
			})
      .when('/student/:id/edit', {
				templateUrl: 'view/student.html',
				controller: 'StudentCtrl',
				controllerAs: 'studentCtrl'
			});
  }

  function registerUserRoute($routeProvider){
    $routeProvider
    .when('/users', {
      templateUrl: 'view/users.html',
      controller: 'UsersCtrl',
      controllerAs: 'usersCtrl'
    })
    .when('/user/new', {
      templateUrl: '/view/user.html',
      controller: 'UserCtrl',
      controllerAs: 'userCtrl'
    })
    .when('/user/:id/edit', {
      templateUrl: 'view/user.html',
      controller: 'UserCtrl',
      controllerAs: 'userCtrl'
    });
  }

})(angular);
