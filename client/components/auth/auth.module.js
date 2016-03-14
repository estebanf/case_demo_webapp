'use strict';

angular.module('caseDemoWebappApp.auth', [
  'caseDemoWebappApp.constants',
  'caseDemoWebappApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
