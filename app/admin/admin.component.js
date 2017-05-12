'use strict';

angular.
  module('admin').
  component('admin', {
    templateUrl: 'admin/admin.template.html',
    controller: ['$http',
      function AdminController($http) {
        var self = this;

        /* methods */
        self.init = function() {
          //retrieval of the complete list
          $http.get('/api/shoplist/starred')
              .success(function(data) {
                  self.defaultList = data;
              })
              .error(function(data) {
                  console.log('Error: ' + data);
              });
        };

        //add a new item to the shopping list
        self.moveStarredToList = function(item){
          item.done = false;
          $http.put('/api/shoplist/' + item._id, item)
                .success(function(data) {
                    console.log(data);
                })
                .error(function(data) {
                    console.log('Error:' + data);
                });
          //remove from the current default list
          var index = self.defaultList.map(function(x) {
                         return x._id; 
                      }).indexOf(item._id);

          if (index !=-1 ) {
            self.defaultList.splice(index, 1);
          }
        };

        self.init();
      }
    ]
  });
