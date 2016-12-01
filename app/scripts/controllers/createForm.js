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
      share: {
        allTraffic: null,
        nonM2M: null,
        m2M: null
      },
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
    $scope.validateShare = function(shareKey, value) {
      if (!$scope.error.dealShare) {
        $scope.error.dealShare = {};
      }      
      $scope.error.dealShare[shareKey] = (value < 0 || value > 100) ? 'Share must be in range from 0 to 100.' : '';
      let total = 0;
      Object.keys($scope.deal.share).forEach(share => {
        total += $scope.deal.share[share];
      })
      $scope.error.dealShare.total = (total != 100) ? "Total of shares (All Traffic, M2M, Non-M2M) must be 100." : '';      
    }
    let checkErrors = function() {
      let hasErrors = false;     
      Object.keys($scope.error).forEach((err) => {
        if (typeof($scope.error[err]) ==='string' && $scope.error[err]){          
               hasErrors = true;          
        }
        if (typeof($scope.error[err]) ==='object') {
          Object.keys($scope.error[err]).forEach((k) => {
            if ($scope.error[err][k]) {
              hasErrors = true;
            }
          })
        }
      })
      return hasErrors;    
    }
    $scope.onSave = function (data) {    
      if (checkErrors()) {
        return;
      }
      $uibModalInstance.close(data);
    }    
    $scope.cancel = function() {
       $uibModalInstance.dismiss('cancel');
    }

    init();
  });
