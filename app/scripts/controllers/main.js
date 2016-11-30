'use strict';

/**
 * @ngdoc function
 * @name exampleApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the exampleApp
 */
angular.module('exampleApp')
  .controller('MainCtrl', function ($scope,  $uibModal, $log, MainService) {
    let vm = this;
    vm.list = MainService.getDealList();      
    vm.deleteDeal = function(dealName) {
      MainService.deleteDealByname(dealName);
    };

    vm.editDeal = function(deal) {
      
      $("[data-toggle=popover]").popover('hide');
      vm.openDealModal(deal);
    };

    vm.onSaveDeal = function(deal) {
      console.log(deal);
    };

    vm.openDealModal = function(deal) {
      if (deal) {
        deal.isEdit = true;  
      }      
      var modalInstance = $uibModal.open({
          backdrop: 'static',
          templateUrl: '../../views/form.html',
          controller: 'CreateFormController',
          controllerAs: 'vm',
          size: 'lg',
          resolve: {
              deal: () => deal             
          }
      });
      modalInstance.result.then(function(deal) {
          $log.debug(deal);
          MainService.addDeal(deal);
          vm.list = MainService.getDealList();
      });
    };
  });