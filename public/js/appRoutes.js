angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})

		.when('/createSentence', {
			templateUrl: 'views/createSentence.html',
			controller: 'SentenceController'
		})

		.when('/topFive', {
			templateUrl: 'views/topFive.html',
			controller:'TopFiveController'
		})

	$locationProvider.html5Mode(true);

}]);