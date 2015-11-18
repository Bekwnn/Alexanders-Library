angular.module('searchCtrl', ['searchService'])

.controller('searchController', function(Search){
	var vm = this;

	vm.message = 'the search page';

	vm.searchData = { title: "", subject: "", author: "" };

	vm.search = function(){
		vm.processing = true;

		Search.search(vm.searchData)
			.success(function(data){
				vm.processing = false;
				vm.results = data;
				vm.searchData = { title: "", subject: "", author: "" };
			});

		
	};

	vm.reserve = function(book){
		vm.processing = true;
		console.log(book);
	};

	Search.all()
		.success( function(data) {
			vm.results = data;
			console.log(data);
		});
	
})