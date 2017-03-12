angular.
  module('shoppingApp').
  config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/', {
          template: '<item-list></item-list>'
        }).
        when('/admin', {
          template: '<admin></admin>'
        }).
        otherwise('/');
    }
  ]);