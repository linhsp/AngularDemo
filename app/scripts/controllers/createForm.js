'use strict';

/**
 * @ngdoc function
 * @name exampleApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the exampleApp
 */
angular.module('exampleApp')
  .controller('CreateFormController', function ($scope, $uibModalInstance, deal, MainService, API) {
    $scope.traffics = ['All Traffic','M2M','Non-M2M'];
    $scope.statuses = ['idle','draft', 'signed', 'submitted'];
    $scope.owners = {};
    $scope.deal = {
      name: '',
      decs: '',
      owner: '',
      reviewed: false,
      share: null,
      status: '',
      traffic: ''
    };
    let init = function() {
      API.getListOwner(function(data) {
        if (data) {
          $scope.owners = data;
        }              
      })
    }    
    $scope.deal = (deal && deal.isEdit) ? angular.copy(deal) : $scope.deal;
    $scope.error = {};
    $scope.validateName = function(name) {
      let pattern = new RegExp('^[a-zA-Z]');      
      pattern.test(name);
      $scope.error.dealName = !name ? 'This field is required.' : '';
      if (name && !pattern.test(name)) {
        $scope.error.dealName = 'Deal name must begin with a character.';
      }
      if (MainService.checkExistDeal(name)) {
        $scope.error.dealName = "This name is already existed."
      }
    }
    $scope.validateShare = function(share) {     
        $scope.error.dealShare = (share < 0 || share > 100) ? 'Share must be in range from 0 to 100' : '';
      
    }
    $scope.onSave = function (data) {
      console.log($scope.error);
      let hasErrors = false;
      Object.keys($scope.error).forEach((err) => {
        if ($scope.error[err]) {
               hasErrors = true;          
        }
      })
      if (hasErrors) {
        return;
      }
      $uibModalInstance.close(data);
    }    
    $scope.cancel = function() {
       $uibModalInstance.dismiss('cancel');
    }

    init();
  });
