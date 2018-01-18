'use strict';

var app = angular.module('app', ['ngRoute']);
app.config(function ($routeProvider) {
    $routeProvider.
    when('/', {
        templateUrl: 'app/main/view/dashboard.html',
        controller: 'DashboardController'
    }).
    otherwise({
        redirectTo: '/'
    });
});
