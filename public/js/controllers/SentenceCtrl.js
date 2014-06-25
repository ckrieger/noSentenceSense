angular.module('SentenceCtrl', []).controller('SentenceController', function($scope, $http) {
   console.log('im controlleR');
   $http({method: 'POST', url: '/getTopFive'}).success(function data){
   $scope.sentences = data;   
   });

});