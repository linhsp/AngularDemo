angular.module('exampleApp')
.directive('nameUnique', ['MainService', function(MainService){
    return {
        restrict: 'A',   
        require: 'ngModel',    
        link: function(scope, element, attrs, ngModel) {            
            ngModel.$validators.nameUnique = function(modelValue) {
                //true or false based on custome dir validation                                  
                return MainService.checkExistDeal(modelValue) ? false : true;  
            };

        }
    }

}])
.directive('beginWithChar', ['MainService', function(MainService){
    return {
        restrict: 'A',   
        require: 'ngModel',    
        link: function(scope, element, attrs, ngModel) {           
            ngModel.$validators.beginWithChar = function(modelValue) {
                //true or false based on custome dir validation
                let pattern = new RegExp('^[a-zA-Z]');                
               return  pattern.test(modelValue);
            };

        }
    }

}])