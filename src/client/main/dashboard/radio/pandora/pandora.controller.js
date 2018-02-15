var app = angular.module('app');

app.controller('PandoraController', function($scope,$location,$mdDialog){
    $scope.back=function(){
        $location.path('radio');
    }

    $scope.vm = {
        formData: {
            email: 'hello@patternry.com',
            password: 'foobar'
        }
    };
    $scope.cancel = function() {
        $mdDialog.cancel();
    };

    $scope.answer = function() {
        $mdDialog.hide();
    };




});