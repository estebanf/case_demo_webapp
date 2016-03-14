'use strict';

describe('Controller: NewClaimCtrl', function () {

  // load the controller's module
  beforeEach(module('caseDemoWebappApp'));

  var NewClaimCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NewClaimCtrl = $controller('NewClaimCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
