angular.module('UserCtrl', []).controller('UserController', function($scope, $interval, $route, $http, $modal) {


  
   $scope.init = function(){console.log("params" + $route.current.params.user); $http({
        method: 'POST',
        url: '/getSentenceByUser',
        data: $route.current.params
    }).success(function(data) {
        var sentences = [];
        data.forEach(function(entry) {

            var totalVotes = entry.senseVote + entry.noSenseVote;

            if (totalVotes != 0) {
              
                entry.percentage = (100 / totalVotes) * entry.noSenseVote;
            } else {
                entry.percentage = 0;
            }

            console.log(entry.user);
            sentences.push(entry)

        });

        $scope.sentences = sentences;
        $scope.sentence = $scope.sentences[0]
        $scope.currentSentenceId = 0;
        if ($scope.sentences.length == 1)
        {
            $scope.Disable = true;
        } 
        else
        {
            $scope.Disable = false;
        }
    });
  };

    $scope.nextSentence = function(){
      if($scope.currentSentenceId < ($scope.sentences.length -1 )){
      $scope.currentSentenceId = $scope.currentSentenceId + 1;
      } else if ($scope.currentSentenceId == ($scope.sentences.length -1)){
        $scope.currentSentenceId = 0;
      }
      $scope.sentence = $scope.sentences[$scope.currentSentenceId];
      
    };

    $scope.previousSentence = function(){
      if($scope.currentSentenceId > 0 ){
      $scope.currentSentenceId = $scope.currentSentenceId - 1;
      } else if ($scope.currentSentenceId == 0){
        $scope.currentSentenceId = ($scope.sentences.length -1 );
      }
      $scope.sentence = $scope.sentences[$scope.currentSentenceId];
      
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
                } else if (vote == 2) {
                    entry.noSenseVote++
                }
                entry.percentage = (100 / (entry.senseVote + entry.noSenseVote )) * entry.noSenseVote;
            }

        });
    };

    $scope.goToCreateSentence = function() {
        $location.path('/createSentence');
    }
    
    $scope.openShare = function(size) {
       
      
        $scope.itemsShare = $scope.sentence._id;
        console.log($scope.itemsShare);
        var modalInstance = $modal.open({
            templateUrl: 'shareModalContent.html',
            controller: function($scope, $modalInstance, $templateCache, $http, itemsShare) {
                $scope.itemsShare = itemsShare
                $scope.shareLink = "http://no-sentence-sense.herokuapp.com/home/" + itemsShare ;
                $scope.ok = function() {
                    return "http://no-sentence-sense.herokuapp.com/home/" + itemsShare;
                };

                $scope.cancel = function() {
                    $modalInstance.dismiss('cancel');
                };
            },
            size: size,
            resolve: {
                itemsShare: function() {
                    return $scope.itemsShare;
                }
            }
        });
    };

});