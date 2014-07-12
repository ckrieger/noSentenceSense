angular.module('HeaderCtrl', []).controller('HeaderController', function($scope, $http, $location, $route) {


    $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };


});