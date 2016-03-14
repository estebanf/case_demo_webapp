'use strict';

(function(){
angular.module('caseDemoWebappApp')
  .controller('NewClaimCtrl', ['$scope','$state',function ($scope,$state) {
  	$scope.master = {};
  	$scope.save = function(claim){
  		console.log(claim);
  	}
  	$scope.back = function(){
  		console.log('here')
  		$state.go('main');
  	}
  }]);

})();

