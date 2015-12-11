angular.module('xCCeedGlobalApp')
	.factory('peopleAPIService',function($http,$location,$timeout,$filter,constantAPIService,commonAPIService){
		//variable declaration
		var peopleAPI={};
		//var peopleAPI.sharedData = {};



		peopleAPI.GetResult = function(baseUrl,verb,scope){
			var result = false;
			var obj = commonAPIService.allVerbasFunction(baseUrl,verb);
      		
      		return obj.getTypeData().success(function(data,status, header, config){
			}).error(function(data,status, header, config){
				//console.log('Error');
				//Off of loading flag
				scope.$parent.loadingFlag = false;

				//this is to show the service error
				commonAPIService.triggerModel("error-alert","alert","Error",constantAPIService.SERVICE_ERROR,"OK","","",scope.alertInfo);
			});

			return result;
		}//getResult ended


		//get the addition details and personal details data
		peopleAPI.GetAdditionalDataResult = function(baseUrl,verb,scope){
			var result = false;
			var obj = commonAPIService.allVerbasFunction(baseUrl,verb);
      		
      		return obj.getTypeData().success(function(data,status, header, config){
			}).error(function(data,status, header, config){
				//console.log('Error');
				//Off of loading flag
				scope.$parent.loadingFlag = false;

				//this is to show the service error
				commonAPIService.triggerModel("error-alert","alert","Error",constantAPIService.SERVICE_ERROR,"OK","","",scope.alertInfo);
			});

			return result;
		}//getResult ended

		//redirecting to perople details 
		peopleAPI.redirectToDetail = function(){
			$location.path('/peopleDetails');
		}

		//filtering is handled in the service for the 
		peopleAPI.filterForDetails = function(peopleList,id){
			return $filter('filter')(peopleList,{User_Id:id});
		}

		peopleAPI.myProfileInLS = function(peopleList)
		{
			var employeeID = JSON.parse(commonAPIService.getFromLS(constantAPIService.EMPLOYEE_USER_ID));
			var myDetailsInLS = commonAPIService.getFromLS(constantAPIService.MY_PERSONALDETAILS);

			//This functionality is to check the data is present in ls ,if not then set into ls
			if(myDetailsInLS === null || myDetailsInLS === undefined || myDetailsInLS === ""){ 

					//Filter the list of people and get the personal information list on the basis of employee id 
					var myProfileData = peopleAPI.filterForDetails(peopleList,employeeID);//$filter('filter')(peopleList,employeeID);
					
					return myProfileData;
					// //save the personal details information in the ls
					// commonAPIService.setInLS(constantAPIService.MY_PERSONALDETAILS,myProfileData);
				}//end if 
		}
		return peopleAPI;
	});//end peopleAPISerivce;