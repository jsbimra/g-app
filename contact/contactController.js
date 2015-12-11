(function(){
	'use strict';
	
angular.module('xCCeedGlobalApp')
	.controller('contactController',['$scope','constantAPIService','commonAPIService','contactAPIService',contactController]);
		
		//
		function contactController($scope,constantAPIService,commonAPIService,contactAPIService){
			
			//variable decelearation
			var vm = this;
			vm.contactHeader = true;
			$scope.$parent.loadingFlag = false;
			var baseURL = undefined;
			//this is to set the alert model object 
			$scope.$parent.alertInfo = commonAPIService.modelPopUp();

			//functions
			$scope.saveContact = function($event){

				$event.preventDefault();

				//this variable is set for the validation
				$scope.submitted = true;

				/* 	If form is not valid return back this condition and form must have ng-model to validate the fields, 
					else it won't work Angular way!
				 */
				if(!$scope.contactForm.$valid){
					return;
				}


				//set the base url
				baseURL = constantAPIService.BASE_SERVICE_URL + constantAPIService.routingDetails().CONTACT_ADMIN;

				//get the logged in user from ls
				var loggedInUser = commonAPIService.getFromLS(constantAPIService.EMPLOYEE_USER_ID);	

				//get the message from the ui
				var contactAdminMsg = contactAdminMsgBox.value;
				
				//validate the ui.
				//contactAPIService.validateContact(contactAdminMsg,$scope);
				var dataToServer = contactAPIService.DataToServer(contactAdminMsg,loggedInUser);

				//login service call (Not all the operation and setting is done in loginService)
				contactAPIService.SetContact(baseURL,"POST",dataToServer,$scope);
				
			}//end of add contact

		}//end of people controller
})(); // function end