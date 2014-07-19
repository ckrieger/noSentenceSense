angular.module('TopFiveCtrl', []).controller('TopFiveController', function($scope, $http, $location) {

    // gets the top 5 sentences
    $http({
        method: 'POST',
        url: '/getTopFive'
    }).success(function(data) {
        var sentences = [];
        data.forEach(function(entry) {

            var totalVotes = entry.senseVote + entry.noSenseVote + entry.notSureVote;

            if (totalVotes != 0) {
                console.log("total" + totalVotes + "no" + entry.noSenseVote);
                entry.percentage = (100 / totalVotes) * entry.noSenseVote;
            } else {
                entry.percentage = 0;
            }

            console.log("percentage" + entry.percentage);
            sentences.push(entry)

        });

        $scope.sentences = sentences;
        $scope.sentence = $scope.sentences[0]
        $scope.currentSentenceId = 0;
    });

    $scope.nextSentence = function(){
      if($scope.currentSentenceId < 4 ){
      $scope.currentSentenceId = $scope.currentSentenceId + 1;
      } else if ($scope.currentSentenceId == 4){
        $scope.currentSentenceId = 0;
      }
      $scope.sentence = $scope.sentences[$scope.currentSentenceId];
       console.log($scope.currentSentenceId);
      console.log($scope.sentence);
    };

    $scope.previousSentence = function(){
      if($scope.currentSentenceId > 0 ){
      $scope.currentSentenceId = $scope.currentSentenceId - 1;
      } else if ($scope.currentSentenceId == 0){
        $scope.currentSentenceId = 4;
      }
      $scope.sentence = $scope.sentences[$scope.currentSentenceId];
       console.log($scope.currentSentenceId);
      console.log($scope.sentence);
    };

    $scope.vote = function(vote, id) {
        var data = {};
        data.vote = vote;
        data.id = id;
        $http({
            method: 'POST',
            url: '/vote',
            data: data
        });
        // berechnet die Prozente ohne neu zu laden
        $scope.sentences.forEach(function(entry) {
            if (entry._id == id) {
                if (vote == 0) {
                    entry.senseVote++;
                } else if (vote == 1) {
                    entry.notSureVote++
                } else if (vote == 2) {
                    entry.noSenseVote++
                }
                entry.percentage = (100 / (entry.senseVote + entry.noSenseVote + entry.notSureVote)) * entry.noSenseVote;
            }

        });
    };

    $scope.goToCreateSentence = function() {
        $location.path('/createSentence');
    }
});
