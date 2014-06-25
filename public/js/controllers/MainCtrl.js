angular.module('MainCtrl', []).controller('MainController', function($scope, $http, $location) {
	 // gets the top 5 sentences
   $http({method: 'POST', url: '/getRandomSentence'}).success(function (data){
   	$scope.sentence = data;
   	var totalVotes =$scope.sentence.senseVote +$scope.sentence.noSenseVote +$scope.sentence.notSureVote;
    if (totalVotes != 0){
    	$scope.sentence.percentage = (100/totalVotes) *$scope.sentence.noSenseVote;}
     else {
        $scope.sentence.percentage = 0;
     }
   });

   $scope.goToCreateSentence = function(){
    $location.path('/createSentence');
  }

});