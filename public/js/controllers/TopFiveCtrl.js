angular.module('TopFiveCtrl', []).controller('TopFiveController', function($scope, $http, $location) {

   // gets the top 5 sentences
   $http({method: 'POST', url: '/getTopFive'}).success(function (data){
   	var sentences = [];
   	data.forEach(function(entry){

      var totalVotes = entry.senseVote + entry.noSenseVote + entry.notSureVote;
      
      if (totalVotes != 0){
        console.log("total" + totalVotes + "no" + entry.noSenseVote);
      entry.percentage = (100/totalVotes) * entry.noSenseVote;}
      else{
        entry.percentage = 0;
      }
      
      console.log("percentage" + entry.percentage);
    	sentences.push(entry)
      
   	});

   	$scope.sentences = sentences;
  });

	$scope.vote = function(vote, id){
    var data = {};
    data.vote = vote;
    data.id = id;
		$http({method: 'POST', url: '/vote', data: data});
    // berechnet die Prozente ohne neu zu laden
    $scope.sentences.forEach(function(entry){
      if(entry._id == id){
        if(vote == 0){
          entry.senseVote++;
        }
        else if(vote == 1){
          entry.notSureVote++
        }else if(vote == 2){
          entry.noSenseVote++
        }
        entry.percentage = (100/(entry.senseVote + entry.noSenseVote + entry.notSureVote)) * entry.noSenseVote;
      }

    }); 
}; 

  $scope.goToCreateSentence = function(){
    $location.path('/createSentence');
  }
});