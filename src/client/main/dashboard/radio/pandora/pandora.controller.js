var app = angular.module('app');

app.controller('PandoraController', function($scope,$location){
    $scope.back=function(){
        $location.path('radio');
    }

    $scope.vm = {
        formData: {
            email: 'hello@patternry.com',
            password: 'foobar'
        }
    };
});