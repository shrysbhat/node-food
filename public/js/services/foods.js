angular.module('foodService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Foods', ['$http', function ($http) {
		return {
			get : function () {
				return $http.get('/api/food');
			},
			create : function (foodData) {
				return $http.post('/api/food', foodData);
			},
			delete : function (food_name) {
				return $http.delete('/api/food/' + food_name);
			}
		}
	}]);