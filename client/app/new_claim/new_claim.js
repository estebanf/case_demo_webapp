'use strict';

angular.module('caseDemoWebappApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('new_claim', {
        url: '/new_claim',
        templateUrl: 'app/new_claim/new_claim.html',
        controller: 'NewClaimCtrl',
        controller_as: 'new_claim'
      });
  });
