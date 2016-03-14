'use strict';

angular.module('caseDemoWebappApp', [
  'caseDemoWebappApp.auth',
  'caseDemoWebappApp.admin',
  'caseDemoWebappApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  'validation.match'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
