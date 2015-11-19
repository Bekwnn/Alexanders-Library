angular.module('bookService', [])

.factory('Books', function($http) {
	// create the object
	var myFactory = {};
	
	myFactory.create = function(bookData){
		return $http.post('/api/book', bookData);
	}

	// a function to get all the stuff
	myFactory.all = function() {
		return $http.get('/api/book');
	};

	myFactory.search = function(searchData) {
		var searchString = "";
		for (key in searchData){
			if(searchData[key].length > 0 )
				searchString += "+"+searchData[key];
		}
		searchString = searchString.slice(1,searchString.length);
		return $http.get('/api/book?q='+searchString);
	};

	myFactory.reservations = function() {
		return $http.get('/api/reservation');
	}

	return myFactory;

});

