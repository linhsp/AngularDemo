angular.module('exampleApp')
.directive('dealShare', function() {
    return {
        restrict: 'E',
        require: 'ngModel',     
        scope: {
             share: '=ngModel',
             formName: '@',
             total: '='
        },        
        templateUrl: '../../views/share-validate.html',
        controller: 'ShareValidateController',
        controllerAs: 'vm',
        link: function(scope, element, attrs, ctrl) {
            ctrl.$validators.total = function(modelValue, viewValue) {
                let result = 0;
                Object.keys(modelValue).forEach(item => {
                    if (Number(modelValue[item]) !== NaN)
                        result += modelValue[item];
                })
                return result===scope.total;
            };       
            element.on('change', function(){
                ctrl.$validate('total');
            })               
        }
    }
})