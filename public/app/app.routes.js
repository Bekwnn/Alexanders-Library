angular.module('routerRoutes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {
    $routeProvider
		.when('/', {
            templateUrl : 'app/views/pages/home.html',
            controller  : 'homeController',
            controllerAs: 'home'
		})

        .when('/search', {
            templateUrl : 'app/views/pages/search.html',
            controller  : 'searchController',
            controllerAs: 'search'
        })

    $locationProvider.html5Mode(true);

});
