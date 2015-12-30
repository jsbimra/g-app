(function() {
	 'use strict';

angular.module('xCCeedGlobalApp')
	.factory('contactAPIService',function($http,$location,$timeout,constantAPIService,commonAPIService){
		var contactAPI = {};

		contactAPI.DataToServer = function(msg,uid){
			 var datatoServer = {
				User_Id: uid,
				message: msg
			}

			return datatoServer;

		}//datatoserver

		//adding the contact in the data base
		contactAPI.SetContact = function(baseUrl,verb,dataToServer,scope){
			var obj = commonAPIService.allVerbasFunction(baseUrl,"POST",dataToServer);
			obj.getPostData().success(function(data,status, header, config){
				if(data != null){
					
				//after success full entry in the data base
                commonAPIService.triggerModel("success-alert","redirect","Success",constantAPIService.INSERTION_SUCCESS,"OK","","#people",scope.alertInfo);

				}
				//console.log(data);
			}).error(function(data,status, header, config){

				//Off of loading flag
				scope.$parent.loadingFlag = false;

				//this is to show the service error
				commonAPIService.triggerModel("error-alert","alert","Error",constantAPIService.SERVICE_ERROR,"OK","","",scope.alertInfo);
			
			});//end of the service call
		
		}//getResult ended
		return contactAPI;
	});//end of Contact
})();