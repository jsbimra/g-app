(function() {
	'use strict';

	angular.module('xCCeedGlobalApp')
		.factory('filterAPIService',function($http,$location,$timeout,commonAPIService,constantAPIService){
			var filterAPI = {};

			filterAPI.getAppliedFiltersObj = function(){
				if(commonAPIService.getFromLS(constantAPIService.APPLIED_FILTERS_OBJ) !== undefined && commonAPIService.getFromLS(constantAPIService.APPLIED_FILTERS_OBJ) !== ''){
					return JSON.parse(commonAPIService.getFromLS(constantAPIService.APPLIED_FILTERS_OBJ));
				}
				else{
					return [];
				}
			}

			filterAPI.DataToServer = function(){
				//getting the filtered list value
				var filteredList = filterAPI.getAppliedFiltersObj();

				if(filteredList !== undefined && filteredList.length > 0){
						var listOfFiltered = filteredList[0]
						listOfFiltered.Countries =  listOfFiltered.Countries !== undefined ? listOfFiltered.Countries.toString()  : [];
						listOfFiltered.Sectors =  listOfFiltered.Sectors !== undefined ? listOfFiltered.Sectors.toString() : [];
						listOfFiltered.Capabilities = listOfFiltered.Capabilities !== undefined ? listOfFiltered.Capabilities.toString() : [];
						listOfFiltered.Digital_Skills = listOfFiltered.Digital_Skills !== undefined ? listOfFiltered.Digital_Skills.toString() : [];
						listOfFiltered.Designation = listOfFiltered.Designation !== undefined ? listOfFiltered.Designation.toString() : [];
						listOfFiltered.Language = listOfFiltered.Language  !== undefined ? listOfFiltered.Language.toString() : [];


					return listOfFiltered;
				}else{
					return [];
				}
			}//dataToServer

			//Not in use
			//result from the server for the filter
			filterAPI.GetResult = function(baseUrl,verb){
				
				var profileFilterDTO = filterAPI.DataToServer();
				if(profileFilterDTO != null || profileFilterDTO != undefined || profileFilterDTO != "")
				{

					var obj = commonAPIService.allVerbasFunction(baseUrl,verb,profileFilterDTO);
		      		
		      		return obj.getPostData().success(function(data,status, header, config){
					}).error(function(data,status, header, config){
						//console.log('Error');
						//Off of loading flag
						//scope.$parent.loadingFlag = false;

						//this is to show the service error
						//commonAPIService.triggerModel("error-alert","alert","Error",constantAPIService.SERVICE_ERROR,"OK","","",scope.alertInfo);
					});
				
				}//end of dataToServer	
				
			}//getResult ended

			

			// //This function is used to create the filtered list
			// filterAPI.SplitToArray = function(filterList){
			// 	if(filterList.length > 0){
			// 		filterList = JSON.parse(filterList);


			// 		/////////
			// 		var filterObject = {

   //  					Digital_skills: [],
   //  					Designation: [],
			// 		    Capabilities: [],
			// 		    Language: [],
			// 		    Sectors: [],
			// 		    Countries: [],
					    
			// 		};//filter object end

			// 		var objGlo_Language =  [],
			// 		 objGlo_Sectors = [],
			// 		 objGlo_Countries = [],
			// 		 objGlo_Digital_skills = [],
			// 		 objGlo_Designation = [],
			// 		 objGlo_Capabilities = [],
			// 		 //this is to set the total object
			// 		 objGlo_FinalList = [];

			// 		var setValueFlag = undefined;
			// 		angular.forEach(filterList,function(obj,idx){
						
			// 			var tempIdx = idx;

			// 			//check the value
			// 			if(filterList[tempIdx + 1] === constantAPIService.LANGUAGES){
							
			// 				setValueFlag = constantAPIService.LANGUAGES;
			// 			}
			// 			else if(filterList[tempIdx + 1] === constantAPIService.SECTORS){
							
			// 				setValueFlag = constantAPIService.SECTORS;
			// 			}
			// 			else if(filterList[tempIdx + 1] === constantAPIService.COUNTRIES){
							
			// 				setValueFlag = constantAPIService.COUNTRIES;
			// 			}
			// 			else if(filterList[tempIdx + 1] === constantAPIService.DIGITAL_SKILL){
							
			// 				setValueFlag = constantAPIService.DIGITAL_SKILL;
			// 			}
			// 			else if(filterList[tempIdx + 1] === constantAPIService.DESIGNATION){
							
			// 				setValueFlag = constantAPIService.DESIGNATION;
			// 			}
			// 			else if(filterList[tempIdx + 1] === constantAPIService.CAPABILITIES){
							
			// 				setValueFlag = constantAPIService.CAPABILITIES;
			// 			}
						
			// 			//Language
			// 			if(setValueFlag === constantAPIService.LANGUAGES)
			// 			{
			// 				if(filterList[idx] != constantAPIService.LANGUAGES)
			// 					{
			// 						objGlo_Language.push(filterList[idx]);
			// 					}
			// 			}
			// 			//sector
			// 			if(setValueFlag === constantAPIService.SECTORS)
			// 			{	
			// 				if(filterList[idx] != constantAPIService.SECTORS)
			// 				{
			// 					objGlo_Sectors.push(filterList[idx]);
			// 				}
			// 			}
			// 			//Countries
			// 			if(setValueFlag === constantAPIService.COUNTRIES)
			// 			{	
			// 				if(filterList[idx] != constantAPIService.COUNTRIES)
			// 				{
			// 					objGlo_Countries.push(filterList[idx]);
			// 				}
			// 			}
			// 			//DIGITAL_SKILL
			// 			if(setValueFlag === constantAPIService.DIGITAL_SKILL)
			// 			{	
			// 				if(filterList[idx] != constantAPIService.DIGITAL_SKILL)
			// 				{
			// 					objGlo_Digital_skills.push(filterList[idx]);
			// 				}
			// 			}
			// 			//Designation
			// 			if(setValueFlag === constantAPIService.DESIGNATION)
			// 			{	
			// 				if(filterList[idx] != constantAPIService.DESIGNATION)
			// 				{
			// 					objGlo_Designation.push(filterList[idx]);
			// 				}
			// 			}
			// 			//CAPABILITIES
			// 			if(setValueFlag === constantAPIService.CAPABILITIES)
			// 			{	
			// 				if(filterList[idx] != constantAPIService.CAPABILITIES)
			// 				{
			// 					objGlo_Capabilities.push(filterList[idx]);
			// 				}
			// 			}
						
			// 			//console.log(objGlo_Language);
			// 		});//for each
					
			// 		//set the value in the object
			// 		filterObject.Countries = objGlo_Countries.toString();
			// 		filterObject.Language = objGlo_Language.toString();
			// 		filterObject.Sectors = objGlo_Sectors.toString();
			// 		filterObject.Designation = objGlo_Designation.toString();
			// 		filterObject.Digital_skills = objGlo_Digital_skills.toString();
			// 		filterObject.Capabilities = objGlo_Capabilities.toString();
					
			// 		//console.log(filterObject);
					
			// 		return filterObject;
					
			// 	}


			//}//splitToArray

			//redirecting to perople details 
			filterAPI.redirectToDetail = function(){
				$location.path('/people');
			}

			return filterAPI;
		});//end of filterAPIService

})();