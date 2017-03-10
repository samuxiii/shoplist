angular.module('shoppingList', []);

function shoplistController($scope, $http) {  
    $scope.formItem = {};

    //temporary array for selected items
    $scope.user = { list:[] };

    //first retrieve the complete list
    $http.get('/api/shoplist')
        .success(function(data) {
            $scope.list = data;
            console.log(data)
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    /* methods */
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

    //save the selected items
    $scope.selectItem = function(item) { 
	$scope.user.list.push(item); 
    };

    //remove the selected items
    $scope.wipe = function() {
	angular.forEach($scope.user.list, function(v, k){
	    console.log("Wipe: " + v.text);
	    $scope.deleteItem(v._id);
	})
    };
}
