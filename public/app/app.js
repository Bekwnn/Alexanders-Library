angular.module('libraryApp', ['routerRoutes', 'ngAnimate', 'userCtrl'])


.controller('mainController', function(){
	var vm = this;

	vm.message = 'AlexandersLibrary: Now with routing!';
	vm.computers = [
		{name: "computer 1", color: 'Orange', awesomeness: 8},
		{name: "computer 2", color: 'Blue', awesomeness: 2},
		{name: "computer 3", color: 'Black', awesomeness: 6}
	];
})

.controller('homeController', function(){
	var vm = this;

	vm.message = 'the home page';

})

.controller('searchController', function(){
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

	vm.results = [
					{ title : 'Computer Stuff', subject : 'Computers', price : 3.00 },
					{ title : 'English Stuff', subject : 'English', price : 12.00 },
					{ title : 'Banana Stuff', subject : 'Bananas', price : 1.00 }
				 ];
	
})

.controller('userListController', function($http){
	var vm = this;


})