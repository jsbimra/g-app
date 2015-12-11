(function(){
	'use strict'

	angular.module('xCCeedGlobalApp')
		.factory('masterAPIService',function(constantAPIService,commonAPIService){

			var masterService={};


			masterService.getMasterData = function(){
				  var baseURL = constantAPIService.BASE_SERVICE_URL + constantAPIService.routingDetails().MASTER_SKILLS;
				  console.log(baseURL);
				  
				  var obj = commonAPIService.allVerbasFunction(baseURL,"GET");
      			  var promise = obj.getTypeData().success(function(data,status, header, config){
				  	if(data != null){
				  		//Please maintain the sequence same as that of the web api service
				  		//CapabilitiesList
                		//CountryList
                		//SectorList
                		//DigitalSkills
                		//LanguageList
                		//DesginationList
                		masterService.storeIntoLS(data);
				  		var masterData = data;
				  		return masterData;
					}
					//console.log(data);
					}).error(function(data,status, header, config){
						//console.log('Error');
					});
					return promise;
				}

				//After Login store the value in the localstorage
				masterService.storeIntoLS = function(data){
					//Capabilities
					commonAPIService.setInLS(constantAPIService.CAPABILITIES,data[0]);
					//CountryList
					commonAPIService.setInLS(constantAPIService.COUNTRIES,data[1]);
					//SectorList
					commonAPIService.setInLS(constantAPIService.SECTORS,data[2]);
					//DigitalSkill
					commonAPIService.setInLS(constantAPIService.DIGITAL_SKILL,data[3]);
					//LanguageList
					commonAPIService.setInLS(constantAPIService.LANGUAGES,data[4]);
					//DesignationList
					commonAPIService.setInLS(constantAPIService.DESIGNATION,data[5]);
				}//end storeIntoLS

			return masterService;

		})//end of master apu service function
})();//end function