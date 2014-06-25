angular.module('MainService', []).factory('Main', ['$location', function($http, $location) {
	return{
		
		goToCreateSentence : function(){
    		$location.path('/createSentence');
  		}

	
}
}]);