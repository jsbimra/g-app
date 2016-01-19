(function(){
	angular.module('xCCeedGlobalApp')
		.controller('parentController',['$scope','constantAPIService','commonAPIService', parentController]);
	
	/* @ngInject */
	function parentController($scope,constantAPIService,commonAPIService){
		
		var vm = this;

		vm.peopleHeading 		= 'CC Directory';
		vm.peopleDetailHeading 	= 'Profile Details';
		vm.filterHeading 		= 'Filters';
		vm.contactHeading		= 'Contact';
		vm.loadingFlag 			= false;
		vm.alertInfo			= commonAPIService.modelPopUp();

	}//end of people controller4

})(); // function end