'use strict';

var app = angular.module('app', ['ngRoute','ngMaterial','ngMessages']);
app.config(function ($routeProvider) {
    $routeProvider.
    when('/', {
        templateUrl: 'app/main/view/dashboard.html',
        controller: 'DashboardController'
    }).
    when('/apps', {
        templateUrl: 'app/main/dashboard/apps/apps.html',
        controller: 'AppsController'
    }).
    when('/media', {
        templateUrl: 'app/main/dashboard/media/media.html',
        controller: 'MediaController'
    }).
    when('/settings', {
        templateUrl: 'app/main/dashboard/settings/settings.html',
        controller: 'SettingsController'
    }).
    when('/settings/system', {
        templateUrl: 'app/main/dashboard/settings/system/system.html',
        controller: 'SystemController'
    }).
    when('/settings/update', {
        templateUrl: 'app/main/dashboard/settings/update/update.html',
        controller: 'UpdateController'
    }).
    when('/settings/bluetooth', {
        templateUrl: 'app/main/dashboard/settings/bluetooth/bluetooth.html',
        controller: 'BluetoothController'
    }).
    when('/settings/wifi', {
        templateUrl: 'app/main/dashboard/settings/wifi/wifi.html',
        controller: 'WifiController'
    }).
    otherwise({
        redirectTo: '/'
    });
});