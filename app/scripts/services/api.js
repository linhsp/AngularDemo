angular.module('exampleApp')
.service('API',['$http', function($http) {
    const apiPath = "http://localhost:3000";
    return{
        getListOwner: function(callback) {
            $http.get(apiPath + "/owners")
                .success(function (data) {               
                    callback(data);    
                })
                .error(function (error) {
                    callback(error);          
                });   
        },
        getListDeal: function(callback) {
             $http.get(apiPath + "/deals")
                .success(function (data) {               
                    callback(data);    
                })
                .error(function (error) {
                    callback(error);          
                }); 
        }
    }
}]);