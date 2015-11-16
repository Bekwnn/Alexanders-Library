angular.module('searchService', [])

.factory('Search', function($http) {
	// create the object
	var searchFactory = {};

	// a function to get all the stuff
	searchFactory.all = function() {
		return $http.get('/api/book');
	};

	searchFactory.search = function(searchData) {
		return $http.post('/api/search/', searchData);
	};

	return searchFactory;

});
