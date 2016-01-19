(function(){
	'use strict';	

	angular.module('xCCeedGlobalApp')
		.controller('myDetailController',['$scope','$filter','constantAPIService','commonAPIService','peopleSharedAPIService',myDetailController]);
		
		/* @ngInject */
		function myDetailController($scope,$filter,constantAPIService,commonAPIService,peopleSharedAPIService){
			
			//variable decelaration
			var vm = this;
			var sharedPeopleData = undefined;
			var baseAdditionDetailURL =  constantAPIService.BASE_SERVICE_URL + constantAPIService.routingDetails().PEOPLE_ADD_DETAIL;
			vm.peopleDetailHeader = true;
			vm.singlePeopleData = undefined;
			vm.editFormSubmitWaitingMsg = false;
			vm.editFormSubmittedMsg = false;
			vm.LoggedInRole = peopleSharedAPIService.RoleFromLS;
			vm.showEditModal = showEditModal;
			vm.saveEditForm = saveEditForm;

			//edit modal
			$scope.editInfo = peopleSharedAPIService.modelEditPopUp();
			//this is to set the alert model object 
			$scope.$parent.alertInfo = commonAPIService.modelPopUp();

			//ON Loading flag
			$scope.$parent.loadingFlag = true;
			
			//getting the value from local storage
			var peopleInfoLS = peopleSharedAPIService.getFromLS(constantAPIService.MY_PERSONALDETAILS);
			

			if(peopleInfoLS != "undefined" && peopleInfoLS != null && peopleInfoLS != "")
			{
				//console.log(peopleInfoLS);
				//vm.singlePeopleData = (typeof peopleInfoLS === 'object' ? peopleInfoLS : JSON.parse(peopleInfoLS));
				var dataForManipulation = (typeof peopleInfoLS === 'object' ? peopleInfoLS : JSON.parse(peopleInfoLS));
				
				if(dataForManipulation != null || dataForManipulation != undefined){
					//sending the data for the manupulation
					vm.singlePeopleData=peopleSharedAPIService.manupulateInfoBeforeLoading(dataForManipulation);
				}//end if
				
				//ON Loading flag
				$scope.$parent.loadingFlag = false;

			}//end if
			else{
				showMyDetailView();
			}
		

			//This function is bring the data from the server of personal information
			function showMyDetailView(){
				//get the use id
				var loggedInUserID = JSON.parse(peopleSharedAPIService.getFromLS(constantAPIService.EMPLOYEE_USER_ID));

				if(loggedInUserID != "undefined" && loggedInUserID != null && loggedInUserID != "")
				{
					var baseAdditionDetailURLConcat = undefined;
					baseAdditionDetailURLConcat=baseAdditionDetailURL.concat(loggedInUserID);
					manipulationAdditonalDetail(baseAdditionDetailURLConcat);
				}

			}
			
			//This is to pull the data for the personal information from the system
			function manipulationAdditonalDetail(baseURL){
				//ON Loading flag
				$scope.$parent.loadingFlag = true;
				
				//this is to check the internet connection
				if (commonAPIService.checkNetworkConnection() === 'ONL'){
					peopleSharedAPIService.GetAdditionalDataResult(baseURL,"GET",$scope).then(function(resp){
						if(resp !== null && resp !== undefined){

								if('data' in resp){	
									//save the personal details information in the ls
									commonAPIService.setInLS(constantAPIService.MY_PERSONALDETAILS,resp.data);	

									//
									//console.log(peopleInfoLS);
										//vm.singlePeopleData = (typeof peopleInfoLS === 'object' ? peopleInfoLS : JSON.parse(peopleInfoLS));
										var dataForManipulation = resp.data;
										
										if(dataForManipulation != null || dataForManipulation != undefined){
											//sending the data for the manupulation
											vm.singlePeopleData=peopleSharedAPIService.manupulateInfoBeforeLoading(dataForManipulation);
										}//end if	
									//

								}//end of if
							}//resp data
							
								//OFF of the loading flag
								$scope.$parent.loadingFlag = false;
						});//end of the fucntion
				}//end of if internet connection check
				else
				{
					$scope.$parent.loadingFlag	= false;
					commonAPIService.triggerModel("error-alert","alert","Error",constantAPIService.INTERNET_ERROR,"OK","","",$scope.alertInfo);
				}//end internet connection
	
			}//end manipulationAdditonalDetail



			///Note changes made in myDetails controller need to be changed peopleDetail controller
			function showEditModal(managingPositionValue,userId){
				peopleSharedAPIService.showEditModal(vm,$scope,managingPositionValue,userId);
			}//end showedit modal


			/* Save edit form */
			function saveEditForm(){
				var updateManagingPositionURL = constantAPIService.BASE_SERVICE_URL + constantAPIService.routingDetails().EDIT_MANAGING_POSITION;
				if($scope.frmEditModal.$valid === false){return;}else{
					//console.log('you can submit the form');
					
					//ON Loading flag
					$scope.$parent.loadingFlag = true;

					var managingPosition = peopleSharedAPIService.FormatData(vm.managingField1,vm.managingField2);

					var dataToServer = peopleSharedAPIService.DataToServerManagingPositon(managingPosition,vm.userId);
					
					//this is to check the internet connection
					if (commonAPIService.checkNetworkConnection() === 'ONL'){
						vm.editFormSubmitWaitingMsg = true;
						peopleSharedAPIService.UpdateManagingPositon(updateManagingPositionURL,"PUT",dataToServer,$scope,vm).then(function(resp){
							
							//This flag is to display the message for the successfully edited
							$scope.$parent.loadingFlag = false;
							vm.editFormSubmitWaitingMsg = false;
							vm.editFormSubmittedMsg = true;

							//This will update the UI
							vm.singlePeopleData.Consultant_Additional_Detail[0].Management_Position = managingPosition.replace("||",", ");
							
							////now update the ls for the refresh part
								//getting the value from local storage
							var peopleInfoLS = peopleSharedAPIService.getFromLS(constantAPIService.MY_PERSONALDETAILS);
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
												peopleSharedAPIService.setToLS(constantAPIService.MY_PERSONALDETAILS,temp);

										}//consultantAdditionDetail		
									}//if peopleInfoLS

							}//end of people info 
							
						});///end updateManagingpostion

					}//end of internet check
					else
					{
						$scope.$parent.loadingFlag	= false;
						commonAPIService.triggerModel("error-alert","alert",constantAPIService.INTERNET_ERROR_HEADING,constantAPIService.INTERNET_ERROR,"OK","","",$scope.alertInfo);
					}

				}//scope editfrom Modal 
			}//end of function (Save edit )
			
			

		}//peopleDetailController

})(); // function end
