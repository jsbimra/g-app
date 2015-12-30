(function(){
	'use strict';

	angular.module('xCCeedGlobalApp')
		.config(["$routeProvider",  function($routeProvider){
			$routeProvider.
				when('/',
				{
					templateUrl: './login/login.html',
					controller: 'loginController',
					controllerAs: 'loginctrl',
					resolve: {
						masterDataList: function(masterAPIService){
							
							//console.log( masterAPIService.getMasterData());
							return masterAPIService.HCMasterData();
						}
					}
				}).
				when('/login',
				{
					templateUrl: './login/login.html',
					controller: 'loginController',
					controllerAs: 'loginctrl'
					// resolve: {
					// 	masterDataList: function(masterAPIService){
							
					// 		//console.log( masterAPIService.getMasterData());
					// 		return masterAPIService.getMasterData();
					// 	}
					// }
					//publicAccess: true
				}).
				when('/people',
				{
					templateUrl: './people/People.html',
					controller: 'peopleController',
					controllerAs: 'peopleCtrl'
				}).
				when('/peopleDetails',
				{
					templateUrl: './people/peopleDetail/peopleDetail.html',
					controller: 'peopleDetailController',
					controllerAs: 'peopleDetailCtrl'
				}).
				when('/myDetails',
				{
					templateUrl: './people/peopleDetail/peopleDetail.html',
					controller: 'myDetailController',
					controllerAs: 'peopleDetailCtrl'
				}).
				when('/filterPeople',{
					templateUrl:'./filters/filterPeople.html',
					controller:'filterController',
					controllerAs: 'filterCtrl'
				}).
				when('/contactAdmin',
				{
					templateUrl: './contact/contact.html',
					controller: 'contactController',
					controllerAs: 'contactCtrl'
				}).
				when('/logout',
				{
					controller: 'parentController',
					controllerAs: 'parentCtrl',
					resolve: {
						logout: function(parentAPIService){
							return parentAPIService.Logout();
						}
					}//end of rresolve
				}).
			    otherwise({
			    	redirectTo: '/login'
			    });
		}]);


})();

