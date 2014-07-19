angular.module('CarouselCtrl', ['ngAnimate']).controller('CarouselController', function($scope, $interval) {

 $interval(function(){
  $scope.selection = $scope.items[Math.floor(Math.random() * 3)]; 
 },5000);
 $scope.items = ['settings', 'home', 'other'];
 $scope.selection = $scope.items[0];

});