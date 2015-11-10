angular.module('libraryApp', [
	'routerRoutes', 
	'ngAnimate', 
	'userCtrl', 
	'mainCtrl', 
	'authService', 
	'searchService', 
	'searchCtrl'
])

.controller('homeController', function(){
	var vm = this;

	vm.message = 'the home page';

})


.controller('userListController', function($http){
	var vm = this;


})