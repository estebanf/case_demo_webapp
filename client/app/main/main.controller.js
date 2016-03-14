'use strict';

(function() {

// class MainController {

//   constructor($http, $scope,socket,$state) {
//     this.$http = $http;
//     this.awesomeThings = [];

//     $http.get('/api/things').then(response => {
//       this.awesomeThings = response.data;
//       socket.syncUpdates('thing', this.awesomeThings);
//     });

//     $scope.$on('$destroy', function() {
//       socket.unsyncUpdates('thing');
//     });
//   }

//   addThing() {
//     if (this.newThing) {
//       this.$http.post('/api/things', { name: this.newThing });
//       this.newThing = '';
//     }
//   }

//   deleteThing(thing) {
//     this.$http.delete('/api/things/' + thing._id);
//   }
//   create_claim() {
//     $state.go("new_claim")
//   }
// }

angular.module('caseDemoWebappApp')
  .controller('MainController', ['$http','$scope','socket','$state',function($http,$scope,socket,$state){
    this.create_claim = function(){
      $state.go('new_claim');
    }
  }]);

})();
