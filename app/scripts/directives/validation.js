angular.module('exampleApp')
.directive('dealShare', function(){
    return {
        restrict: 'E',   
        require: '?ngModel',
        scope: {
             share: '='
        },        
        templateUrl: '../../views/share-validate.html',
        controller: 'ShareValidateController',
        controllerAs: 'vm'       
    }

})