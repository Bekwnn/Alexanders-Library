function getSession(){
	return JSON.parse(localStorage.getItem('_user'));
}

angular.module('searchCtrl', ['bookService','userService'])

.controller('searchController', function(Books, Users){
	var vm = this;

	vm.message = 'the search page';

	vm.searchData = { title: "", subject: "", author: "" };

	vm.search = function(){
		vm.processing = true;

		Books.search(vm.searchData)
			.success(function(data){
				// Set search results message
				vm.resultsMessage = "Results for:";
				for (var key in vm.searchData){
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
		vm.reservationMessage = book.title;
		Books.reserve(book._id)
			.success( function(data) {
				vm.reservationMessage = vm.reservationMessage + " Reserved";
			});
	};

	vm.sell = function(book){
		Books.sell(book._id)
			.success( function(data) {
				vm.sellMessage = "Sold";
			});
	};

	Books.all()
		.success( function(data) {
			vm.user = getSession();	
			vm.results = data;
			vm.resultsMessage = "All Results";
		});
	
});