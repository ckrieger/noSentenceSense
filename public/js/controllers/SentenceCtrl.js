angular.module('SentenceCtrl', []).controller('SentenceController', function($scope, $http, $location) {
  
  
   $scope.saveSentence = function(){
 	
 		var data = {
 			sentence : $scope.sentence,
 			user : $scope.user ,
 			mail : $scope.mail
 		};
 	
 		$http({method: 'POST', url: '/createSentence', data: data});
      
 			$location.path('/');
 	    
 	}	
});