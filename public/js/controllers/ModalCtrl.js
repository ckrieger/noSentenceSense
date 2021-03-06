angular.module('ModalCtrl', ['ui.bootstrap']).controller('ModalController', function($scope, $modal, $log, $templateCache, $http) {

    $scope.items = {select: ['sexist', 'right-wing extremist ', 'other']};
    
    
    $scope.openMail = function(size, sentenceId) {
      
        $scope.items.id = sentenceId;
        var modalInstance = $modal.open({
            templateUrl: 'mailModalContent.html',
            controller: function($scope, $modalInstance, $templateCache, $http, items) {
                $scope.items = items.select;
                $scope.selected = {
                    item: $scope.items[0]
                };
                $scope.id = items.id;
               
                $scope.ok = function(reason) {
                     
                    var dataIn = {sentenceId : $scope.id, reasonIn : reason};
                    $modalInstance.close(
                        
                        $http({
                        method: 'POST',
                        url: '/sendMail',
                        data: dataIn
                    }));
                };

                $scope.cancel = function() {
                    $modalInstance.dismiss('cancel');
                };
            },
            size: size,
            resolve: {
                items: function() {
                    return $scope.items;
                }
            }
        });
    };

     
});
