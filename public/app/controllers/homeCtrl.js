angular.module('homeCtrl',['bookService'])

.controller('homeController', function(Books){
	var vm = this;

	vm.message = "a homepage";

	/*Books.reservations()
		.success(function(data){
			if (data.length === 0)
				vm.resultsMessage = "No reservations";
			vm.results = data;
		});
*/

});