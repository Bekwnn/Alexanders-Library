angular.module('userCtrl', ['userService'])

// create a controller and inject the Stuff factory
.controller('userController', function(Users) { 
	var vm = this;
	// get all the stuff
	Users.all()
		// promise object
		.success(function(data) {
		// bind the data to a controller variable 
		// this comes from the stuffService 
		vm.stuff = data;
	});
})

.controller('userCreateController', function(Users){

	var vm = this;
	vm.type = 'create';
	
	vm.saveUser = function(){
	
		vm.processing = true;
		vm.message = '';
		
		
		Users.create(vm.userData)
			.success(function(data){
				vm.processing = false;
				
				vm.userData = {};
				vm.message = data.message;

		});
	
	};

});