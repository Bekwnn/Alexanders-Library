angular.module('userService', [])

.factory('Users', function($http) {
	// create the object
	var myFactory = {};

	// a function to get all the stuff
	myFactory.all = function() {
		return $http.get('/api/users');
	};
	
	myFactory.create = function(){
		return $http.post('/api/user');
	}

	return myFactory;

});

