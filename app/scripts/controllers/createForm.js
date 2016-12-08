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
        
    $scope.onSave = function (data) {    
      $uibModalInstance.close(data);
    }    
    $scope.cancel = function() {
       $uibModalInstance.dismiss('cancel');
    }

    init();
  });
