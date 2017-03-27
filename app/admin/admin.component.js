'use strict';

angular.
  module('admin').
  component('admin', {
    templateUrl: 'admin/admin.template.html',
    controller: ['$http',
      function AdminController($http) {
        var self = this;

        //first retrieve the complete list
        $http.get('/api/shoplist/starred')
            .success(function(data) {
                self.defaultList = data;
                console.log(data)
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });

        /* methods */
        //add a new item to the shopping list
        self.addItem = function(item){
          item.done = false;
          $http.put('/api/shoplist/' + item._id, item)
                .success(function(data) {
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
