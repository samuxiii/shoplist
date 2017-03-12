'use strict';

angular.
  module('itemList').
  component('itemList', {
    templateUrl: 'item-list/item-list.template.html',
    controller: ['$http',
      function ItemListController($http) {
        var self = this;
        self.formItem = {};

        //temporary array for selected items
        self.user = { list:[] };

        //first retrieve the complete list
        $http.get('/api/shoplist')
            .success(function(data) {
                self.list = data;
                console.log(data)
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });

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

        //remove an item from the shopping list
        self.deleteItem = function(id) {
            $http.delete('/api/shoplist/' + id)
                .success(function(data) {
                    self.list = data;
                    console.log(data);
                })
                .error(function(data) {
                    console.log('Error:' + data);
                });
        };

        //save the selected items
        self.selectItem = function(item) { 
          self.user.list.push(item); 
        };

        //remove the selected items
        self.wipe = function() {
          angular.forEach(self.user.list, function(v, k){
              console.log("Wipe: " + v.text);
              self.deleteItem(v._id);
          })
        };
      }
    ]
  });
