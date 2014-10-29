angular.module('HeaderCtrl', []).controller('HeaderController', function($scope, $http, $location, $route) {


    $scope.isActive = function (viewLocation) { 
    	var s = $location.path();
    	
        return s.indexOf(viewLocation) > -1;
    };

   

});