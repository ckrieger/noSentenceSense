angular.module('MainService', []).factory('Main', ['$http', function($http) {
	return{
		getSentence: function(){

		}
	},
		setSentence: function(sentence){
			  $http({method: 'POST', url: '/sentence', data: sentence}).
    success(function(data, status, headers, config) {
      // this callback will be called asynchronously
      // when the response is available
    }).
    error(function(data, status, headers, config) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });

		}

	

}]);