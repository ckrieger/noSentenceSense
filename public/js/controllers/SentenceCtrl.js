angular.module('SentenceCtrl', []).controller('SentenceController', function($scope, $http, $location, $route) {
  
  $http({method: 'POST', url: '/getCaptcha'}).success(function (data){
    $scope.captcha = data.replace(/"/g, '');        
  });

  $scope.saveSentence = function(){
 	  var data = {
 			captchaInput : $scope.captchaInput,
 			sentence : $scope.sentenceIn,
 			user : $scope.user ,
 			mail : $scope.mail
 		};
 	
 		$http({method: 'POST', url: '/createSentence', data: data}).success(function (captcha){
      if(captcha == 1)
      {
 				$location.path('/user/' + $scope.user);
 				$scope.captchaError = "";
        $scope.aliasError = "";
      } 
      else if(captcha == 0) 
      {
        $http({method: 'POST', url: '/getCaptcha'}).success(function (data){
     		$scope.captcha = data.replace(/"/g, ''); 
     		$scope.captchaError = "Wrong captcha please try again!" 
        $scope.aliasError = "";      
     		});
 			} 
      else if (captcha == 2)
      {
        $scope.aliasError = "The alias is forgiven!"
        $scope.captchaError = "";   
      }

 		});
  }

 	$scope.refresh = function(){
 	  $http({method: 'POST', url: '/getCaptcha'}).success(function (data){
      $scope.captcha = data.replace(/"/g, '');        
    });
  }	

});