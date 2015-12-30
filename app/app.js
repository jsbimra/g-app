
(function(){

	'use strict';

	angular.module('xCCeedGlobalApp',['ngRoute','ngMessages', 'ngAnimate', 'infinite-scroll']);

	//on run set the access token
	angular.module('xCCeedGlobalApp')
		.run(function($http,$rootScope,$location,commonAPIService,constantAPIService){
			

        		//route scope if rootchange is done and use is not loggedin.
				$rootScope.$on('$routeChangeStart',function(event,next,current){
					//This function is used to send the header value.
					 var accessToken = commonAPIService.getFromLS(constantAPIService.LOGIN_TOKEN);

		    		 if(accessToken != undefined && accessToken != ''){
		    		 	accessToken = JSON.parse(accessToken);
		        		$http.defaults.headers.common.Authorization = "Bearer " + accessToken;   
		        	 }
		        	 
					//STORING THE LOGIN INFO IN LOCAL STORAGE FOR THE PAGE REFRESH ISSUE.(iMPORTANT)
					var successLoginLS = commonAPIService.getFromLS(constantAPIService.SUCCESS_LOGIN);
					if(($rootScope.successLogin === null || $rootScope.successLogin === undefined)  
						&& (successLoginLS === null || successLoginLS === undefined || successLoginLS === ""))
					{
						//console.log(next);
						if(next.originalPath === "/people" || 
							next.originalPath === "/peopleDetails" || 
							next.originalPath === "/filterPeople" || 
							next.originalPath === "/contactAdmin")
						{
							$location.path("/login");
						}
					}//$rootScopeChangeStart login block
					else{
						//console.log($location.path);
						if(next.templateUrl === './login/login.html'){
							if(successLoginLS != null || successLoginLS != undefined || successLoginLS != ""){
								//this feature is tested only for logged 
								$location.path("/people");	
							}//if
							event.preventDefault();
						}
					}

					//console.log(event);
					//console.log(next);
					//console.log(current);
				});//end of root scope
        		
    			
		});
})();