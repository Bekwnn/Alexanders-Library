angular.module('bookService', [])

.factory('Books', function($http, Auth) {
	// create the object
	var myFactory = {};
	
	myFactory.create = function(bookData){
		return $http.post('/api/book', bookData);
	};

	// a function to get all the stuff
	myFactory.all = function() {
		return $http.get('/api/book');
	};

	myFactory.search = function(searchData) {
		var searchString = "";
		for (var key in searchData){
			if(searchData[key].length > 0 )
				searchString += "+"+searchData[key];
		}
		searchString = searchString.slice(1,searchString.length);
		return $http.get('/api/book?q='+searchString);
	};

	myFactory.get = function(id) {
		return $http.get('/api/book/'+id);
	};

	myFactory.sell = function(bookID) {
		return $http.post('/api/book/'+bookID);
	};

	myFactory.reserve = function(bookID) {
		return $http.post("/api/book/"+bookID+"/reservation");
	};

	myFactory.reservations = function() {
		return $http.get('/api/reservation');
	};

	myFactory.myReservations = function(userID) {
		return $http.get('/api/user/'+userID+"/reservation");
	};

	return myFactory;

});

