angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		// 
		// 
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})

		.when('/home', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})

		.when('/home/:sentenceId', {
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

		.when('/user/:user', {
			templateUrl: 'views/user.html',
			controller : 'UserController'
		})

		.otherwise({
   			 redirectTo: '/'
		});

	$locationProvider.html5Mode(true);

}]);