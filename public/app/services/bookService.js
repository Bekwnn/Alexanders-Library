angular.module('bookService', [])

.factory('Books', function($http) {
	// create the object
	var myFactory = {};

	// a function to get all the stuff
	/*myFactory.all = function() {
		return $http.get('/api/users');
	};*/
	
	myFactory.create = function(bookData){
		return $http.post('/api/book', bookData);
	}

	return myFactory;

});

