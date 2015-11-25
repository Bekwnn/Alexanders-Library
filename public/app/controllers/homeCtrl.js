angular.module('homeCtrl',['bookService'])

.controller('homeController', function(Books){
	var vm = this;

	vm.message = "a homepage";
	
	vm.credits = 0;
	
	/*
	FIXED:
	ADDED CREDITS TO USER SCHEMA  (how much he has)
	ADDED CREDITS TO BOOK SCHEMA (how much it gives the seller, price already exists)
	ADDED PURCHASE Button which performs (ng click search.purchase)
	ADDED search.updateCredits (now placeholder)
	ADDED search by id in api. user/:user_id.
	DISPLAYING variable credits in home. (do a get from '/me' when authentication works.)
	Displaying variable credits in search page.
	
	REMAINING PROBLEMS:
	
	SCHEMAS
	1. No Seller_Id for Books at the moment. (Not requested when create a book).
	2. Need to get authentication so we can change user.credits,
	and show correct number in search and home pages. (Now just place holder var's in each controller.
	3.Create condition on when to add credits to seller who's book got purchased.
    (LATER -> ONLY IF DATE of purchase before startdate + 7 )
	
	*/
	
	Books.reservations()
		.success(function(data){
			if (data.length === 0)
				vm.resultsMessage = "No reservations";
			vm.results = data;
		});

})