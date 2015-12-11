/*	
	Author: Dhruv Mistry & Jatinder
	view file: filterPeople.html
	controller: filterController
	controllerAs: filterCtrl
*/

(function() {
    'use strict';

    angular.module('xCCeedGlobalApp')
        .controller('filterController', ['$scope', '$filter', '$location', '$timeout', 'constantAPIService', 'commonAPIService', filterController]);

    function filterController($scope, $filter, $location, $timeout, constantAPIService, commonAPIService) {

    	/* Define in custom.js to equal the height of sidebar with right panel */
    	columnHeight();

        var vm = this;
		
		var tempAppliedArr = [], 
            tempCategoryArr = [],
            defaultCatNames = ['Country_Name', 'Sector_Name', 'Capability', 'Digital_Skill_Name', 'Designation', 'Language'];

        //OFF the loading controller
        $scope.$parent.loadingFlag = false;
        
        //this is use to set the header
        vm.filterHeader           = true;
        vm.showListView           = true;
        vm.categoryVal            = true;
        vm.filterSNList           = constantAPIService.FILTER_SIDE_NAV_LIST;
        vm.loadListView           = loadListView;
        vm.saveFilters            = saveFilters;
        vm.clearFilters           = clearFilters;
        vm.applyFilters           = applyFilters;
        vm.appliedFiltersByCatObj = {
            Glo_Countries: 0,
            Glo_Sectors: 0,
            Glo_Capabalities: 0,
            Glo_Digital_Skill: 0,
            Glo_Designation: 0,
            Glo_Language: 0
        };

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
		        		vm.filterResultList = filterOutLSKeyNames(lsDataObj, defaultCatNames[0]);
                        //vm.categoryVal = 'Country_Name';
	        		}

	        		if(lskey === 'Glo_Sectors'){	        			
                        //vm.filterResultList = $filter('filter')(filterOutLSKeyNames(lsDataObj, defaultCatNames[1]), '!Sector_Name');
		        		vm.filterResultList = filterOutLSKeyNames(lsDataObj, defaultCatNames[1]);
                        //vm.categoryVal = 'Sector_Name';
	        		}

	        		if(lskey === 'Glo_Capabalities'){	        			
                        //vm.filterResultList = $filter('filter')(filterOutLSKeyNames(lsDataObj, defaultCatNames[2]), '!Capability');
                        vm.filterResultList = filterOutLSKeyNames(lsDataObj, defaultCatNames[2]);
                        //vm.categoryVal = 'Capability';
	        		}

	        		if(lskey === 'Glo_Digital_Skill'){	        			
                        //vm.filterResultList = $filter('filter')(filterOutLSKeyNames(lsDataObj, defaultCatNames[3]), '!Digital_Skill_Name');
                        vm.filterResultList = filterOutLSKeyNames(lsDataObj, defaultCatNames[3]);
                        //vm.categoryVal = 'Digital_Skill_Name';
	        		}

	        		if(lskey === 'Glo_Designation'){	        			
                        //vm.filterResultList = $filter('filter')(filterOutLSKeyNames(lsDataObj, defaultCatNames[4]), '!Designation');
                        vm.filterResultList = filterOutLSKeyNames(lsDataObj, defaultCatNames[4]);
                        //vm.categoryVal = 'Designation';
	        		}

	        		if(lskey === 'Glo_Language'){	        			
                        //vm.filterResultList = $filter('filter')(filterOutLSKeyNames(lsDataObj, defaultCatNames[5]), '!Language');
                        vm.filterResultList = filterOutLSKeyNames(lsDataObj, defaultCatNames[5]);
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
                    updateActiveCountSelections(tarElem, cname);
        		}
        		else if(index > -1){
        			tempAppliedArr.splice(index,1);
                    
                    /* Call to update active count's of list */
                    updateActiveCountSelections(tarElem, cname);

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

        function updateActiveCountSelections(tarElem, cname){
            /* Saving count of no of records added to tempAppliedArr, based on each category type */
            if(tarElem !== undefined && cname !== undefined){

                var qmStr = 'li[data-query-match="'+tarElem.attr('data-query-match')+'"].active-list',
                    qmSelLnt = $(qmStr).length;
                
                vm.appliedFiltersByCatObj[cname] = qmSelLnt;

                /* Update to localStorage */
                localStorage.setItem(constantAPIService.APPLIED_FILTERS_COUNT, JSON.stringify(vm.appliedFiltersByCatObj));
                
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
            
            //Remove tick under active list items on filter result view
            $('.active-list').find('span').remove().end().removeClass('active-list');
            
            //Remove all the badges from filters left nav 
            $('.jsFilterLeftNavBadge').remove();
        }

        function applyFilters(){
            console.log('apply filters triggerd');
            $location.path('/people');
        }


    } //end of people controller

})();
