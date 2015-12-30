(function(){
	angular.module('xCCeedGlobalApp')
		.controller('parentController',['$http', '$rootScope', '$location', '$scope', '$route', 'constantAPIService','commonAPIService','parentAPIService', parentController]);
		
	function parentController($http, $rootScope, $location, $scope, $route, constantAPIService,commonAPIService,parentAPIService){
		
		var vm = this;

		vm.peopleHeading 		= 'xCCeed Global';
		vm.peopleDetailHeading 	= 'Profile Details';
		vm.filterHeading 		= 'Filters';
		vm.contactHeading		= 'Contact';
		vm.alertInfo			= commonAPIService.modelPopUp();

		$scope.loadingFlag		= true;

		/* Route Change Start event to check the navigating path*/
		$scope.$on('$routeChangeStart', function(next, current) {
			/* If current path is filter page, hide the default scrollbar on body or html */
			if(current.originalPath == '/filterPeople'){
			//if(current.originalPath == '/filterPeople' || current.originalPath == '/people'){ //for people page
				$('html').css({overflow: 'hidden'});
			}else{
				$('html').css({overflow: 'auto'});
			}
		});

	}//end of people controller4

})(); // function end