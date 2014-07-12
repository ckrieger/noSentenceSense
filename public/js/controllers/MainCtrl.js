angular.module('MainCtrl', []).controller('MainController', function($scope, $http, $location) {
	 
 

   $scope.goToCreateSentence = function(){
    $location.path('/createSentence');
  };

   $scope.goToTopFive = function(){
    $location.path('/topFive');
  };

  $scope.refresh = function(){
     $http({method: 'POST', url: '/getRandomSentence'}).success(function (data){
    $scope.sentence = data;
    console.log(data);
    var totalVotes =$scope.sentence.senseVote +$scope.sentence.noSenseVote +$scope.sentence.notSureVote;
    if (totalVotes != 0){
      $scope.sentence.percentage = (100/totalVotes) *$scope.sentence.noSenseVote;}
     else {
        $scope.sentence.percentage = 0;
     }
   });
  }

  $scope.goToHome = function(){
    $location.path('/')
  }

  $scope.vote = function(vote, id){
    var data = {};
    data.vote = vote;
    data.id = id;
    $http({method: 'POST', url: '/vote', data: data});
    // berechnet die Prozente ohne neu zu laden
    
      
        if(vote == 0){
          $scope.sentence.senseVote++;
        }
        else if(vote == 1){
          $scope.sentence.notSureVote++
        }else if(vote == 2){
          $scope.sentence.noSenseVote++
        }
        $scope.sentence.percentage = (100/($scope.sentence.senseVote + $scope.sentence.noSenseVote + $scope.sentence.notSureVote)) * $scope.sentence.noSenseVote;
      

    
}; 

});