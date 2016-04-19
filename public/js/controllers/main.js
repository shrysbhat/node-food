angular.module('foodController', [])

	// inject the Todo service factory into our controller
	.controller('mainController', ['$scope', '$http', 'Foods', function ($scope, $http, Foods) {
		$scope.formData = {};
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all foods and show them
		// use the service to get all the foods
        Foods.get()
            .success(function (data) {
                $scope.foods = data;
                $scope.loading = false;
            });

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createFood = function () {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.food_name !== undefined || $scope.formData.price !== undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Foods.create($scope.formData)

					// if successful creation, call our get function to get all the new foods
					.success(function (data) {
						$scope.loading = false;
                        // $scope.food.food_name = $scope.formData.food_name; // assign our new list of todos
                        // $scope.food.price = $scope.formData.price; // assign our new list of todos
                        $scope.formData = {}; // clear the form so our user is ready to enter another
                        $scope.foods = data;
					});
			}
		};

		// DELETE ==================================================================
		// delete a food after checking it
		$scope.deleteFood = function (food_name) {
			$scope.loading = true;

			Foods.delete(food_name)
				// if successful creation, call our get function to get all the new foods
				.success(function (data) {
					$scope.loading = false;
					$scope.foods = data; // assign our new list of foods
				});
		};
        
        // TOTAL ==================================================================
		// get total of all the food items
		$scope.getTotal = function () {
			$scope.loading = true;

			Foods.total()
				// if successful call our get function to get total of all the food items
				.success(function (data) {
                    $scope.total = data;
                    $scope.loading = false;
					
				});
		};
	}]);