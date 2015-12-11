(function(){
	'use strict';
	
	angular.module('xCCeedGlobalApp')
		.factory('peopleSharedAPIService',function($http,$rootScope,$location,$timeout,constantAPIService,commonAPIService){
			//variable declaration
			var peopleSharedAPI={};
			
			peopleSharedAPI.sharedPeopleData = [];



			peopleSharedAPI.setPeopleData = function(data){
				peopleSharedAPI.sharedPeopleData.push(data);
				
			}//getResult ended

			
			peopleSharedAPI.getPeopleData = function(){
				return peopleSharedAPI.sharedPeopleData;
			}

			peopleSharedAPI.clearPeopleData = function(){
				return peopleSharedAPI.sharedPeopleData = [];
			}

			peopleSharedAPI.setToLS = function(key,data){
				//Info
				commonAPIService.setInLS(key,data);
			}

			peopleSharedAPI.getFromLS = function(key){
				return commonAPIService.getFromLS(key);
			}

			peopleSharedAPI.removeFromLS = function(key){
				commonAPIService.removeFromLS(key);
			}

			peopleSharedAPI.manupulateInfoBeforeLoading = function(data){
				var oldReplaceString = "||";
				var newReplaceString = ", ";

				if(data != null || data != undefined){
					var manupulateData = data;
					//language
					var consultantAdditonalDetail = data.Consultant_Additional_Detail;
					if(consultantAdditonalDetail.length >= 0){
						var consultantAdditionData = consultantAdditonalDetail[0];
						
						//languages
						var language=consultantAdditionData.Languages;
						if(language != null || language != undefined)
						{
							//manupulateData.Consultant_Additional_Detail[0].Languages = language.replace(oldReplaceString,newReplaceString);

							manupulateData.Consultant_Additional_Detail[0].Languages  = commonAPIService.replaceAllOccurance(language,oldReplaceString,newReplaceString);
						}//language
						
						//Capabilities
						var capabilities=consultantAdditionData.Capabilities;
						if(capabilities != null || capabilities != undefined)
						{
							//manupulateData.Consultant_Additional_Detail[0].Capabilities = capabilities.replace(oldReplaceString,newReplaceString);
							manupulateData.Consultant_Additional_Detail[0].Capabilities  = commonAPIService.replaceAllOccurance(capabilities,oldReplaceString,newReplaceString);

						}//capabilities

						//Sector
						var sector=consultantAdditionData.Sector;
						if(sector != null || sector != undefined)
						{
							//manupulateData.Consultant_Additional_Detail[0].Sector = sector.replace(oldReplaceString,newReplaceString);
							manupulateData.Consultant_Additional_Detail[0].Sector  = commonAPIService.replaceAllOccurance(sector,oldReplaceString,newReplaceString);


						}//sector

						//Digital_Skills
						var digitalSkills=consultantAdditionData.Digital_Skills;
						if(digitalSkills != null || digitalSkills != undefined)
						{
							//manupulateData.Consultant_Additional_Detail[0].Digital_Skills = digitalSkills.replace(oldReplaceString,newReplaceString);
							manupulateData.Consultant_Additional_Detail[0].Digital_Skills  = commonAPIService.replaceAllOccurance(digitalSkills,oldReplaceString,newReplaceString);

						}//digitalSkills

						//manipulatedData return
						return manupulateData;

					}//consultantAdditionalDetail length check
					//console.log(data);
				}//end if (data)
				//If there is no changes the return data
				return data;
			}

			return peopleSharedAPI;
		});//end peopleAPISerivce;
})();