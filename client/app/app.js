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
app.directive('dashboardHeader', function () {
    return {
        restrict: 'E', //This menas that it will be used as an element.
        templateUrl: "app/main/js/directives/header.html",
        controller: ['$scope', '$filter', function ($scope, $filter) {
            // Your behaviour goes here :)

            console.log("loading header !!!!");
        }]
    }                   
});
app.directive('dashboardFooter', function () {
    return {
        restrict: 'E', //This menas that it will be used as an element.
        templateUrl: "app/main/js/directives/footer.html",
        controller: ['$scope', '$filter', function ($scope, $filter) {
            // Your behaviour goes here :)

            console.log("loading footer !!!!");
        }]
    }                   
});