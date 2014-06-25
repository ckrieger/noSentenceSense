angular.module('MainCtrl', []).controller('MainController', function($scope, $http) {

   // gets the top 5 sentences
   $http({method: 'POST', url: '/getTopFive'}).success(function (data){
   	var sentences = [];
   	data.forEach(function(entry){
    	sentences.push(entry)
      console.log(entry);
   	});

   	$scope.sentences = sentences;
  });

	$scope.vote = function(vote, id){
    var data = {};
    data.vote = vote;
    data.id = id;
		$http({method: 'POST', url: '/vote', data: data});
	}; 
/* $scope.saveSentence = function(){
 	console.log($scope.search);
 	var data = {
 		sentence : $scope.search 
 	};
 	
 	$http({method: 'POST', url: '/sentence', data: data});
 }	*/


 
 	 
   

   
 

});