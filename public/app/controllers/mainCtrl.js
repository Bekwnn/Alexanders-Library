function setSession(user){
	localStorage.setItem('_user', JSON.stringify(user));
}

function getSession(){
	return JSON.parse(localStorage.getItem('_user'));
}

function clearSession(){
	localStorage.removeItem('_user');
}

angular.module('mainCtrl', [])

.controller('mainController', function($rootScope, $location, Auth) {
	var vm = this;
	window._main = vm; // This is a DEBUG statement to access main controller via javascript console
	vm.loggedIn = Auth.isLoggedIn();

	// check if logged in on every request
	$rootScope.$on('$routeChangeStart', function() {
		vm.loggedIn = Auth.isLoggedIn();

		//get user data on route change
		Auth.getUser()
			.then(function(data) {
				vm.user = data.data;
				setSession(data.data);
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
					if(data.success){
						Auth.getUser()
							.then(function(data) {
								vm.user = data.data;
								setSession(data.data);
							});
						$location.path('/search');
					}else{
						vm.loginData.email = "";
						vm.loginData.password = "";
						vm.error = data.message;
					}
				});
		} else {
			vm.submitted = true;
			vm.error = "Login information incorrect.";
		}
	};

	vm.doLogout = function() {
		Auth.logout();
		location.reload();
		vm.user = {};
		$rootScope.user = {};
		clearSession();
		vm.loggedIn = Auth.isLoggedIn();
		$location.path('/');
	};
});
