'use strict';

angular.
  module('admin').
  component('admin', {
    templateUrl: 'admin/admin.template.html',
    controller: ['$http',
      function AdminController($http) {
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
        self.addItem = function(item){
          $http.post('/api/shoplist', {'text':item})
                .success(function(data) {
                    //self.list = data;
                    console.log(data);
                })
                .error(function(data) {
                    console.log('Error:' + data);
                });
          //remove from the current default list
          var i = self.defaultList.indexOf(item);
          if (i !=-1 ) {
            self.defaultList.splice(i, 1);
          }
        };
      }
    ]
  });
