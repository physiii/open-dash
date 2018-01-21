'use strict';

var app = angular.module('app', ['ngRoute','ngMaterial','ngMessages']);
app.config(function ($routeProvider) {
    $routeProvider.
    when('/', {
        templateUrl: 'src/app/main/view/dashboard.html',
        controller: 'DashboardController'
    }).
    when('/apps', {
        templateUrl: 'src/app/main/dashboard/apps/apps.html',
        controller: 'AppsController'
    }).
    when('/media', {
        templateUrl: 'src/app/main/dashboard/media/media.html',
        controller: 'MediaController'
    }).
    when('/settings', {
        templateUrl: 'src/app/main/dashboard/settings/settings.html',
        controller: 'SettingsController'
    }).
    when('/settings/system', {
        templateUrl: 'src/app/main/dashboard/settings/system/system.html',
        controller: 'SystemController'
    }).
    when('/settings/update', {
        templateUrl: 'src/app/main/dashboard/settings/update/update.html',
        controller: 'UpdateController'
    }).
    when('/settings/bluetooth', {
        templateUrl: 'src/app/main/dashboard/settings/bluetooth/bluetooth.html',
        controller: 'BluetoothController'
    }).
    when('/settings/wifi', {
        templateUrl: 'src/app/main/dashboard/settings/wifi/wifi.html',
        controller: 'WifiController'
    }).
    otherwise({
        redirectTo: '/'
    });
}).run(['$rootScope','$location',function ($rootScope,$location) {
    $rootScope.$on('$routeChangeSuccess',function () {
        if($location.path() == '/'){
            $rootScope.mainPage = true;
        }else{
            $rootScope.mainPage = false;
        }

    })

}]);