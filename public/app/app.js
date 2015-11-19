angular.module('libraryApp', [
	'routerRoutes', 
	'ngAnimate', 
	'userCtrl', 
	'mainCtrl', 
	'authService', 
	'searchCtrl',
	'bookService',
	'bookCtrl',
	'homeCtrl'
])

.config(function($httpProvider){

	$httpProvider.interceptors.push('AuthInterceptor');

})
