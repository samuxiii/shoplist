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
            //avoid empty items
            if (!self.formItem.text)
                return;

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

        //mark item as star
        self.starredItem = function(item){
            $http.put('/api/shoplist/' + item._id, item)
                .success(function(data) {
                    self.list = data;
                    console.log(data);
                })
                .error(function(data) {
                    console.log('Error:' + data);
                });
        };

        //manage the selected items
        self.updateSelectedItems = function(item) {
          var i = self.user.list.indexOf(item);
          //if exists, delete, if not, create
          if (i != -1) 
            self.user.list.splice(i, 1);
          else 
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
