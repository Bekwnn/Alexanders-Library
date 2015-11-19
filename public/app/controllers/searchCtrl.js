angular.module('searchCtrl', ['bookService'])

.controller('searchController', function(Books){
	var vm = this;

	vm.message = 'the search page';

	vm.searchData = { title: "", subject: "", author: "" };

	vm.search = function(){
		vm.processing = true;

		Books.search(vm.searchData)
			.success(function(data){
				// Set search results message
				vm.resultsMessage = "Results for:";
				for (key in vm.searchData){
					if(vm.searchData[key].length > 0)
						vm.resultsMessage += " "+vm.searchData[key];
				}
				if(vm.resultsMessage === "Results for:")
					vm.resultsMessage = "All Results";

				vm.processing = false;
				vm.results = data;
				vm.searchData = { title: "", subject: "", author: "" };
			});

		
	};

	vm.reserve = function(book){
		vm.processing = true;
	};

	Books.all()
		.success( function(data) {
			vm.results = data;
			vm.resultsMessage = "All Results"
		});
	
})