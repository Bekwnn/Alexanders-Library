angular.module('searchCtrl', ['bookService','userService']) //importing userService -> Hector.

.controller('searchController', function(Books,Users){ // why do we need to add this??
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
	
	vm.purchase = function(book){
		//vm.title = book.title;
		//for now only user i.p. freely has a seller_id
		//forced through heroku.
		//vm.results = "";
		vm.seller_id = book.seller_id;
		console.log('calling purchase '+ vm.seller_id);
		//ok we're being returned the seller id.
		//now we need to get that seller.
		
		//need a new route in api to get just one user,
		//based on id.
		
		//userservice should be imported,
		//and do an HTTP get on a single user.
		//do something like User.find (define 'find')
		//want to get his current credits.
		//vm.searchData = {}
		
		
		vm.user;
		
		Users.find(vm.seller_id)
		.success(function(user){
			vm.user = user;
			//searchData = {};
			console.log('results searchCtrl '+vm.user.first_name);
		});
		
		//console.log('results searchCtrl 2'+vm.user.first_name);
		vm.updateCredits(book.credits);
		
		/*
		Users.me(){
			.success(function(user){
				vm.me = user;
				console.log(vm.me.first_name);
			});
		}
		*/
	}
	
	vm.credits = 0;
	//how to pass this credits to homeCtrl?
	//they will be in the User object.
	vm.updateCredits = function(num_credits){
		console.log('num_credits '+num_credits);
		vm.credits += num_credits;
	
	};

	Books.all()
		.success( function(data) {
			vm.results = data;
			vm.resultsMessage = "All Results"
		});
	
})