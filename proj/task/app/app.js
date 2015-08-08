//Define an angular module for our app
var app = angular.module('myApp', ['ngRoute','textAngular']);

app.config(['$routeProvider',
  function ($routeProvider) {
        $routeProvider.
            when('/login', {
                title: 'Login',
                templateUrl: 'partials/login.html',
                controller: 'authCtrl'
            })
            .when('/creatUser', {
                title: 'creatUser',
                templateUrl: 'partials/creatUser.html',
                controller: 'checkAccessAdmin'
            })
            .when('/updateUser', {
                title: 'updateUser',
                templateUrl: 'partials/updateUser.html',
                controller: 'checkAccessAdmin'
            })
            .when('/dashboard', {
                title: 'Dashboard',
                templateUrl: 'partials/dashboard.html',
                controller: 'checkAccessAdmin'
            })
            .when('/task', {
                title: 'task',
                templateUrl: 'partials/task.html',
                controller: 'checkAccess'
            })
            .when('/openTask', {
                title: 'openTask',
                templateUrl: 'partials/openTask.html',
                controller: 'checkAccess'
            })
            .when('/', {
                title: 'Login',
                templateUrl: 'partials/login.html',
                controller: 'authCtrl'
            })
            .when('/creatTask', {
                title: 'creatTask',
                templateUrl: 'partials/creatTask.html',
                controller: 'checkAccessAdmin'
            })
            .when('/creatProject', {
                title: 'creatTask',
                templateUrl: 'partials/creatProject.html',
                controller: 'checkAccessAdmin'
            })
            .when('/updateTask', {
                title: 'updateTask',
                templateUrl: 'partials/updateTask.html',
                controller: 'checkAccessAdmin'
            })
            .otherwise({
                redirectTo: '/login',
                controller: 'authCtrl'
            });
  }]);




