angular.module('searchCtrl', ['searchService'])

.controller('searchController', function(Search){
	var vm = this;

	vm.message = 'the search page';

	vm.searchTitle = "";
	vm.searchSubject = "";
	vm.searchPrice = 0;

	vm.search = function(){
		vm.results.push({title:vm.searchTitle, subject:vm.searchSubject, price:vm.searchPrice});
		vm.searchTitle = "";
		vm.searchSubject = "";
		vm.searchPrice = 0;
	};

	Search.all()
		.success( function(data) {
			vm.results = data;
			console.log(data);
		});
	
})