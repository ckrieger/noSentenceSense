angular.module('MainCtrl', ['ui.bootstrap']).controller('MainController', function($scope, $http, $location, $modal, $route ,$log, $templateCache) {



    $scope.goToCreateSentence = function() {
        $location.path('/createSentence');
    };

    $scope.goToTopFive = function() {
        $location.path('/topFive');
    };

     $scope.refreshButton = function() {
        
      $http({
            method: 'POST',
            url: '/getRandomSentence'
        }).success(function(data) {
            $scope.sentence = data;
            $location.path('/home/' +data._id);
            
            var totalVotes = $scope.sentence.senseVote + $scope.sentence.noSenseVote + $scope.sentence.notSureVote;
            if (totalVotes != 0) {
                $scope.sentence.percentage = (100 / totalVotes) * $scope.sentence.noSenseVote;
            } else {
                $scope.sentence.percentage = 0;
            }
        });
      
    }

    $scope.refresh = function() {
        
        if ($route.current.params.sentenceId != undefined ) {
    
            $http({
                method: 'POST',
                url: '/getSentenceById',
                data: $route.current.params
            }).success(function(back) {
                $scope.sentence = back[0];
        
                var totalVotes = $scope.sentence.senseVote + $scope.sentence.noSenseVote + $scope.sentence.notSureVote;
                if (totalVotes != 0) {
                    $scope.sentence.percentage = (100 / totalVotes) * $scope.sentence.noSenseVote;
                } else {
                    $scope.sentence.percentage = 0;
                }
            });

        }
        else {
          
        $http({
            method: 'POST',
            url: '/getRandomSentence'
        }).success(function(data) {
           
            $scope.sentence = data;
            $location.path('/home/' +data._id);
            var totalVotes = $scope.sentence.senseVote + $scope.sentence.noSenseVote + $scope.sentence.notSureVote;
            if (totalVotes != 0) {
                $scope.sentence.percentage = (100 / totalVotes) * $scope.sentence.noSenseVote;
            } else {
                $scope.sentence.percentage = 0;
            }
        });
      }
    }

    $scope.refreshTopFive = function() {
        
        if ($route.current.params.sentenceId != undefined ) {
    
            $http({
                method: 'POST',
                url: '/getSentenceById',
                data: $route.current.params
            }).success(function(back) {
                $scope.sentence = back[0];
        
                var totalVotes = $scope.sentence.senseVote + $scope.sentence.noSenseVote + $scope.sentence.notSureVote;
                if (totalVotes != 0) {
                    $scope.sentence.percentage = (100 / totalVotes) * $scope.sentence.noSenseVote;
                } else {
                    $scope.sentence.percentage = 0;
                }
            });

        }
        else {
          
        $http({
            method: 'POST',
            url: '/getRandomSentence'
        }).success(function(data) {
           
            $scope.sentence = data;
            $location.path('/topFive/' +data._id);
            var totalVotes = $scope.sentence.senseVote + $scope.sentence.noSenseVote + $scope.sentence.notSureVote;
            if (totalVotes != 0) {
                $scope.sentence.percentage = (100 / totalVotes) * $scope.sentence.noSenseVote;
            } else {
                $scope.sentence.percentage = 0;
            }
        });
      }
    }

    $scope.goToHome = function() {
        $location.path('/')
    }

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


        if (vote == 0) {
            $scope.sentence.senseVote++;
        } else if (vote == 1) {
            $scope.sentence.notSureVote++
        } else if (vote == 2) {
            $scope.sentence.noSenseVote++
        }
        $scope.sentence.percentage = (100 / ($scope.sentence.senseVote + $scope.sentence.noSenseVote + $scope.sentence.notSureVote)) * $scope.sentence.noSenseVote;
    };

 $scope.openShare = function(size) {

        var modalInstance = $modal.open({
            templateUrl: 'shareModalContent.html',
            controller: function($scope, $modalInstance, $templateCache, $http, itemsShare) {
                $scope.shareLink = "http://no-sentence-sense.herokuapp.com/" + $location.url();
                $scope.ok = function() {
                    /*$modalInstance.close($http({
                        method: 'POST',
                        url: '/hh',
                        data: 
                    }));*/
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

$scope.showSentenceByUser = function(user){
   $location.path('/user/' + user);
}

});
