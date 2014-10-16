angular.module('ModalCtrl', ['ui.bootstrap']).controller('ModalController', function($scope, $modal, $log, $templateCache, $http) {

    $scope.items = {select: ['sexistisch', 'rechtsradikal', 'andere']};
    
    
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
               
                $scope.ok = function() {
                     
                    var dataIn = {sentenceId : $scope.id, reasonIn : $scope.selected};
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

     $scope.openShare = function(size) {

        var modalInstance = $modal.open({
            templateUrl: 'shareModalContent.html',
            controller: function($scope, $modalInstance, $templateCache, $http, itemsShare) {
                $scope.itemsShare = itemsShare;
                $scope.selected = {
                    item: $scope.itemsShare[0]
                };
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
});
