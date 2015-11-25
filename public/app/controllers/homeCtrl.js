angular.module('homeCtrl',['bookService'])

.controller('homeController', function($rootScope, Auth, Books){
	var vm = this;
	vm.user = $rootScope.user;
	vm.message = "a homepage";

	if(vm.user){
		Books.myReservations(vm.user._id)
			.then(function (data) {
				vm.resultsMessage = "Results Message Text";
				if(data.length === 0 || data.data.success === false){
					vm.resultsMessage = "No reservations";
					vm.results = {};
				}else{
				vm.results = data;
				console.log(data);
				}
			});
	}



	/*Books.reservations()
		.success(function(data){
			if (data.length === 0)
				vm.resultsMessage = "No reservations";
			vm.results = data;
		});
*/

});