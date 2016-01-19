(function(){
	'use strict';

angular.module('xCCeedGlobalApp').value('THROTTLE_MILLISECONDS', 250);

angular.module('xCCeedGlobalApp')
	.controller('peopleController',['$scope','$http', 'infiniteFactory', 'constantAPIService','commonAPIService','peopleAPIService','peopleSharedAPIService','filterAPIService',peopleController]);
		
	/* @ngInject */
	function peopleController($scope,$http, infiniteFactory, constantAPIService,commonAPIService,peopleAPIService,peopleSharedAPIService,filterAPIService){
		
		//console.log('people controller');
		//alias name 
		var vm = this;
		var baseURL = constantAPIService.BASE_SERVICE_URL + constantAPIService.routingDetails().PEOPLE_HTML;
		var baseAdditionDetailURL =  constantAPIService.BASE_SERVICE_URL + constantAPIService.routingDetails().PEOPLE_ADD_DETAIL;
		var baseAdditionDetailURLConcat = undefined;
		var filterCounter = 1;
		var peopleFlagCounter = 1;//This flag is to stop the scroll call to web service if there is no data found.
		var filterFlagCounter = 1;
		

		//this is to set the alert model object 
		$scope.$parent.alertInfo = commonAPIService.modelPopUp();

		vm.nameFilter= '';
		vm.peopleHeader = true;
		vm.showFilterFooterUI = false;
		vm.showNoRecordsUI = false;
		vm.appliedFilterActive = false;
		vm.firstCallRequested = false;
		vm.peopleList = [];
		vm.searchResultArr = [];
		vm.createAlphaScroll = createAlphaScroll;
		vm.checkInternetConnection = false;
		
		//ON Loading flag
		$scope.$parent.loadingFlag = true; //vm.peopleList.length == 0 ? false : true;
				
		vm.loadAllPeopleList = loadAllPeopleList;
		

		$scope.customInfiScroll = new infiniteFactory();
	
		//console.log($scope.customInfiScroll.items);

		
		/* Load people list on every load */
		//loadAllPeopleList();

		//This function is to load all the information
		function loadAllPeopleList(){
			//this is to check the internet connection
			if (commonAPIService.checkNetworkConnection() === 'ONL'){
				vm.checkInternetConnection = false;//This flag is to check the internet connection 			

				/* Make first call requested flag true */
				vm.firstCallRequested = true;

				var appliedFilterList = filterAPIService.getAppliedFiltersObj();

				//console.log(appliedFilterList);

				if((!$('#searchBtn .fa').hasClass('fa-eye-slash') && vm.nameFilter.length === 0) || 
					($('#searchBtn .fa').hasClass('fa-eye-slash') && vm.nameFilter.length === 0) )
				{
					
					if(appliedFilterList !== undefined && appliedFilterList !== null && appliedFilterList.length > 0){
										
						
						if(filterFlagCounter === 1)
						{
							var resultObj = $scope.customInfiScroll.nextPage(peopleAPIService.appliedFilterServiceURL,'POST', filterAPIService.DataToServer(),filterCounter,$scope);

							resultObj.success(function(data,status, header, config){
								vm.peopleList = $scope.customInfiScroll.items;
								
								//vm.showFilterFooterUI = vm.peopleList !== undefined && vm.peopleList !== null ? (vm.peopleList.length<7 ? true: false) : false;
								filterCounter += 1;

								//OFF Loading flag
								$scope.$parent.loadingFlag = false;

								/* set No records message flag */
								vm.showNoRecordsUI = true;

								vm.showFilterFooterUI = true;
								vm.appliedFilterActive = true;

								if(data.length === 0){
									filterFlagCounter = 0;
								}

								//binding auto complete on succes of request and let the dom get ready
								bindAutoComplete();

							});

							//console.log('If condition');
						}//filterFlagCounter
					}//end if
					else{
						if(peopleFlagCounter === 1)
						{

							//console.log('Else condition');
							//Off the filter icon
							vm.appliedFilterActive = false;
							//$scope.$parent.loadingFlag = true;


							//get the list all of the employee (filter not applied)
							var userProfilesURL=baseURL.concat("/GetAll/");

							var resultObj = $scope.customInfiScroll.nextPage(userProfilesURL, "GET", undefined,filterCounter,$scope);

							resultObj.success(function(data,status, header, config){
								//vm.peopleList = data;
								vm.peopleList = $scope.customInfiScroll.items;

								//This value is value is scrolled the option for the filter footer is applied
								//vm.showFilterFooterUI = vm.peopleList !== undefined && vm.peopleList !== null ? (vm.peopleList.length<7 ? true: false) : false;

								//myAdditionalDetail
								myAdditionalDetail();

								//OFF Loading flag
								$scope.$parent.loadingFlag = false;
								
								vm.showFilterFooterUI = true;

								/* set No records message flag */
								vm.showNoRecordsUI = true;

								if(data.length === 0){
									peopleFlagCounter = 0;
								}
								
								//console.log(JSON.stringify(vm.peopleList));
								
								//binding auto complete on succes of request and let the dom get ready
								bindAutoComplete();
							});
						}//peopleFlagcounter
					
						
					}//end else

					
				}//end nameFilter

			}//CheckInternetConnection
			else
			{
				vm.peopleList = [];
				$scope.$parent.loadingFlag = false;
				vm.checkInternetConnection = true;
				
				
			}
				
				//vm.createAlphaScroll();

		}///

		//This is used to do the filtering at client side
		// //to search the value on the search
		// $scope.searchFilter = function(listItems)
		// {
		// 	// client side filtering stoped///////
		// 	var  filterSearchValue = vm.nameFilter;
		// 	if (filterSearchValue != ""){
		// 		var keyWord = new RegExp(filterSearchValue,'i');
		// 		//console.log	(keyWord.test);
		// 	}

		// 	//Searching is based on the first and last name
		// 	return !filterSearchValue || keyWord.test(listItems.First_Name) || keyWord.test(listItems.Last_Name);
		// 	///////////////////////////////

		// 	//server side filter
			
		// 	//
		// }//end of search


		//redirect to details view
		$scope.showPeopleDetailView = function(id){
			if(id != undefined && id != ''){

				//first set the details view list value to true
				//vm.detailViewUI = true;

				//delete the record from the LS first
				peopleSharedAPIService.removeFromLS(constantAPIService.PERSON_INFO);

				//filter the data on the basis of id
				var peopleRecord = peopleAPIService.filterForDetails(vm.peopleList,id);//$filter('filter')(vm.peopleList,id);

				//store it in one of the virtual memeory
				vm.detailViewRecord = peopleRecord[0];

				//For additionDetail hit the service
				baseAdditionDetailURLConcat = undefined;
				baseAdditionDetailURLConcat=baseAdditionDetailURL.concat(vm.detailViewRecord.User_Id);
				manipulationAdditonalDetail(baseAdditionDetailURLConcat,"peoplelist");


			}//end of if
		}//end showDetailView

		//This is to pull the data for the personal information from the system
		function manipulationAdditonalDetail(baseURL,fromLocation){
			//ON Loading flag
			$scope.$parent.loadingFlag = true;
			//this is to check the internet connection
			if (commonAPIService.checkNetworkConnection() === 'ONL'){
				peopleSharedAPIService.GetAdditionalDataResult(baseURL,"GET",$scope).then(function(resp){
					if(resp !== null && resp !== undefined){
							
							//OFF Loading flag
							$scope.$parent.loadingFlag = false;

							if('data' in resp){
								if(fromLocation == "peoplelist")
								{
									vm.detailViewRecord = resp.data;	

									peopleSharedAPIService.clearPeopleData();
									peopleSharedAPIService.setPeopleData(vm.detailViewRecord);
									
									//location redirect;
									peopleAPIService.redirectToDetail();
								}
								if(fromLocation == "myprofilelist")
								{
									vm.personalDetailViewRecord = resp.data;

									//save the personal details information in the ls
									commonAPIService.setInLS(constantAPIService.MY_PERSONALDETAILS,vm.personalDetailViewRecord);
								}

								//OFF Loading flag
								//$scope.$parent.loadingFlag = false;

								
							}
						}
					//console.log(data);
					});
			}
			else{
				$scope.$parent.loadingFlag	= false;
				commonAPIService.triggerModel("error-alert","alert",constantAPIService.INTERNET_ERROR_HEADING,constantAPIService.INTERNET_ERROR,"OK","","",$scope.alertInfo);
			}
		}//end manipulationAdditonalDetail

		//Logged ins user additional details information is loaded.
		function myAdditionalDetail(baseURL){
			//store the user profile data in the ls.
			if(vm.peopleList != null || vm.peopleList != undefined){
				var myProfileData=peopleAPIService.myProfileInLS(vm.peopleList);

					if(myProfileData != null || myProfileData != undefined){
					
						if(myProfileData.length > 0)
						{
							//this is to check the internet connection
							if (commonAPIService.checkNetworkConnection() === 'ONL'){
								baseAdditionDetailURLConcat = undefined;
								baseAdditionDetailURLConcat=baseAdditionDetailURL.concat(myProfileData[0].User_Id);
								manipulationAdditonalDetail(baseAdditionDetailURLConcat,"myprofilelist");
							}
							else
							{
								$scope.$parent.loadingFlag	= false;
								commonAPIService.triggerModel("error-alert","alert",constantAPIService.INTERNET_ERROR_HEADING,constantAPIService.INTERNET_ERROR,"OK","","",$scope.alertInfo);
							}
						}
					}//if myProfileData
			}//my people List	
		}

		function scrollTo(selector) {

			if(selector !== undefined && selector !== ''){

				if(angular.element(selector)[0] !== undefined){

					//console.log(selector);
				    $('.jsInfiniteScrollPanel ').scrollTo(selector, {offsetTop : '92'});	
				}else{
					console.log('No names with this character in the list');
				}
			}
		}

		function createAlphaScroll(){
				
			var alphabetChar = '', 
					alphabhets = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

			for(var i=0; i<alphabhets.length; i++){
				alphabetChar += '<a class="alpha jsAlphaChar" style="display:none;" data-scroll-id="#item-divider-'+alphabhets[i]+'">'+alphabhets[i]+'</a>';
				//href="#/people#item-divider-'+alphabhets[i].toLowerCase()+'"
			}
			var indexBarHtml = '<div class="indexbar jsAlphaBar">'+alphabetChar+'</div>';
				
			$('.jsInfiniteScrollPanel').append(indexBarHtml);

			setTimeout(function(){
				if($('.jsAlphaBar').length !== 0){
					var mh = $('.jsAlphaBar').height(),
						tm = mh/2;

						$('.jsAlphaBar').css({marginTop: -tm+'px'});
				}
			},0);
		}

		$(document).on('click','.jsAlphaChar', function(){
			var me = $(this), ele = me.data('scroll-id');
			scrollTo(ele);
		});


		//$(window).scroll(function(){
		//$('.jsInfiniteScrollPanel').scroll(function(){
			// /console.log('scrolled');
			//console.log($(this)[0].scrollTop);

			//if(this.scrollY > 50){ // if using window
			/*
			//Commented this code as showFilterFooterUI should be shown by default. 
			
			if($(this)[0].scrollTop > 50){ // if using panel div
				vm.showFilterFooterUI = true;
				$scope.$apply();
			}else{
				vm.showFilterFooterUI = false;
				$scope.$apply();
			}*/
		//});

		/* Setting viewport height for jsInfiniteScrollPanel div element */
		//setInfinitePanelHeight();

		$(window).resize(function(){
			//setInfinitePanelHeight();
		});

		/* Setting viewport height for jsInfiniteScrollPanel div element - END */
		function setInfinitePanelHeight(){
			var viewportH    = $(window).height(),
				headerHeight = 45;

			//console.log(viewportH + ' ' +headerHeight);
			$('.jsInfiniteScrollPanel').height(viewportH-headerHeight);
		}

		/* Autocomplete binding and functioning */
		function bindAutoComplete(){
			//console.log('invoked bind method');
            
			$("#autoCompleteSearch").autocomplete({
                focus: function(event, ui) {
                    $("#autoCompleteSearch").val(ui.item.label);
                },
                source: function(request,response) {

                	var searchData = {
                    		value: request.term
                	};
                	//this is to check the internet connection
					if (commonAPIService.checkNetworkConnection() === 'ONL'){
				        $http({
		                    method: 'POST',
		                    url: constantAPIService.BASE_SERVICE_URL + "Profiles/Search",
		                    data: searchData
		                }).success(function(data, status, headers, config) {
				    		//console.log(data);

				    		vm.searchResultArr = [];

				    		if(data != null){
				    			var finalSearchResult = data, objSearchResult = [];
				    				

				    			//console.log(finalSearchResult); 
				    			
				    			//This code is commented to not to show the value in the autocomplete list box directly show the data in peoplelist
				    			forEach(finalSearchResult,function(v,i)
				    			{
				    				var dataaa={label: finalSearchResult[i].User_Id,
				    					value:  finalSearchResult[i].First_Name + " " + finalSearchResult[i].Last_Name}

				    				//objSearchResult.push(finalSearchResult[i].First_Name + " " + finalSearchResult[i].Last_Name);
				    				vm.searchResultArr.push(finalSearchResult[i]);
				    			});
				    			// /response(objSearchResult.slice());	

	        					vm.peopleList = vm.searchResultArr;

	        					/* Remove autocomplete-loading class from input field on success */
				    			$("#autoCompleteSearch").removeClass('ui-autocomplete-loading');
				    		}
				    		
				    	}).error(function(data,status,headers,config){
				    		$scope.$parent.loadingFlag = false;

				    		//this is to show the service error
							commonAPIService.triggerModel("error-alert","alert","Error",constantAPIService.SERVICE_ERROR,"OK","","",$scope.alertInfo);
				    	});
				    }//if online check
				    else
				    {
				    	$scope.$parent.loadingFlag	= false;
						commonAPIService.triggerModel("error-alert","alert",constantAPIService.INTERNET_ERROR_HEADING,constantAPIService.INTERNET_ERROR,"OK","","",$scope.alertInfo);
				    }//end of online check
			    },
			    minLength: 3
            });
        }


        /* WATCH Block on nameFilter model as its length is empty invoke loadAllPeopleList method */
        $scope.$watch(angular.bind(this, function(nameFilter){
        	return this.nameFilter;
        }),function(newVal, oldVal){

       		//console.log('entered into watch');

        	if(newVal.length === 0 && vm.firstCallRequested){
       			
       			//console.log('entered into length condition ');

       			vm.firstCallRequested = false;
        		filterFlagCounter     = 1;
        		peopleFlagCounter     = 1;

       			//console.log('firstCallRequested ' + vm.firstCallRequested);

       			/* Only call the loadAllPeopleList method when firstCallRequested set to false */
        		if(vm.firstCallRequested === false){
	        		loadAllPeopleList();
        		}
        	}
        });
        /* Model WATCH Block end */

	}//end of people controller
})(); // function end
