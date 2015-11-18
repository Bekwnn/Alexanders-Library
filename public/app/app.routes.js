angular.module('routerRoutes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {
    $routeProvider
		.when('/', {
            templateUrl : 'app/views/pages/home.html',
            controller  : 'homeController',
            controllerAs: 'home'
		})

		.when('/login', {
			templateUrl : 'app/views/pages/login.html',
			controller  : 'mainController',
			controllerAs: 'login'
		})

        .when('/search', {
            templateUrl : 'app/views/pages/search.html',
            controller  : 'searchController',
            controllerAs: 'search'
        })

        .when('/books', {
            templateUrl : 'app/views/pages/users.html',
            controller  : 'userController',
            controllerAs: 'users'
        })
		
		
        .when('/signup', {
            templateUrl : 'app/views/pages/signup.html',
            controller  : 'userCreateController',
            controllerAs: 'user'
        })
		
		 .when('/new', {
            templateUrl : 'app/views/pages/addResource.html',
            controller  : 'bookCreateController',
            controllerAs: 'book'
        })

    $locationProvider.html5Mode(true);

});
