'use strict';

angular.
  module('admin').
  component('admin', {
    templateUrl: 'admin/admin.template.html',
    controller: /*['$http',*/
      function AdminController(/*$http*/) {
        var self = this;

        self.defaultList = [
          'Milk',
          'Bread',
          'Water',
          'Ketchup',
          'Almonds'
        ];

        /* methods */
        //add a new item to the shopping list
        self.createItem = function(){
            $http.post('/api/shoplist', self.formItem)
                .success(function(data) {
                    self.formItem = {};
                    self.list = data;
                    console.log(data);
                })
                .error(function(data) {
                    console.log('Error:' + data);
                });
        };
      }
    //]
  });
