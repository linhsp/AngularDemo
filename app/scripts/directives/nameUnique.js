angular.module('exampleApp')
.directive('ngNameunique', ['MainService', function(MainService){
    return {
        restrict: 'A',   
        require: 'ngModel',    
        link: function(scope, element, attrs, ngModel) {
            console.log(ngModel);
            ngModel.$validators.nameunique = function(name) {
                //true or false based on custome dir validation
                let pattern = new RegExp('^[a-zA-Z]');      
                pattern.test(name);
                let error = !name ? 'This field is required.' : '';
                if (name && !pattern.test(name)) {
                    error = 'Deal name must begin with a character.';
                }
                if (MainService.checkExistDeal(name)) {
                    error = "This name is already existed."
                }
                console.log(name);
            };

        }
    }

}])