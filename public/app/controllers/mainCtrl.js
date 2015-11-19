angular.module('mainCtrl', [])

.controller('mainController', function($rootScope, $location, Auth) {
	var vm = this;
	vm.loggedIn = Auth.isLoggedIn();

	// check if logged in on every request
	$rootScope.$on('$routeChangeStart', function() {
		vm.loggedIn = Auth.isLoggedIn();

		//get user data on route change
		Auth.getUser()
			.then(function(data) {
				vm.user = data;
			});
	});

	vm.doLogin = function(validForm) {
		if(validForm){
			vm.processing = true;
			vm.error = '';
		
			Auth.login(vm.loginData.email, vm.loginData.password)
				.success(function(data) {
					vm.processing = false;
					vm.loggedIn = data.success;
					if(data.success)
						$location.path('/search');
					else{
						vm.loginData.email = "";
						vm.loginData.password = "";
						vm.error = data.message;
					}
				});
		} else {
			vm.submitted = true;
			vm.error = "Login information incorrect."
		}
	};

	vm.doLogout = function() {
		Auth.logout();
		vm.user = {};
		vm.loggedIn = Auth.isLoggedIn();
		$location.path('/');
	};
});
