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
             console.log(captcha);
 			if(captcha == 1){
 				$location.path('/');
 				$scope.captchaError = "";
        $scope.aliasError = "";

 			} else if(captcha == 0) {
               $http({method: 'POST', url: '/getCaptcha'}).success(function (data){
     			$scope.captcha = data.replace(/"/g, ''); 
     			$scope.captchaError = "Das Captcha war falsch veruchen sie es erneut" 
          $scope.aliasError = "";      
     			});
 			} else if (captcha == 2){
        $scope.aliasError = "Der alias ist leider schon vergeben"
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