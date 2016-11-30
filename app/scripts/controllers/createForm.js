'use strict';

/**
 * @ngdoc function
 * @name exampleApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the exampleApp
 */
angular.module('exampleApp')
  .controller('CreateFormController', function ($scope, $uibModalInstance, deal) {  
    $scope.traffics = ['All Traffic','M2M','Non-M2M'];
    $scope.statuses = ['idle','draft', 'signed', 'submitted'];
    $scope.owners = {
        G800903: 'G800903',
        tfgrmosa: 'tfgrmosa',
        qft_group_admin: 'qft_group_admin',
        tfgradmi: 'tfgradmi'
    };      
    $scope.deal = deal;  
    $scope.onSave = function (data) {

      $uibModalInstance.close(data);
    }    
    $scope.cancel = function() {
       $uibModalInstance.dismiss('cancel');
    }
  });
