angular.module('searchService', [])

.factory('Search', function($http) {
	// create the object
	var searchFactory = {};

	// a function to get all the stuff
	searchFactory.all = function() {
		return $http.get('/api/book');
	};

	return searchFactory;

});
