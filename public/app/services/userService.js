angular.module('userService', [])

.factory('Users', function($http) {
	// create the object
	var myFactory = {};

	// a function to get all the stuff
	myFactory.all = function() {
		return $http.get('/api/user');
	};
	
	myFactory.create = function(formData){
		console.log(formData);
		return $http.post('/api/user', formData);
	};

	return myFactory;

});

