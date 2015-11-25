angular.module('homeCtrl',['bookService'])


.controller('homeController', function($rootScope, Auth, Books){
	var vm = this;
	vm.user = $rootScope.user;
	vm.results = {};
	vm.message = "a homepage";

	var bookCallback = function (data){
		console.log("response: ");
		console.log(data);
	};

	if(vm.user){
		Books.myReservations(vm.user._id)
			.then(function (data) {
				vm.resultsMessage = "";
				if(data.length === 0 || data.data.success === false){
					vm.resultsMessage = "No reservations";
					vm.results = {};
				}else{
					vm.results = data.data;
					for( var i in vm.results ){
						Books.get(vm.results[i].book_id)
							.success(function (data){
								for(var j in vm.results ){
									if(vm.results[j].book_id === data._id){
										vm.results[j] = angular.merge(data, vm.results[j]);
									}
								}
							});
					}
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