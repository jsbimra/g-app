(function(){
	'use strict';
	angular.module('xCCeedGlobalApp')
		.controller('loginController', ['$scope','$http','$location','loginAPIService','constantAPIService','commonAPIService', loginController]);

	loginController.$inject = ['masterDataList'];

	/* @ngInject */
	function loginController($scope,$http,$location,loginAPIService,constantAPIService,commonAPIService,masterDataList){

		var vm = this;

		alert('login hello');

		vm.submitted = false;

		//call to function on load;
		addClassToBody();
		
		//OFF the loadingFlag 
		$scope.$parent.loadingFlag = false;

		//this is to set the alert model object 
		$scope.$parent.alertInfo = commonAPIService.modelPopUp();
		

		//Functions
		$scope.Login = function($event){

			$event.preventDefault();
			
			vm.submitted = true;

			if(!$scope.frmLogin.$valid){

				return;
			}

			//ON Loading flag
			$scope.$parent.loadingFlag = true;

			//variable decleration
			var vm_hidekey = CryptoJS.enc.Utf8.parse($('#hidKey').val());
			var vm_hideIv = CryptoJS.enc.Utf8.parse($('#hidIv').val());
			var vm_hidSecret = $('#hidSecret').val()
			//console.log(vm);
			//console.log($scope);
			var vm_userID = vm.userID;
			var vm_userPassword = vm.userPassword;
			var vm_DeviceID = commonAPIService.getFromLS(constantAPIService.DEVICE_ID);
			var baseURL = constantAPIService.BASE_SERVICE_URL + constantAPIService.routingDetails().LOGIN_HTML;
			var baseURLRegistration = constantAPIService.BASE_SERVICE_URL + constantAPIService.routingDetails().LOGIN_REGISTRATION;
			
			//convert the password in the encryoted token and store in the hidden field
			var encryptionToken = loginAPIService.DatEncryptionToken(vm_userPassword,vm_hidekey,vm_hideIv,vm_hidSecret);
			$('#hidEncrypted').val(encryptionToken);

			//object for the conversion to pass the value to the server.
			var dataToServer = loginAPIService.DataToServer(vm_userID,$('#hidEncrypted').val(),vm_DeviceID);

			//this is to check the internet connection
			if (commonAPIService.checkNetworkConnection() === 'ONL'){	
				// //this is to check whether the data is for the application or the registration form
				// if (constantAPIService.IS_REGISTRATION === true){
				// 	//login service call (Not all the operation and setting is done in loginService)
				// 	loginAPIService.GetResultForRegistration(baseURLRegistration,"POST",dataToServer,$scope);
				// }
				// else
				// {
				// 	//login service call (Not all the operation and setting is done in loginService)
					
					///Note: Registration page is seperated to resolved the ie 9 issue so no need of registration 
					loginAPIService.GetResult(baseURL,"POST",dataToServer,$scope);
				// }
			}
			else{
				$scope.$parent.loadingFlag	= false;
				commonAPIService.triggerModel("error-alert","alert",constantAPIService.INTERNET_ERROR_HEADING,constantAPIService.INTERNET_ERROR,"OK","","",$scope.alertInfo);
			}
			
		}//end of login function

		 
		function addClassToBody()
		{
			$('body').addClass('login-page');
		}//end of addClassToBody

		
	}
	
	//end controller
})();

