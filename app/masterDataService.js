(function() {
    'use strict'

    angular.module('xCCeedGlobalApp')
        .factory('masterAPIService', masterAPIService);

    /* @ngInject */
    function masterAPIService(constantAPIService, commonAPIService) {

        var masterService = {};

        //hard coded the mastar data list to load fast	
        masterService.HCMasterData = function() {
            var CapabilitiesList = JSON.parse('[{"Capability_Id":1,"Capability":"Business Model Transformation"},{"Capability_Id":2,"Capability":"Customer Experience"},{"Capability_Id":3,"Capability":"OPEX"},{"Capability_Id":4,"Capability":"BTI"},{"Capability_Id":5,"Capability":"Finance Transformation"},{"Capability_Id":7,"Capability":"ASE"},{"Capability_Id":8,"Capability":"HR Transformation"},{"Capability_Id":9,"Capability":"Others"}]');
            var CountryList = JSON.parse('[{"Country_Id":14,"Country_Name":"Austria ","Country_Abbrv":"AUT","Country_Code":"43","Active":"Y"},{"Country_Id":21,"Country_Name":"Belgium ","Country_Abbrv":"BEL","Country_Code":"32","Active":"Y"},{"Country_Id":43,"Country_Name":"China ","Country_Abbrv":"CHN","Country_Code":"86","Active":"Y"},{"Country_Id":70,"Country_Name":"Finland ","Country_Abbrv":"FIN","Country_Code":"358","Active":"Y"},{"Country_Id":71,"Country_Name":"France ","Country_Abbrv":"FRA","Country_Code":"33","Active":"Y"},{"Country_Id":77,"Country_Name":"Germany ","Country_Abbrv":"DEU","Country_Code":"49","Active":"Y"},{"Country_Id":93,"Country_Name":"Hong Kong ","Country_Abbrv":"HKG","Country_Code":"852","Active":"Y"},{"Country_Id":96,"Country_Name":"India ","Country_Abbrv":"IND","Country_Code":"91","Active":"Y"},{"Country_Id":147,"Country_Name":"Netherlands ","Country_Abbrv":"NLD","Country_Code":"31","Active":"Y"},{"Country_Id":157,"Country_Name":"Norway ","Country_Abbrv":"NOR","Country_Code":"47","Active":"Y"},{"Country_Id":192,"Country_Name":"Singapore ","Country_Abbrv":"SGP","Country_Code":"65","Active":"Y"},{"Country_Id":198,"Country_Name":"Spain ","Country_Abbrv":"ESP","Country_Code":"34","Active":"Y"},{"Country_Id":204,"Country_Name":"Sweden ","Country_Abbrv":"SWE","Country_Code":"46","Active":"Y"},{"Country_Id":206,"Country_Name":"Switzerland ","Country_Abbrv":"CHE","Country_Code":"41","Active":"Y"},{"Country_Id":224,"Country_Name":"UK ","Country_Abbrv":"GBR","Country_Code":"44","Active":"Y"},{"Country_Id":226,"Country_Name":"USA ","Country_Abbrv":"USA","Country_Code":"1","Active":"Y"},{"Country_Id":238,"Country_Name":"Global ","Country_Abbrv":"GLO","Country_Code":null,"Active":"Y"},{"Country_Id":239,"Country_Name":"Middle East ","Country_Abbrv":"MES","Country_Code":null,"Active":"Y"},{"Country_Id":240,"Country_Name":"Other ","Country_Abbrv":"OTH","Country_Code":null,"Active":"Y"}]');
            var DesignationList = JSON.parse('[{"Designation_Id":1,"Designation":"Analyst","Active":"Y"},{"Designation_Id":2,"Designation":"Consultant","Active":"Y"},{"Designation_Id":4,"Designation":"Managing Consultant","Active":"Y"},{"Designation_Id":5,"Designation":"Principal Consultant","Active":"Y"},{"Designation_Id":6,"Designation":"Senior Consultant","Active":"Y"},{"Designation_Id":9,"Designation":"Vice-President","Active":"Y"}]');
            var DigitalSkillList = JSON.parse('[{"Digital_Skill_Id":1,"Digital_Skill_Name":"DCX"},{"Digital_Skill_Id":2,"Digital_Skill_Name":"Digital HR"},{"Digital_Skill_Id":3,"Digital_Skill_Name":"Insights and Data"},{"Digital_Skill_Id":4,"Digital_Skill_Name":"IoT"},{"Digital_Skill_Id":5,"Digital_Skill_Name":"Digital Operations & Manufacturing"},{"Digital_Skill_Id":6,"Digital_Skill_Name":"Cyber Security"},{"Digital_Skill_Id":7,"Digital_Skill_Name":"Cloud"}]');
            var LanguageList = JSON.parse('[{"Language_Id":1,"Language":"French"},{"Language_Id":2,"Language":"English"},{"Language_Id":3,"Language":"German"},{"Language_Id":4,"Language":"Dutch"},{"Language_Id":5,"Language":"Swedish"},{"Language_Id":6,"Language":"Finnish"},{"Language_Id":7,"Language":"Norwegian"},{"Language_Id":8,"Language":"Spanish"},{"Language_Id":9,"Language":"Italian"},{"Language_Id":10,"Language":"Mandarin"},{"Language_Id":11,"Language":"Cantonese"},{"Language_Id":12,"Language":"Hindi"},{"Language_Id":14,"Language":"Arabic"},{"Language_Id":15,"Language":"Other"},{"Language_Id":16,"Language":"Japanese"}]');
            var SectorList = JSON.parse('[{"Sector_Id":1,"Sector_Name":"Manufacturing"},{"Sector_Id":2,"Sector_Name":"Automotive"},{"Sector_Id":3,"Sector_Name":"Life Sciences"},{"Sector_Id":4,"Sector_Name":"FS Banking"},{"Sector_Id":5,"Sector_Name":"Consumer Products & Goods"},{"Sector_Id":6,"Sector_Name":"Public Sector"},{"Sector_Id":7,"Sector_Name":"HealthCare"},{"Sector_Id":8,"Sector_Name":"Energy & Utilities"},{"Sector_Id":9,"Sector_Name":"Oil & Gas"},{"Sector_Id":10,"Sector_Name":"Telco"},{"Sector_Id":11,"Sector_Name":"FS Insurance"},{"Sector_Id":12,"Sector_Name":"Travel & Transport"},{"Sector_Id":13,"Sector_Name":"Retail"},{"Sector_Id":14,"Sector_Name":"Others"}]');

            var objMasterData = [];
            objMasterData.push(CapabilitiesList);
            objMasterData.push(CountryList);
            objMasterData.push(SectorList);
            objMasterData.push(DigitalSkillList);
            objMasterData.push(LanguageList);
            objMasterData.push(DesignationList);


            masterService.storeIntoLS(objMasterData);
            return objMasterData;

        }

        masterService.getMasterData = function() {
            var baseURL = constantAPIService.BASE_SERVICE_URL + constantAPIService.routingDetails().MASTER_SKILLS;
            console.log(baseURL);

            var obj = commonAPIService.allVerbasFunction(baseURL, "GET");
            var promise = obj.getTypeData().success(function(data, status, header, config) {
                if (data != null) {
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
            }).error(function(data, status, header, config) {
                //console.log('Error');
            });
            return promise;
        }

        //After Login store the value in the localstorage
        masterService.storeIntoLS = function(data) {
                //Capabilities
                commonAPIService.setInLS(constantAPIService.CAPABILITIES, data[0]);
                //CountryList
                commonAPIService.setInLS(constantAPIService.COUNTRIES, data[1]);
                //SectorList
                commonAPIService.setInLS(constantAPIService.SECTORS, data[2]);
                //DigitalSkill
                commonAPIService.setInLS(constantAPIService.DIGITAL_SKILL, data[3]);
                //LanguageList
                commonAPIService.setInLS(constantAPIService.LANGUAGES, data[4]);
                //DesignationList
                commonAPIService.setInLS(constantAPIService.DESIGNATION, data[5]);
            } //end storeIntoLS

        return masterService;

    } //end of master apu service function
})(); //end function
