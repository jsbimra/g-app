(function() {
	 'use strict';

angular.module('xCCeedGlobalApp')
	.factory('parentAPIService',function($http,$location,$rootScope,$timeout,constantAPIService,commonAPIService){
		var parentAPI = {};
		
		//logout functionality
		parentAPI.Logout = function(){
			commonAPIService.clearSpecificLS();
			commonAPIService.clearSS();
			$rootScope.successLogin = undefined;
			$location.path('/');
			
		}//getResult ended

		return parentAPI;
	});//end of Contact
})();