(function(){
	'use strict';	

	angular.module('xCCeedGlobalApp')
		.controller('myDetailController',['$scope','$filter','constantAPIService','commonAPIService','peopleSharedAPIService',myDetailController]);
		
		
		function myDetailController($scope,$filter,constantAPIService,commonAPIService,peopleSharedAPIService){
			
			//variable decelaration
			var vm = this;
			var sharedPeopleData = undefined;
			vm.peopleDetailHeader = true;
			vm.singlePeopleData = undefined;
			
			//ON Loading flag
			$scope.$parent.loadingFlag = true;
			
			//getting the value from local storage
			var peopleInfoLS = peopleSharedAPIService.getFromLS(constantAPIService.MY_PERSONALDETAILS);

			if(peopleInfoLS != "undefined" && peopleInfoLS != null && peopleInfoLS != "")
			{
				console.log(peopleInfoLS);
				//vm.singlePeopleData = (typeof peopleInfoLS === 'object' ? peopleInfoLS : JSON.parse(peopleInfoLS));
				var dataForManipulation = (typeof peopleInfoLS === 'object' ? peopleInfoLS : JSON.parse(peopleInfoLS));
				
				if(dataForManipulation != null || dataForManipulation != undefined){
					//sending the data for the manupulation
					vm.singlePeopleData=peopleSharedAPIService.manupulateInfoBeforeLoading(dataForManipulation);
				}//end if

			}//end if
			
			//ON Loading flag
			$scope.$parent.loadingFlag = false;

		}//peopleDetailController

})(); // function end
