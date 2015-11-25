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
	}
	
	//HECTOR

	myFactory.find = function(user_id){ //given the id, return the user
	    console.log("user_id "+user_id);
		return $http.get('/api/user/'+user_id);//pass in the user_id.
	}
	
	//this doesn't work for now.
	/*
	myFactory.me = function(){ //given the id, return the user
	    console.log("getting me");
		return $http.get('/api/user/me');//pass in the user_id.
	}
	*/
	return myFactory;

});

