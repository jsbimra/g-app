(function(){
	'use strict';	

	angular.module('xCCeedGlobalApp')
		.controller('peopleDetailController',['$scope','$filter','constantAPIService','commonAPIService','peopleSharedAPIService',peopleDetailController]);
		
		
		function peopleDetailController($scope,$filter,constantAPIService,commonAPIService,peopleSharedAPIService){
			
			//variable decelaration
			var vm = this;
			var sharedPeopleData = undefined;
			vm.peopleDetailHeader = true;
			vm.singlePeopleData = undefined;
			
			//ON Loading flag
			//$scope.$parent.loadingFlag = true;
			
			//getting the value from local storage
			var peopleInfoLS = peopleSharedAPIService.getFromLS(constantAPIService.PERSON_INFO);
			

			if(peopleInfoLS != "undefined" && peopleInfoLS != null && peopleInfoLS != "")
			{
				var temp = (typeof peopleInfoLS === 'object' ? peopleInfoLS : JSON.parse(peopleInfoLS));
				vm.singlePeopleData = peopleSharedAPIService.manupulateInfoBeforeLoading(temp);
			}
			else
			{
				//get the people releated information from the system.
				sharedPeopleData = peopleSharedAPIService.getPeopleData();
			
				if (sharedPeopleData != null)
				{
					if(sharedPeopleData.length >= 0)
					{
						peopleSharedAPIService.setToLS(constantAPIService.PERSON_INFO,sharedPeopleData[0]);	
						var dataForManipulation	= sharedPeopleData[0];
						///
							if(dataForManipulation != null || dataForManipulation != undefined){
								//sending the data for the manupulation
								vm.singlePeopleData=peopleSharedAPIService.manupulateInfoBeforeLoading(dataForManipulation);
							}//end if
						///

						vm.singlePeopleData = sharedPeopleData[0];
						console.log(vm.singlePeopleData);
													
					}//shared people data
				}//if end sharedPeopleData;
			}//end of else


			//OFF Loading flag
			$scope.$parent.loadingFlag = false;

		}//peopleDetailController

})(); // function end
