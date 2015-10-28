angular.module('libraryApp', [])

.controller('mainController', function(){
	var vm = this;

	vm.message = 'This is a message bound to a variable';
	vm.computers = [
		{name: "computer 1", color: 'Orange', awesomeness: 8},
		{name: "computer 2", color: 'Blue', awesomeness: 2},
		{name: "computer 3", color: 'Black', awesomeness: 6}
	];
});