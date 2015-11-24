angular.module('bookCtrl', ['bookService'])

.controller('bookCreateController', function(Books){
	"use strict";
	var vm = this;
	vm.type = 'create';
	
	vm.saveBook = function(validForm){
		if(validForm){
			console.log('SAVEBOOK IS BEING CALLED');
			console.log(vm.bookData);
		
			//vm.adding = true;
			vm.message = '';
			
			
			Books.create(vm.bookData)
				.success(function(data){
					//vm.adding = false;
					
					vm.bookData = {};
					vm.message = data.message;
			});
			}else{
				vm.message = "Invalid form data.";
			}
	
	};
});