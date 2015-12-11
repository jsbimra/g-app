(function() {
	 'use strict';

angular.module('xCCeedGlobalApp')
	.factory('loginAPIService',function($http,$location,$rootScope,$timeout,constantAPIService,commonAPIService){
		
		//variable declaration
		var loginAPI={};

		//data encryption logic
		loginAPI.DatEncryptionToken = function(password,key,iv,hideSecret){
			var encryptionToken =CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(password), hideSecret, key,
			{
				keySize: 128,
				iv: iv,
				mode: CryptoJS.mode.CBC,
				padding: CryptoJS.pad.pkcs7
			});

			return encryptionToken;

		}//dataencryption

		loginAPI.DataToServer = function(uid,pass,devid){
			 var datatoServer = {
				UserId: uid,
				Password: pass,
				DeviceId: devid
			}

			return datatoServer;

		}//datatoserver
		

		loginAPI.GetResult = function(baseUrl,verb,dataToServer,scope){
						
			var obj = commonAPIService.allVerbasFunction(baseUrl,"POST",dataToServer);
			obj.getPostData().success(function(data,status, header, config){
				if(data != null){
					loginAPI.storeIntoLS(data);
					
					$('body').removeClass('login-page');
					
					//setting the value to broadcast
					$rootScope.successLogin = true;

					//OFF loading Flag
					scope.$parent.loadingFlag = false;

					$location.path('/people');


				}
				//console.log(data);
			}).error(function(data,status, header, config){

				//Off of loading flag
				scope.$parent.loadingFlag = false;

				//this is to show the service error
				commonAPIService.triggerModel("error-alert","alert","Error",constantAPIService.SERVICE_ERROR,"OK","","",scope.alertInfo);
			});
	
		}//getResult ended


		//After Login store the value in the localstorage
		loginAPI.storeIntoLS = function(data){
			//consultant name
			commonAPIService.setInLS(constantAPIService.CONSULTANT_NAME,data.Consultant_Name);
			//Employee Id
			commonAPIService.setInLS(constantAPIService.EMPLOYEE_ID,data.Employee_Id);
			//Employee User Id
			commonAPIService.setInLS(constantAPIService.EMPLOYEE_USER_ID,data.Employee_User_Id);
			//Role ID
			commonAPIService.setInLS(constantAPIService.ROLE_ID,data.Role_Id);
			//Token
			commonAPIService.setInLS(constantAPIService.LOGIN_TOKEN,data.Token);
			//successLogin (to check the logged in successful and on refresh it can be usedfull in future)
			commonAPIService.setInLS(constantAPIService.SUCCESS_LOGIN,'successLogin');
		}

		return loginAPI;

	})//factory end

})();