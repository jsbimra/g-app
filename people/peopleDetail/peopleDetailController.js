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
			vm.editFormSubmittedMsg = false;
			vm.LoggedInRole = peopleSharedAPIService.RoleFromLS;
			vm.showEditModal = showEditModal;
			vm.saveEditForm = saveEditForm;

			//this is for edit managing position
			$scope.editInfo = peopleSharedAPIService.modelEditPopUp();
			//this is to set the alert model object 
			$scope.$parent.alertInfo = commonAPIService.modelPopUp();
			
			//Scroll to top
			$('html, body').animate({scrollTop: '0px'}, 0);

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
						//console.log(vm.singlePeopleData);
													
					}//shared people data
				}//if end sharedPeopleData;
			}//end of else


			//OFF Loading flag
			$scope.$parent.loadingFlag = false;

			//this is defined in the shared service as used by both the controller myDetail and peopleDetail
			function showEditModal(managingPositionValue,userId){
				peopleSharedAPIService.showEditModal(vm,$scope,managingPositionValue,userId);
			}

			/* Save edit form */
			function saveEditForm(){
				var updateManagingPositionURL = constantAPIService.BASE_SERVICE_URL + constantAPIService.routingDetails().EDIT_MANAGING_POSITION;
				if($scope.frmEditModal.$valid === false){return;}else{
					//console.log('you can submit the form');

					var managingPosition = peopleSharedAPIService.FormatData(vm.managingField1,vm.managingField2);

					var dataToServer = peopleSharedAPIService.DataToServerManagingPositon(managingPosition,vm.userId);
					
					peopleSharedAPIService.UpdateManagingPositon(updateManagingPositionURL,"PUT",dataToServer,$scope).then(function(resp){
						
						//This flag is to display the message for the successfully edited
						vm.editFormSubmittedMsg = true;

						//This will update the UI
						vm.singlePeopleData.Consultant_Additional_Detail[0].Management_Position =managingPosition.replace("||",", ");
						
						////now update the ls for the refresh part
							//getting the value from local storage
						var peopleInfoLS = peopleSharedAPIService.getFromLS(constantAPIService.PERSON_INFO);
						if(peopleInfoLS != "undefined" && peopleInfoLS != null && peopleInfoLS != "")
						{	
								//convert the ls data to object form
								var temp = JSON.parse(peopleInfoLS)
								//console.log(temp);
								if(temp != null || temp != undefined){
									var consultantAdditonalDetail = temp.Consultant_Additional_Detail;
									if(consultantAdditonalDetail.length > 0){
											
											//Setting the value of Managing Position
											temp.Consultant_Additional_Detail[0].Management_Position  = commonAPIService.replaceAllOccurance(managingPosition,'||',', ');
											
											//var tempStringify = JSON.stringify(temp);
											peopleSharedAPIService.setToLS(constantAPIService.PERSON_INFO,temp);

									}//consultantAdditionDetail		
								}//if peopleInfoLS

						}//end of people info 
						
					});///end updateManagingpostion

				}//scope editfrom Modal 
			}//end of function (Save edit )


		}//peopleDetailController

})(); // function end
	