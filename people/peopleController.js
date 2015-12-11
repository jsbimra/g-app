(function(){
	'use strict';
	
angular.module('xCCeedGlobalApp')
	.controller('peopleController',['$scope','constantAPIService','commonAPIService','peopleAPIService','peopleSharedAPIService',peopleController]);
		
	//
	function peopleController($scope,constantAPIService,commonAPIService,peopleAPIService,peopleSharedAPIService){
		
		//console.log('people controller');
		//alias name 
		var vm = this;
		var baseURL = constantAPIService.BASE_SERVICE_URL + constantAPIService.routingDetails().PEOPLE_HTML;
		var baseAdditionDetailURL =  constantAPIService.BASE_SERVICE_URL + constantAPIService.routingDetails().PEOPLE_ADD_DETAIL;
		var baseAdditionDetailURLConcat = undefined;

		//this is to set the alert model object 
		$scope.$parent.alertInfo = commonAPIService.modelPopUp();

		vm.nameFilter= '';
		vm.peopleHeader = true;
		vm.showFilterFooterUI = false;
		//ON Loading flag
		$scope.$parent.loadingFlag = true;

		//console.log(baseURL);

		//get the list of the employee
		peopleAPIService.GetResult(baseURL,"GET",$scope).then(function(resp){
			if(resp !== null && resp !== undefined){

				if('data' in resp){
					vm.peopleList = resp.data;

					//myAdditionalDetail
					myAdditionalDetail();

					//OFF Loading flag
					$scope.$parent.loadingFlag = false;

					// console.log(vm.peopleList);	
				}
			}
			//console.log(data);
		});


		//to search the value on the search
		$scope.searchFilter = function(listItems)
		{
			var  filterSearchValue = vm.nameFilter;
			if (filterSearchValue != ""){
				var keyWord = new RegExp(filterSearchValue,'i');
				//console.log	(keyWord.test);
			}

			//Searching is based on the first and last name
			return !filterSearchValue || keyWord.test(listItems.First_Name) || keyWord.test(listItems.Last_Name);
		
		}//end of search


		//redirect to details view
		$scope.showPeopleDetailView = function(id){
			if(id != undefined && id != ''){

				//first set the details view list value to true
				//vm.detailViewUI = true;

				//delete the record from the LS first
				peopleSharedAPIService.removeFromLS(constantAPIService.PERSON_INFO);

				//filter the data on the basis of id
				var peopleRecord = peopleAPIService.filterForDetails(vm.peopleList,id);//$filter('filter')(vm.peopleList,id);

				//store it in one of the virtual memeory
				vm.detailViewRecord = peopleRecord[0];

				//For additionDetail hit the service
				baseAdditionDetailURLConcat = undefined;
				baseAdditionDetailURLConcat=baseAdditionDetailURL.concat(vm.detailViewRecord.User_Id);
				manipulationAdditonalDetail(baseAdditionDetailURLConcat,"peoplelist");


			}//end of if
		}//end showDetailView

		//This is to pull the data for the personal information from the system
		function manipulationAdditonalDetail(baseURL,fromLocation){
			//OFF Loading flag
			//$scope.$parent.loadingFlag = true;
			
			peopleAPIService.GetAdditionalDataResult(baseURL,"GET",$scope).then(function(resp){
				if(resp !== null && resp !== undefined){

						if('data' in resp){
							if(fromLocation == "peoplelist")
							{
								vm.detailViewRecord = resp.data;	

								peopleSharedAPIService.clearPeopleData();
								peopleSharedAPIService.setPeopleData(vm.detailViewRecord);

								//location redirect;
								peopleAPIService.redirectToDetail();
							}
							if(fromLocation == "myprofilelist")
							{
								vm.personalDetailViewRecord = resp.data;

								//save the personal details information in the ls
								commonAPIService.setInLS(constantAPIService.MY_PERSONALDETAILS,vm.personalDetailViewRecord);
							}

							//OFF Loading flag
							//$scope.$parent.loadingFlag = false;

							
						}
					}
				//console.log(data);
				});
		}//end manipulationAdditonalDetail

		//Logged ins user additional details information is loaded.
		function myAdditionalDetail(baseURL){
			//store the user profile data in the ls.
			if(vm.peopleList != null || vm.peopleList != undefined){
				var myProfileData=peopleAPIService.myProfileInLS(vm.peopleList);

					if(myProfileData != null || myProfileData != undefined){
					
						if(myProfileData.length >= 0)
						{
							baseAdditionDetailURLConcat = undefined;
							baseAdditionDetailURLConcat=baseAdditionDetailURL.concat(myProfileData[0].User_Id);
							manipulationAdditonalDetail(baseAdditionDetailURLConcat,"myprofilelist");
						}
					}//if myProfileData
			}//my people List	
		}

		$(window).scroll(function(){

			if(this.scrollY > 99){
				vm.showFilterFooterUI = true;
				$scope.$apply();

			}else{
				vm.showFilterFooterUI = false;
				$scope.$apply();
			}
		});
	}//end of people controller
})(); // function end