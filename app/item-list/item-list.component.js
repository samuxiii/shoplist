'use strict';

angular.
  module('itemList').
  component('itemList', {
    templateUrl: 'item-list/item-list.template.html',
    controller: ['$http', '$location',
      function ItemListController($http, $location) {
        var self = this;

        /* methods */
        self.init = function() {
            //it will be modeled by html template
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
        };

        //move to another URL
        self.go = function (path) {
            $location.path(path);
        };

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
            item.star = !item.star;
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
          var index = self.user.list.map(function(x) {
                         return x._id; 
                      }).indexOf(item._id);
          //if exists, delete, if not, create
          if (index != -1)
            self.user.list.splice(index, 1);
          else
            self.user.list.push(item); 
        };

        //remove the selected items
        self.wipe = function() {
          var deselectItems = [];
          //delete
          angular.forEach(self.user.list, function(v, k) {
              console.log("Wipe: " + v.text);
              self.deleteItem(v._id);
              deselectItems.push(v);
          });
          //clean seleted
          angular.forEach(deselectItems, function(v, k) {
              console.log("Deselect: " + v.text);
              self.updateSelectedItems(v);
          });
        };

        self.init();
      }
    ]
  });
