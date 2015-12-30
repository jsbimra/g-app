(function() {
	 'use strict';

angular.module('xCCeedGlobalApp')
	.factory('constantAPIService', function(){

		var constantService={};

		//constant value local storage (On Login)
		constantService['DEVICE_ID']			= 'Glo_Device_ID';
		constantService['CONSULTANT_NAME'] 		= 'Glo_Consultant_Name';
		constantService['EMPLOYEE_ID'] 			= 'Glo_Employee_Id';
		constantService['EMPLOYEE_USER_ID'] 	= 'Glo_Employee_User_Id';
		constantService['ROLE_ID'] 				= 'Glo_Role_Id';
		constantService['LOGIN_TOKEN'] 			= 'Glo_Login_Token';
		constantService['SUCCESS_LOGIN'] 		= 'Glo_Success_Login';
		//constantService['PEOPLE_INFO'] ='People_Info';
		//-----------------------------------------------------------------------
		//master data storage in the ls (While master data load)
		constantService['CAPABILITIES'] 		= 'Glo_Capabilities';
		constantService['COUNTRIES'] 			= 'Glo_Countries';
		constantService['SECTORS'] 				= 'Glo_Sectors';
		constantService['DIGITAL_SKILL'] 		= 'Glo_Digital_Skills';
		constantService['LANGUAGES']			= 'Glo_Language';
		constantService['DESIGNATION']			= 'Glo_Designation';
		//------------------------------------------------------------------------
		//from detail page of person
		constantService['PERSON_INFO'] 			= 'Glo_Person_Info';
		constantService['MY_PERSONALDETAILS']	= 'Glo_My_PersonalDetails';
		
		//------------------------------------------------------------------------

		//------------------------------------------------------------------------
		//Filter's Contants keys
		constantService['FILTER_SIDE_NAV_LIST'] = [
				{name: 'Country', lsKey: constantService.COUNTRIES}, 
				{name: 'Sector', lsKey: constantService.SECTORS}, 
				{name: 'Capabilities', lsKey: constantService.CAPABILITIES}, 
				{name: 'Digital Skills', lsKey: constantService.DIGITAL_SKILL }, 
				{name: 'Designation', lsKey: constantService.DESIGNATION}, 
				{name: 'Language', lsKey: constantService.LANGUAGES}

			];
		constantService['APPLIED_FILTERS_KEY'] 		= 'XceedGlobal.appliedFilters';
		constantService['APPLIED_FILTERS_OBJ'] 		= 'Glo_AppliedFiltersObj';
		constantService['APPLIED_FILTERS_COUNT'] 	= 'Glo_AppliedFiltersCount';
		//------------------------------------------------------------------------

		//global variable for the service path
		//constantService['BASE_SERVICE_URL'] = "http://localhost:59734/api/";
		constantService['BASE_SERVICE_URL'] 	= 'https://inccgraphics.in.capgemini.com/xCCeedGlobalDevService/api/';
		//constantService['BASE_SERVICE_URL'] 	= 'https://inccgraphics.in.capgemini.com/xCCeedGlobalRegistrationQAService/api/';
		//------------------------------------------------------------------------
		//routing info to service
		constantService.routingDetails = function(){
			var routingInfo = {};

			routingInfo['LOGIN_HTML'] 			= 'Login';
			routingInfo['PEOPLE_HTML'] 			= 'Profiles';
			routingInfo['PEOPLE_FILTER']		= 'Profiles/Filter/';
			routingInfo['PEOPLE_ADD_DETAIL']	= 'Profiles/';
			routingInfo['MASTER_SKILLS'] 		= 'MasterData/GetCombinedList';
			routingInfo['CONTACT_ADMIN']		= 'SetContact';
			routingInfo['REGISTRATION']			= 'ProfileRegistration/AddConsultant'; //This code will work only with registration page.
			routingInfo['LOGIN_REGISTRATION']	= 'LoginRegistrationData';
			routingInfo['EDIT_MANAGING_POSITION'] = 'Profiles/UpdateMangingPosition';
			routingInfo['SEARCH_SERVICE']		= 'Profiles/Search';
			return routingInfo;
		}

		//Modal popup messages constant for service
		constantService['SERVICE_ERROR'] 		= "Could not connect to the server.Please try after some time";
		constantService['INSERTION_SUCCESS']	= "Your message submitted successfully."
		constantService['LOGIN_VALIDATION']		= 'Invalid user id entered. Please enter a correct user id.';
		//------------------------------------------------------------------------

		//Registration Setting---------------------------------------------------
		constantService['IS_REGISTRATION']		= false;
		constantService['REGISTRATION_MESSAGE_AVAILABLE'] = 'Your data is already available in the system.';
		constantService['AD_DETAILS_INFO'] 		= 'AD_PERSONAL_DETAIL';
		constantService['DEFAULT_PATH']			= 'Default_Path'
		//-----------------------------------------------------------------------
		return constantService;
	});
})();