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
        self.addItem = function(item){
          /* TODO: add to the shopping list */
          //remove from the current list
          var i = self.defaultList.indexOf(item);
          if (i !=-1 ) {
            self.defaultList.splice(i, 1);
          }
        };
      }
    //]
  });
