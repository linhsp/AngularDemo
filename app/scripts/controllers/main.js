'use strict';

/**
 * @ngdoc function
 * @name exampleApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the exampleApp
 */
angular.module('exampleApp')
  .controller('MainCtrl', function ($scope,  $uibModal, $log, MainService, API) {
    let vm = this;    
    let init = function() {
      API.getListDeal(function(data){
        if (data) {
          vm.list = data;
        }        
      })
    }
    vm.deleteDeal = function(dealName) {
      MainService.deleteDealByname(dealName);
    };

    vm.editDeal = function(deal) {           
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
          if (deal.isEdit) {
             MainService.updateDeal(deal);
          } else {
            MainService.addDeal(deal);
          }          
          vm.list = MainService.getDealList();
      });
    };

    init();
  });