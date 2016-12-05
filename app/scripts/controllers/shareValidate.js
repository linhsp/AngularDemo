angular.module('exampleApp')
.controller('ShareValidateController', ['$scope', function($scope){
    var vm = this;
    vm.share = $scope.share || {};    
    vm.error = {};
    vm.validateShare = function(shareKey, value) {
      if (!vm.error.dealShare) {
        vm.error.dealShare = {};
      }      
      vm.error.dealShare[shareKey] = (value < 0 || value > 100) ? 'Share must be in range from 0 to 100.' : '';
      let total = 0;
      Object.keys(vm.share).forEach(share => {
        total += vm.share[share];
      })
      vm.error.dealShare.total = (total != 100) ? "Total of shares (All Traffic, M2M, Non-M2M) must be 100." : '';      
    }
}]);
