/*	
	Author: Dhruv Mistry & Jatinder
	view file: filterPeople.html
	controller: filterController
	controllerAs: filterCtrl
*/

(function() {
    'use strict';

    angular.module('xCCeedGlobalApp')
        .controller('filterController', ['$scope', '$filter', '$location', '$timeout', 'constantAPIService', 'commonAPIService','filterAPIService','peopleSharedAPIService', filterController]);

    function filterController($scope, $filter, $location, $timeout, constantAPIService, commonAPIService,filterAPIService,peopleSharedAPIService) {

    	/* Define in custom.js to equal the height of sidebar with right panel */
    	columnHeight();

        var vm = this;
		
		var tempAppliedArr = [], 
            tempCategoryArr = [],
            defaultCatNames = ['Country_Name', 'Sector_Name', 'Capability', 'Digital_Skill_Name', 'Designation', 'Language'];

        //baseURL for filter
        var baseURL = constantAPIService.BASE_SERVICE_URL + constantAPIService.routingDetails().PEOPLE_FILTER;
        
        //OFF the loading controller
        $scope.$parent.loadingFlag = true;

        //this is to set the alert model object 
        $scope.$parent.alertInfo = commonAPIService.modelPopUp();
        
        //this is use to set the header
        vm.filterHeader           = true;
        vm.showListView           = true;
        vm.categoryVal            = true;
        vm.filterLoadingFlag      = false;
        vm.filterSNList           = constantAPIService.FILTER_SIDE_NAV_LIST;
        vm.loadListView           = loadListView;
        vm.saveFilters            = saveFilters;
        vm.clearFilters           = clearFilters;
        vm.applyFilters           = applyFilters;
        vm.appliedFiltersByCatObj = emptyAppliedFilterObj();

        var lsAppliedObj = localStorage.getItem(constantAPIService.APPLIED_FILTERS_OBJ);
        if(lsAppliedObj !== null &&  lsAppliedObj!== undefined && lsAppliedObj !== ''){
             vm.appliedFiltersByCatObjValues = JSON.parse(lsAppliedObj)[0];
        }else{

            vm.appliedFiltersByCatObjValues = emptyAppliedFilterCatObj();
   
        }
        /* Watch Block's */
        
        /*$scope.$watch(angular.bind(this, function(categoryVal){
            return this.categoryVal;
        }),function(newVal, oldVal){
            console.log(newVal + ' ' + oldVal);
        });*/

        /* Watch Block's END */

        //Load default Countries list view
        loadListView('Glo_Countries');

        function loadListView(lskey){
        	//$event.preventDefault();
        	
        	//console.log(lskey);

        	if(lskey !== undefined){
        		vm.showListView = true;

        		if(lskey in window.localStorage){
		        	var lsDataObj = JSON.parse(localStorage.getItem(lskey));

	        		//console.log(lsDataObj);

	        		if(lskey === 'Glo_Countries'){	        			
                        //vm.filterResultList = $filter('filter')(filterOutLSKeyNames(lsDataObj, defaultCatNames[0]), '!Country_Name');
		        		//vm.filterResultList = filterOutLSKeyNames(lsDataObj, defaultCatNames[0]);
                        vm.filterResultList = $filter('orderBy')(filterOutLSKeyNames(lsDataObj, defaultCatNames[0]));
                        //vm.categoryVal = 'Country_Name';
	        		}

	        		if(lskey === 'Glo_Sectors'){	        			
                        //vm.filterResultList = $filter('filter')(filterOutLSKeyNames(lsDataObj, defaultCatNames[1]), '!Sector_Name');
		        		//vm.filterResultList = filterOutLSKeyNames(lsDataObj, defaultCatNames[1]);
                        vm.filterResultList = $filter('orderBy')(filterOutLSKeyNames(lsDataObj, defaultCatNames[1]));

                        //vm.categoryVal = 'Sector_Name';
	        		}

	        		if(lskey === 'Glo_Capabilities'){	        			
                        //vm.filterResultList = $filter('filter')(filterOutLSKeyNames(lsDataObj, defaultCatNames[2]), '!Capability');
                        //vm.filterResultList = filterOutLSKeyNames(lsDataObj, defaultCatNames[2]);
                        vm.filterResultList = $filter('orderBy')(filterOutLSKeyNames(lsDataObj, defaultCatNames[2]));
                        //vm.categoryVal = 'Capability';
	        		}

	        		if(lskey === 'Glo_Digital_Skills'){	        			
                        //vm.filterResultList = $filter('filter')(filterOutLSKeyNames(lsDataObj, defaultCatNames[3]), '!Digital_Skill_Name');
                        //vm.filterResultList = filterOutLSKeyNames(lsDataObj, defaultCatNames[3]);
                        vm.filterResultList = $filter('orderBy')(filterOutLSKeyNames(lsDataObj, defaultCatNames[3]));
                        //vm.categoryVal = 'Digital_Skill_Name';
	        		}

	        		if(lskey === 'Glo_Designation'){	        			
                        //vm.filterResultList = $filter('filter')(filterOutLSKeyNames(lsDataObj, defaultCatNames[4]), '!Designation');
                        //vm.filterResultList = filterOutLSKeyNames(lsDataObj, defaultCatNames[4]);
                        vm.filterResultList = $filter('orderBy')(filterOutLSKeyNames(lsDataObj, defaultCatNames[4]));
                        //vm.categoryVal = 'Designation';
	        		}

	        		if(lskey === 'Glo_Language'){	        			
                        //vm.filterResultList = $filter('filter')(filterOutLSKeyNames(lsDataObj, defaultCatNames[5]), '!Language');
                        //vm.filterResultList = filterOutLSKeyNames(lsDataObj, defaultCatNames[5]);
                        vm.filterResultList = $filter('orderBy')(filterOutLSKeyNames(lsDataObj, defaultCatNames[5]));
                        //vm.categoryVal = 'Language';
	        		}

		        	/* Update list view if data available in localStorage */
		        	updateResultListUI(vm.filterResultList);

                    /* Update categoryVal model with lsKey */
                    vm.categoryVal = lskey !== undefined ? lskey : '';
                    

        		}else{
        			console.log(lskey + ' Not found in the localStorage');
        			vm.filterResultList = ['No data available for '+lskey];
        		}

                $timeout(function(){
                    $scope.$parent.loadingFlag = false;
                },500);

        	}
        }

        function setDefaultFilterBadges(tempArr){
            if(angular.isArray(tempArr) && tempArr.length !== 0){

                //console.log(vm.filterSNList);
                //console.log(tempArr);

                var appliedFiltersCntObj = getLocalStorageData(constantAPIService.APPLIED_FILTERS_COUNT);

                vm.appliedFiltersByCatObj = (appliedFiltersCntObj !== undefined || appliedFiltersCntObj !== null) ? appliedFiltersCntObj : vm.appliedFiltersByCatObj;
                //console.log(appliedFiltersCntObj);

                if(vm.filterSNList !== undefined && vm.filterSNList.length !== 0){
                    $timeout(function(){
                        angular.forEach(tempArr,function(val,idx){
                            angular.forEach(vm.filterSNList,function(obj,idx2){

                                // /console.log(obj.lsKey);

                                if(val === obj.lsKey){
                                    // /console.log(val + ' following matches found '+ obj.lsKey);
                                    var leftNavId = 'left-nav-'+val.toLowerCase();
                                    
                                    //console.log($('#'+leftNavId).find('.jsFilterLeftNavBadge').length);

                                    if($('#'+leftNavId).find('.jsFilterLeftNavBadge').length == 0){
                                        //console.log('Inside '+ leftNavId);
                                        $('#'+leftNavId).append('<span class="badge filter-badge jsFilterLeftNavBadge">'+appliedFiltersCntObj[obj.lsKey]+'</span>');
                                    }

                                    /* Count is zero remove the badge from that navigation */
                                    if(appliedFiltersCntObj[obj.lsKey] == 0){
                                        $('#'+leftNavId).find('.jsFilterLeftNavBadge').remove();
                                    }
                                }
                            });
                        });  
                        },10); 
                }

                /* Timeout for - let the DOM get ready */
                /*$timeout(function(){
                    console.log(catname);

                    if(tempCategoryArr.indexOf(catname) === -1 && ($('.active-list').length !== 0)){
                        tempCategoryArr.push(catname);
                        console.log(tempCategoryArr);
                    }
                },10);*/
                   
            }
        }
        function saveFilters($event, item, cname){
        	if(item !== undefined && item !== '' && cname !== undefined && cname !== ''){

        		var tarElem = angular.element($event.target), activeListCnt;

                if(!tarElem.hasClass('fa')){
                    if(!tarElem.hasClass('active-list')){
                        tarElem.append('<span class="state-icon fa fa-check"></span>').addClass('active-list');

                        activeListCnt = $('.active-list').length;

                        if($('.active.highlight-filter-wrap .jsFilterLeftNavBadge').length == 0){
                            $('.active.highlight-filter-wrap').append('<span class="badge filter-badge jsFilterLeftNavBadge">'+activeListCnt+'</span>');
                        }else{
                            $('.active.highlight-filter-wrap .jsFilterLeftNavBadge')
                                .text(activeListCnt)
                                .css({backgroundColor: commonAPIService.getRandomColor() });
                        }

                    }
                    else{

                        /* Update activeListCnt on filter badge */
                        activeListCnt = $('.active-list').length-1;
                        $('.active.highlight-filter-wrap .jsFilterLeftNavBadge')
                            .text(activeListCnt)
                            .css({backgroundColor: commonAPIService.getRandomColor() });

                        /* toggle tick on selected active-list item */
                        tarElem.find('span').remove();
                        tarElem.removeClass('active-list');

                        /* If there is no active-list item available remove the highlight filter dot*/
                        if($('.active-list').length ==0){
                            $('.active.highlight-filter-wrap').find('.jsFilterLeftNavBadge').remove();

                        }
                    }
                    
                    /* Call: to update applied filters values to local storage */
                    updateLSAppliedFilters(item, cname, tarElem);    
                }
        	}
        }

        function filterOutLSKeyNames(lsData, replaceKey){
        	if(lsData !== undefined && replaceKey !== undefined){

        		var tmpNameArr = [];

        		angular.forEach(lsData, function(obj, idx){

        			if(replaceKey in obj){
        				tmpNameArr.push($.trim(obj[replaceKey]));

                        /* Adding category name to back to list as required for set Default Badges*/
                        if(tmpNameArr.indexOf(replaceKey) === -1){
                            tmpNameArr.push(replaceKey);
                            vm.queryMatchStr = replaceKey;
                        }
        			}
        		});

        		return tmpNameArr;
        	}
        }

        function updateLSAppliedFilters(curSelItem, cname, tarElem){
        	if(curSelItem !== undefined && curSelItem !=''){

        		var index = tempAppliedArr.indexOf(curSelItem);

        		if(index === -1){
        			tempAppliedArr.push(curSelItem);

                    /* Call to update active count's of list */
                    updateActiveCountSelections(tarElem, cname,curSelItem);
        		}
        		else if(index > -1){
        			tempAppliedArr.splice(index,1);
                    
                    /* Call to update active count's of list */
                    updateActiveCountSelections(tarElem, cname,curSelItem);

        		}

                /* Adding category to tempAppliedArr */
                var cnameIndex = tempAppliedArr.indexOf(cname);
                if(cnameIndex === -1){
                    tempAppliedArr.push(cname);
                }

                /* Remove cname when active list count reaches 0 */
                if($('.active-list').length === 0){
                    tempAppliedArr.splice(cnameIndex,1);
                }

                
        		//console.log(tempAppliedArr);

        		//Save it to localStorage
        		localStorage.setItem(constantAPIService.APPLIED_FILTERS_KEY, JSON.stringify(tempAppliedArr));
        	}
        }

        function updateActiveCountSelections(tarElem, cname,curSelItem){
            /* Saving count of no of records added to tempAppliedArr, based on each category type */
            if(tarElem !== undefined && cname !== undefined){

                var qmStr = 'li[data-query-match="'+tarElem.attr('data-query-match')+'"].active-list',
                    qmSelLnt = $(qmStr).length;
                
                vm.appliedFiltersByCatObj[cname] = qmSelLnt;

                /* For creating object to save in localStorage */
                var modelCname = cname;
                    modelCname = modelCname.replace('Glo_','');

                var index = vm.appliedFiltersByCatObjValues[modelCname].indexOf(curSelItem);

                if(index === -1){
                    //console.log('pushing to array');
                    vm.appliedFiltersByCatObjValues[modelCname].push(curSelItem);
                }
                else if(index > -1){
                    //console.log('removing form array');
                    vm.appliedFiltersByCatObjValues[modelCname].splice(index,1);
                }

                var appliedObjArr = [];
                    appliedObjArr.push(vm.appliedFiltersByCatObjValues);

                //console.log(JSON.stringify(appliedObjArr));

                /* Update to localStorage */
                localStorage.setItem(constantAPIService.APPLIED_FILTERS_COUNT, JSON.stringify(vm.appliedFiltersByCatObj));
                localStorage.setItem(constantAPIService.APPLIED_FILTERS_OBJ, JSON.stringify(appliedObjArr));
                
            }
        }


        function updateResultListUI(lsDataObj){
        	//console.log(lsDataObj);

        	var afilters = getLocalStorageData(constantAPIService.APPLIED_FILTERS_KEY);
            /***
                If localStorage applied filters not underfined or not empty applied save filters to 
                tempAppliedArr, as on load tempAppliedArr should be have applied filters values 
            ***/
            tempAppliedArr = afilters !== undefined ? afilters : [];
        	
        	if(lsDataObj !== undefined && afilters !== undefined){
        		angular.forEach(lsDataObj, function(val,idx){

        			angular.forEach(afilters, function(val2, idx2){

        				if(val === val2){
        					//console.log('matched');

                            /* Timeout is required for dom get ready from ng-repeat */
        					$timeout(function(){
        						$('#list-item-'+(idx+1)).append('<span class="state-icon fa fa-check"></span>').addClass('active-list');
                                
                                /*$timeout(function(){
                                    if($('.active.highlight-filter-wrap .jsFilterLeftNavBadge').length == 0){
                                        $('.active.highlight-filter-wrap').append('<span class="badge filter-badge jsFilterLeftNavBadge">'+$('.active-list').length+'</span>');
                                    }else{
                                        $('.highlight-filter-wrap').find('.jsFilterLeftNavBadge').text($('.active-list').length);
                                    }
                                },0);*/
                                
        						return;
        					},0);
        				}
        			});
        		});

                /* Call: setDefaultFilterBadges() with categoryVal parameter */
                setDefaultFilterBadges(afilters);
        	}

        }

        function getLocalStorageData(keyName){
        	var lsResultData = localStorage.getItem(keyName);

        	if(lsResultData !== null && lsResultData !== undefined && lsResultData.length !== 0){
        		        		
        		return JSON.parse(lsResultData);
        	}
        }

        function clearFilters(){
            tempAppliedArr = [];
            localStorage.setItem(constantAPIService.APPLIED_FILTERS_KEY, tempAppliedArr);
            localStorage.setItem(constantAPIService.APPLIED_FILTERS_OBJ, tempAppliedArr);
            
            vm.appliedFiltersByCatObj = emptyAppliedFilterObj();
            vm.appliedFiltersByCatObjValues = emptyAppliedFilterCatObj();

            //Remove tick under active list items on filter result view
            $('.active-list').find('span').remove().end().removeClass('active-list');
            
            //Remove all the badges from filters left nav 
            $('.jsFilterLeftNavBadge').remove();
        }

        //This function is to call the apply filter
        function applyFilters(){ 
            /* No items in tempAppliedArr empty the appliedFilter localStroage values */
            if(tempAppliedArr.length === 0){
                localStorage.setItem(constantAPIService.APPLIED_FILTERS_OBJ, tempAppliedArr);
            }
            
            //This page will redirect to people page
            filterAPIService.redirectToDetail();
           
        }

        function emptyAppliedFilterObj(){
          return  {
                Glo_Countries: 0,
                Glo_Sectors: 0,
                Glo_Capabilities: 0,
                Glo_Digital_Skills: 0,
                Glo_Designation: 0,
                Glo_Language: 0
            };
        }

        function emptyAppliedFilterCatObj(){
          return  {
                Countries       : [],
                Sectors         : [],
                Capabilities    : [],
                Digital_Skills  : [],
                Designation     : [],
                Language        : []
            };
        }
    } //end of people controller

})();
