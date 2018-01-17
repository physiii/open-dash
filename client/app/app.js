'use strict';

angular.module('actifioApp', ['ngRoute']).config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl : 'app/main/view/dashboard.html',
            controller : 'Dashboardcontroller'
        }).otherwise({
            redirectTo : '/'
        });
    }]);

