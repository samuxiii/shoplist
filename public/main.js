angular.module('shoppingList', []);

function shoplistController($scope, $http) {  
    $scope.formItem = {};

    //retrieve the complete list
    $http.get('/api/shoplist')
        .success(function(data) {
            $scope.list = data;
            console.log(data)
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    //add a new item to the shopping list
    $scope.createItem = function(){
        $http.post('/api/shoplist', $scope.formItem)
            .success(function(data) {
                $scope.formItem = {};
                $scope.list = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error:' + data);
            });
    };

    //remove an item from the shopping list
    $scope.deleteItem = function(id) {
        $http.delete('/api/shoplist/' + id)
            .success(function(data) {
                $scope.list = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error:' + data);
            });
    };
}
