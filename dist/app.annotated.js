
/*
h5util.js
// For discussion and comments, see: http://remysharp.com/2009/01/07/html5-enabling-script/
*/
peopleAPIService.$inject = ['$http', '$location', '$timeout', '$filter', 'constantAPIService', 'commonAPIService', 'filterAPIService'];
var addEvent=function(){return document.addEventListener?function(e,n,t){if(e&&e.nodeName||e===window)e.addEventListener(n,t,!1);else if(e&&e.length)for(var o=0;o<e.length;o++)addEvent(e[o],n,t)}:function(e,n,t){if(e&&e.nodeName||e===window)e.attachEvent("on"+n,function(){return t.call(e,window.event)});else if(e&&e.length)for(var o=0;o<e.length;o++)addEvent(e[o],n,t)}}();!function(){var e=document.createElement("pre");e.id="view-source",addEvent(window,"click",function(n){if("#view-source"==n.target.hash){if(!document.getElementById("view-source")){var t=new XMLHttpRequest;t.onreadystatechange=function(){4==this.readyState&&200==this.status&&(e.innerHTML=this.responseText.replace(/[<>]/g,function(e){return{"<":"&lt;",">":"&gt;"}[e]}),prettyPrint())},document.body.appendChild(e),t.open("GET",window.location,!0),t.send()}document.body.className="view-source";var o=setInterval(function(){"#view-source"!=window.location.hash&&(clearInterval(o),document.body.className="")},200)}})}();


function online(event) {
    
    if('onLine' in navigator){
        if(!navigator.onLine){
            //<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            $('body').append('<div id="noConnectionMsg" class="alert alert-warning alert-dismissible noConnectionMsg" role="alert"><strong><i class="fa fa-signal"></i></strong> Please check your internet connection.</div>');
        }
        else{
            $('#noConnectionMsg').remove();
        }   
    }

}

addEvent(window, 'online', online);
addEvent(window, 'offline', online);

online({ type: 'ready'});


$(document).ready(function() {

    $(document).on('click', "#searchBtn", function(){
        $("#searchBox").slideToggle("fast", function(){
            $(".content").toggleClass("top-space");
            //$(this).find('input').focus(); //not required by default focus as handling keypad issue for ios device

        });     
        
        if($(this).find('i').hasClass('fa-search')){
            $(this).find('i').removeClass('fa-search');
            //$(this).find('i').addClass('fa-search-minus');
            $(this).find('i').addClass('fa-eye-slash');
        }
        else{
            //$(this).find('i').removeClass('fa-search-minus');
            $(this).find('i').removeClass('fa-eye-slash');
            $(this).find('i').addClass('fa-search');

            /* Important to empty the value to re-populate the people list records */
            $('#autoCompleteSearch').val('');
            $('#autoCompleteSearch').trigger('change');

            var minLength = $( "#autoCompleteSearch" ).val().length;

            if(minLength === 0){
                  angular.bind(this, function(nameFilter){
                    return this.nameFilter = '';
                });
            }
        }
    });
    
    
    $('.jsChartGridToggle').on('click', function(){
        
        var me = $(this), faElement = me.find('.fa'), graphEle = $('#graphContainer'), metricsTableEle = $('#metricsTableContainer');
        
        if(faElement.hasClass('fa-table')){         
            me.find('.fa').removeClass('fa-table').addClass('fa-bar-chart');
            
            //Hide Graph Container show Metrics Table Container
            graphEle.addClass('hide');
            metricsTableEle.removeClass('hide');
        }else{
            me.find('.fa').removeClass('fa-bar-chart').addClass('fa-table');
            
            metricsTableEle.addClass('hide');
            graphEle.removeClass('hide');       
        }
    });


    //Whenever modal is shown callback of show to align model in center of screen

    $(document).on('show.bs.modal', '.modal', centerModal);
    $(window).on("resize", function () {
        $('.modal:visible').each(centerModal);
    });


});

/* Center bootstrap modal */
function centerModal() {
    $(this).css('display', 'block');
    var $dialog  = $(this).find(".modal-dialog"),
    offset       = ($(window).height() - $dialog.height()) / 2,
    bottomMargin = parseInt($dialog.css('marginBottom'), 10);

    // Make sure you don't hide the top part of the modal w/ a negative margin if it's longer than the screen height, and keep the margin equal to the bottom margin of the modal
    if(offset < bottomMargin) offset = bottomMargin;
    $dialog.css("margin-top", offset);
}


//Date Compontent Start-->

// Multi Checkbox List End -->

// TOGGLE DIV

function toggler(divClass) {
    $("." + divClass).toggle();
}

//$('a[data-toggle="tooltip"]').tooltip('toggle');

/* If modal is visible and user press space bar or enter key dismiss the modal */
/*$(window).keypress(function(e){
    if((e.which == 13 && $('.modal.in').is(':visible')) || (e.keyCode == 32 && $('.modal.in').is(':visible'))){
        
        //$('.modal.in').modal('hide');
        $('.modal.in').find('button').trigger('click');
    }
});*/

//Formate Date function for date to post to server
function formatDateToServer(date){
    if(date && date != 'undefined'){
        
        var splitDateArray, getFromDate, getFromMonth, getFromYear;

        splitDateArray = date.split('-');


        getFromDate = splitDateArray[0];
        getFromMonth = splitDateArray[1] - 1;
        getFromYear = splitDateArray[2];

        var formattedDate = new Date(getFromYear, getFromMonth, getFromDate); //oLD WAY

        //var custDate = new Date(getFromYear, getFromMonth, getFromDate);
        //var formattedDate = new Date(custDate.getTime() - custDate.getTimezoneOffset()*60000); // timezone offset causing date saved one day off!
        

        return formattedDate;
    }
}
function getDate_Edit(dt) {
    var startDateString = new Date(dt)  ;
    var month = formatDate(startDateString.getMonth() + 1);
    var date = formatDate(startDateString.getDate());
    var year = startDateString.getFullYear();   
        var fullDate = date + "-" + month + "-" + year; 
    return fullDate;
}
function formatDate(value){
    if(value<10){
        return value='0'+value;
    }
    else{
        return value;
    }
}

function columnHeight() {

    var w = $(window).innerHeight();
    var d = $(document).innerHeight();
    var s = $('.secondary-col').innerHeight();
    var p = $('.primary-col').innerHeight();
    var h = $('header.navbar-fixed-top').innerHeight();
    var f = $('footer .navbar-fixed-bottom').height();

    var primaryCol = $('.primary-col'),
        secondaryCol = $(".secondary-col");

    var pHeight = w - (h + f - 5);

    primaryCol.css({
        height: pHeight,
        border: '0px solid red'
    });
    secondaryCol.css({
        height: pHeight,
        border: '0px solid yellow'
    });
}


$(window).on('load resize', function() {
    columnHeight();
});

/* Modernizr touch check */

if(typeof Modernizr != 'undefined'){
    if (Modernizr.touchevents) {
        $(document).on('focusin', 'input, textarea, select', function() {       
            $('.navbar-fixed-top, .navbar-fixed-bottom, #searchBox').addClass('unfixed');
            $('footer').css({position: 'relative'});        
        })
        .on('focusout', 'input, textarea, select', function () {    
            $('.navbar-fixed-top, .navbar-fixed-bottom, #searchBox').removeClass('unfixed');
            $('footer').css({position: 'absolute'});        
        });
    }   
}

 ;
(function(){

	'use strict';

	angular.module('xCCeedGlobalApp',['ngRoute','ngMessages', 'ngAnimate', 'infinite-scroll']);

	//on run set the access token
	angular.module('xCCeedGlobalApp')
		.run(['$http', '$rootScope', '$location', 'commonAPIService', 'constantAPIService', function($http,$rootScope,$location,commonAPIService,constantAPIService){
			

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
        		
    			
		}]);
})();
 ;(function() {
	 'use strict';
	

	angular.module('xCCeedGlobalApp')
		.factory('commonAPIService', ['$http', '$location', '$rootScope', 'constantAPIService', function($http, $location,$rootScope,constantAPIService){
		
		//variable declaration
		var commonService={};

		//get the data from LS
		commonService.getFromLS = function(key)
		{
			if(key !== null && key !== undefined){
				
				var record = localStorage[key];	
					if(record !== '' && record !== undefined){
						return record;					
					}else{
						return '';
					}
				}//end of key check
				else{
				//console.log(localErrorKeyMsg + key);
				}	

		}//End of the get fucntion from local storage

		//set in LS
		commonService.setInLS = function(key,value){
			if (value != 'undefined' || value != null){
	            localStorage.setItem(key,JSON.stringify(value));
	        }
	        else
	        {
	            //console.log("Session Set Functionality Error");
	        }
		}

		//reomve from LS
		commonService.removeFromLS = function(key)
		{
			if(key && key != undefined)
			{
				localStorage.removeItem(key);	
			}	
		}

		//set in Session
   		commonService.setInSession = function(key,value){
	        if (value != 'undefined' || value != null){
	            sessionStorage.setItem(key,JSON.stringify(value));
	        }
	        else
	        {
	            //console.log("Session Set Functionality Error");
	        }
    	}

    	//get from Session
    	commonService.getFromSession=function(key){
	        var objValue = null;
	        if (key != null || key != 'undefined'){
	          objValue = JSON.parse(sessionStorage.getItem(key));
	        }
	        else
	        {
	             //console.log("Session Get Functionality Error");
	        }
	        return objValue;
    	}

    	//This function is used to define Verbs
    	commonService.allVerbasFunction = function(baseURL,type,param,header){
        	var obj = {};
        	obj.getTypeData = function(){
            	return $http({
                    url: baseURL,
                    method: type,
                    params: { id: param }
                 });   
                   
        	}
        	obj.getPostData = function(){
            	return $http({
                    url: baseURL,
                    method: type,
                    data: param
                 });   
        	}

        	obj.getPostDataWithHeader = function(){
            	return $http({
                    url: baseURL,
                    method: type,
                    data: param,
                    headers: { 'Authorization': "Bearer " + header}
                 });   
        	}
        	return obj;
    	}

    	// this is used to clear the data from LS
    	commonService.clearLS = function(){
			localStorage.clear();
    	}//end

    	//clear the specific LS data
    	commonService.clearSpecificLS = function()
    	{
    		//consultant name
    		localStorage.removeItem(constantAPIService.CONSULTANT_NAME);
    		//employee user id
    		localStorage.removeItem(constantAPIService.EMPLOYEE_ID);
    		//employee user id
    		localStorage.removeItem(constantAPIService.EMPLOYEE_USER_ID);
    		//role id
    		localStorage.removeItem(constantAPIService.ROLE_ID);
    		//login token
    		localStorage.removeItem(constantAPIService.LOGIN_TOKEN);
    		//success login
    		localStorage.removeItem(constantAPIService.SUCCESS_LOGIN);
    		//person info
    		localStorage.removeItem(constantAPIService.PERSON_INFO);
    		//personal detail
    		localStorage.removeItem(constantAPIService.MY_PERSONALDETAILS);
    		//filteredData
    		localStorage.removeItem(constantAPIService.APPLIED_FILTERS_KEY);
    		//filteredData Count
    		localStorage.removeItem(constantAPIService.APPLIED_FILTERS_COUNT);
    		//filteredData Count
    		localStorage.removeItem(constantAPIService.APPLIED_FILTERS_OBJ);
    		//filteredData Count
    		localStorage.removeItem(constantAPIService.AD_DETAILS_INFO);

    	}//end

    	// this is used to clear the data from session
    	commonService.clearSS = function(){                    
            sessionStorage.clear();
    	}

    	commonService.modelPopUp= function(){
	         //to show the model
	         var alertInfo = {
	            alertHTMLId : 'customAlertModal',
	            alertType: '',
	            alertStyleClass: '',
	            alertHeading: '',
	            alertMessage: '',
	            alertActionText : '',
	            alertAction: '',
	            alertUrl: ''
	        };
	        return alertInfo;
	    }//triggger Model Event

    	commonService.triggerModel =  function(alertStyle,alertActionType, alertHeading,alertMessage,alertActionText,alertAction,alertUrl, alertInfo) {
	        //create dialog data for directive
	       
	        alertInfo['alertStyleClass'] = alertStyle;
	        alertInfo['alertActionType'] = alertActionType;
	        alertInfo['alertHeading'] = alertHeading;
	        alertInfo['alertMessage'] = alertMessage;
	        alertInfo['alertActionText'] = alertActionText;
	        alertInfo['alertUrl'] = alertUrl;
	        
	        //this will fire the event as per the field (actionType is send)
	        //1. alert and 2. redirect

	        alertInfo.fireAlertAction = function(actionType){
	            if(actionType == 'alert'){                 
	            	commonService.closeModal();              
	            }

	             if(actionType == 'redirect'){   
	             	alertUrl !== undefined ? commonService.redirectTo(alertUrl) : '';             
	            }

	            if(actionType == 'redirectLogin'){
	            	commonService.registrationLogout();
	            	alertUrl !== undefined ? commonService.redirectTo(alertUrl) : '';
	            }
	    	}

	    	/* Invoke the alert modal and stop outside boundary issue*/
	        $('.alert-modal').modal({
	        	keyboard: false,
	        	backdrop: 'static'
	        });

	        return alertInfo;
      	}//trigger model end

      	/* Method to close the modal */
      	commonService.closeModal =function(){
      		var aiObj = commonService.modelPopUp();

        	return $('#'+aiObj.alertHTMLId).modal('hide');
    	}

    	/* Method to redirecTo from modal OK button - using Angular way of redirecting */
    	commonService.redirectTo =function(url){
    		if(url){
    			commonService.closeModal();
    			$location.path(url)
    		}
    	}

    	commonService.getRandomColor = function() {
		    var letters = '0123456789ABCDEF'.split('');
		    var color = '#';
		    for (var i = 0; i < 6; i++ ) {
		        color += letters[Math.floor(Math.random() * 16)];
		    }
		    return color;
		}

		//this function is the replace function ("||" to ",") used from details page
		commonService.replaceAllOccurance = function(str,find,replace){
			var spacing =  str.split(find).join(replace);
			return spacing;//commonService.addSpaceAfterReplace(spacing,replace,", ");
		}//

		//logout functionality
		commonService.registrationLogout = function(){
			commonService.clearSpecificLS();
			commonService.clearSS();
			$rootScope.successLogin = undefined;
			$location.path('/');
			
		}//getResult ended


		 commonService.remainingCharCount = function(eleId){

       		if(eleId){
	        	var defaultMax = $('#'+eleId).attr('maxLength') != undefined ? $('#'+eleId).attr('maxLength') : 280, elementObj = $('#'+eleId);
	        	
	        	if(elementObj.val()){

		            var defaultLength = elementObj.val().length;
		            var strChars = defaultMax - defaultLength;
		            //elementObj.siblings('.jsRemainingText').html(strChars + ' characters remaining');
		            elementObj.siblings('.jsRemainingText').remove();
		            elementObj.after('<span class="footer-label pull-right jsRemainingText">'+strChars + ' characters remaining'+'</span>');
		            return strChars;
				}	
		        else{
		            elementObj.siblings('.jsRemainingText').remove();
	        		elementObj.after('<span class="footer-label pull-right jsRemainingText">'+defaultMax + ' characters remaining'+'</span>')
        			return '';
		        }

       		}else{
       			//console.log('Please pass element id');
       		}
        }//end remaining char count

        //This is to check the connection is active or not
        commonService.checkNetworkConnection = function(){
        	var state = navigator.onLine ? constantAPIService.ONLINE : constantAPIService.OFFLINE;
        	return state;
        }

		// commonService.addSpaceAfterReplace = function(str,find,replace){
		// 	//return str.split(find).joinreplace);
		// }//

		return commonService;

	}]);//factory end


})();//function end
 ;(function() {
    'use strict';

    angular.module('xCCeedGlobalApp')
        .factory('constantAPIService', constantAPIService);

    /* @ngInject */
    function constantAPIService() {

        var constantService = {};

        //constant value local storage (On Login)
        constantService['DEVICE_ID'] = 'Glo_Device_ID';
        constantService['CONSULTANT_NAME'] = 'Glo_Consultant_Name';
        constantService['EMPLOYEE_ID'] = 'Glo_Employee_Id';
        constantService['EMPLOYEE_USER_ID'] = 'Glo_Employee_User_Id';
        constantService['ROLE_ID'] = 'Glo_Role_Id';
        constantService['LOGIN_TOKEN'] = 'Glo_Login_Token';
        constantService['SUCCESS_LOGIN'] = 'Glo_Success_Login';
        //constantService['PEOPLE_INFO'] ='People_Info';
        //-----------------------------------------------------------------------
        //master data storage in the ls (While master data load)
        constantService['CAPABILITIES'] = 'Glo_Capabilities';
        constantService['COUNTRIES'] = 'Glo_Countries';
        constantService['SECTORS'] = 'Glo_Sectors';
        constantService['DIGITAL_SKILL'] = 'Glo_Digital_Skills';
        constantService['LANGUAGES'] = 'Glo_Language';
        constantService['DESIGNATION'] = 'Glo_Designation';
        //------------------------------------------------------------------------
        //from detail page of person
        constantService['PERSON_INFO'] = 'Glo_Person_Info';
        constantService['MY_PERSONALDETAILS'] = 'Glo_My_PersonalDetails';

        //------------------------------------------------------------------------

        //------------------------------------------------------------------------
        //Filter's Contants keys
        constantService['FILTER_SIDE_NAV_LIST'] = [{
                name: 'Country',
                lsKey: constantService.COUNTRIES
            }, {
                name: 'Sector',
                lsKey: constantService.SECTORS
            }, {
                name: 'Capabilities',
                lsKey: constantService.CAPABILITIES
            }, {
                name: 'Digital Skills',
                lsKey: constantService.DIGITAL_SKILL
            }, {
                name: 'Designation',
                lsKey: constantService.DESIGNATION
            }, {
                name: 'Language',
                lsKey: constantService.LANGUAGES
            }

        ];
        constantService['APPLIED_FILTERS_KEY'] = 'XceedGlobal.appliedFilters';
        constantService['APPLIED_FILTERS_OBJ'] = 'Glo_AppliedFiltersObj';
        constantService['APPLIED_FILTERS_COUNT'] = 'Glo_AppliedFiltersCount';
        //------------------------------------------------------------------------

        //global variable for the service path
        //constantService['BASE_SERVICE_URL'] = "http://localhost:59734/api/";
        //constantService['BASE_SERVICE_URL'] 	= 'https://inccgraphics.in.capgemini.com/xCCeedGlobalDevService/api/';
        //constantService['BASE_SERVICE_URL'] 	= 'https://inccgraphics.in.capgemini.com/xCCeedGlobalRegistrationQAService/api/';
        //constantService['BASE_SERVICE_URL'] 	= 'https://xcceedglobal.in.capgemini.com/xCCeedGlobalDevService/api/'; 
        constantService['BASE_SERVICE_URL'] = 'https://xcceedglobal.in.capgemini.com/xCCeedGlobalQAService/api/';
        //------------------------------------------------------------------------
        //routing info to service
        constantService.routingDetails = function() {
            var routingInfo = {};

            routingInfo['LOGIN_HTML'] = 'Login';
            routingInfo['PEOPLE_HTML'] = 'Profiles';
            routingInfo['PEOPLE_FILTER'] = 'Profiles/Filter/';
            routingInfo['PEOPLE_ADD_DETAIL'] = 'Profiles/';
            routingInfo['MASTER_SKILLS'] = 'MasterData/GetCombinedList';
            routingInfo['CONTACT_ADMIN'] = 'SetContact';
            //routingInfo['REGISTRATION']		= 'ProfileRegistration/AddConsultant'; //This code will work only with registration page.
            //routingInfo['LOGIN_REGISTRATION']	= 'LoginRegistrationData';
            routingInfo['EDIT_MANAGING_POSITION'] = 'Profiles/UpdateMangingPosition';
            routingInfo['SEARCH_SERVICE'] = 'Profiles/Search';
            return routingInfo;
        }

        //Modal popup messages constant for service
        constantService['SERVICE_ERROR'] = "Could not process your request at the moment.Please try again later.";
        constantService['INSERTION_SUCCESS'] = "Message submitted successfully.";
        //constantService['LOGIN_VALIDATION']		= 'Invalid user id entered. Please enter a correct user id.';
        constantService['AUTH_ERROR'] = 'Could not validate your credentials.Please login again.';
        constantService['INTERNET_ERROR'] = 'It appears that you are offline.Please check your internet connection.';
        //------------------------------------------------------------------------

        //Registration page sepertated
        // //Registration Setting---------------------------------------------------
        // constantService['IS_REGISTRATION']		= false;
        // constantService['REGISTRATION_MESSAGE_AVAILABLE'] = 'Your data is already available in the system.';
        // constantService['AD_DETAILS_INFO'] 		= 'AD_PERSONAL_DETAIL';
        // constantService['DEFAULT_PATH']			= 'Default_Path'
        // //-----------------------------------------------------------------------

        //Navigator ---------------------------------------------------------------
        constantService['ONLINE'] = 'ONL';
        constantService['OFFLINE'] = 'OFFL';
        constantService['INTERNET_ERROR_HEADING'] = 'Connectivity Lost'
            //-------------------------------------------------------------------------
        return constantService;
    };
})();

 ;
 ;(function() {
    'use strict'

    masterAPIService.$inject = ['constantAPIService', 'commonAPIService'];
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

 ;(function(){
	parentController.$inject = ['$scope', 'constantAPIService', 'commonAPIService'];
	angular.module('xCCeedGlobalApp')
		.controller('parentController',['$scope','constantAPIService','commonAPIService', parentController]);
	
	/* @ngInject */
	function parentController($scope,constantAPIService,commonAPIService){
		
		var vm = this;

		vm.peopleHeading 		= 'CC Directory';
		vm.peopleDetailHeading 	= 'Profile Details';
		vm.filterHeading 		= 'Filters';
		vm.contactHeading		= 'Contact';
		vm.loadingFlag 			= false;
		vm.alertInfo			= commonAPIService.modelPopUp();

	}//end of people controller4

})(); // function end
 ;(function(){
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
						masterDataList: ['masterAPIService', function(masterAPIService){
							
							//console.log( masterAPIService.getMasterData());
							return masterAPIService.HCMasterData();
						}]
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
						logout: ['parentAPIService', function(parentAPIService){
							return parentAPIService.Logout();
						}]
					}//end of rresolve
				}).
			    otherwise({
			    	redirectTo: '/login'
			    });
		}]);


})();


 ;(function(){
	parentController.$inject = ['$http', '$rootScope', '$location', '$scope', '$route', 'constantAPIService', 'commonAPIService', 'parentAPIService'];
	angular.module('xCCeedGlobalApp')
		.controller('parentController',['$http', '$rootScope', '$location', '$scope', '$route', 'constantAPIService','commonAPIService','parentAPIService', parentController]);
	
	/* @ngInject */
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
 ;(function() {
    'use strict';

    parentAPIService.$inject = ['$http', '$location', '$rootScope', '$timeout', 'constantAPIService', 'commonAPIService'];
    angular.module('xCCeedGlobalApp')
        .factory('parentAPIService', parentAPIService);

    /* @ngInject */
    function parentAPIService($http, $location, $rootScope, $timeout, constantAPIService, commonAPIService) {
        var parentAPI = {};

        //logout functionality
        parentAPI.Logout = function() {
                commonAPIService.clearSpecificLS();
                commonAPIService.clearSS();
                $rootScope.successLogin = undefined;
                $location.path('/');

            } //getResult ended

        return parentAPI;
    }; //end of Contact
})();

 ;(function(){
	'use strict';
	angular.module('xCCeedGlobalApp')
		.controller('loginController', ['$scope','$http','$location','loginAPIService','constantAPIService','commonAPIService', loginController]);

	loginController.$inject = ['masterDataList'];

	/* @ngInject */
	function loginController($scope,$http,$location,loginAPIService,constantAPIService,commonAPIService,masterDataList){

		var vm = this;

		vm.submitted = false;

		//call to function on load;
		addClassToBody();
		
		//OFF the loadingFlag 
		$scope.$parent.loadingFlag = false;

		//this is to set the alert model object 
		$scope.$parent.alertInfo = commonAPIService.modelPopUp();
		

		//Functions
		$scope.Login = function($event){

			$event.preventDefault();
			
			vm.submitted = true;

			if(!$scope.frmLogin.$valid){

				return;
			}

			//ON Loading flag
			$scope.$parent.loadingFlag = true;

			//variable decleration
			var vm_hidekey = CryptoJS.enc.Utf8.parse($('#hidKey').val());
			var vm_hideIv = CryptoJS.enc.Utf8.parse($('#hidIv').val());
			var vm_hidSecret = $('#hidSecret').val()
			//console.log(vm);
			//console.log($scope);
			var vm_userID = vm.userID;
			var vm_userPassword = vm.userPassword;
			var vm_DeviceID = commonAPIService.getFromLS(constantAPIService.DEVICE_ID);
			var baseURL = constantAPIService.BASE_SERVICE_URL + constantAPIService.routingDetails().LOGIN_HTML;
			var baseURLRegistration = constantAPIService.BASE_SERVICE_URL + constantAPIService.routingDetails().LOGIN_REGISTRATION;
			
			//convert the password in the encryoted token and store in the hidden field
			var encryptionToken = loginAPIService.DatEncryptionToken(vm_userPassword,vm_hidekey,vm_hideIv,vm_hidSecret);
			$('#hidEncrypted').val(encryptionToken);

			//object for the conversion to pass the value to the server.
			var dataToServer = loginAPIService.DataToServer(vm_userID,$('#hidEncrypted').val(),vm_DeviceID);

			//this is to check the internet connection
			if (commonAPIService.checkNetworkConnection() === 'ONL'){	
				// //this is to check whether the data is for the application or the registration form
				// if (constantAPIService.IS_REGISTRATION === true){
				// 	//login service call (Not all the operation and setting is done in loginService)
				// 	loginAPIService.GetResultForRegistration(baseURLRegistration,"POST",dataToServer,$scope);
				// }
				// else
				// {
				// 	//login service call (Not all the operation and setting is done in loginService)
					
					///Note: Registration page is seperated to resolved the ie 9 issue so no need of registration 
					loginAPIService.GetResult(baseURL,"POST",dataToServer,$scope);
				// }
			}
			else{
				$scope.$parent.loadingFlag	= false;
				commonAPIService.triggerModel("error-alert","alert",constantAPIService.INTERNET_ERROR_HEADING,constantAPIService.INTERNET_ERROR,"OK","","",$scope.alertInfo);
			}
			
		}//end of login function

		 
		function addClassToBody()
		{
			$('body').addClass('login-page');
		}//end of addClassToBody

		
	}
	
	//end controller
})();


 ;(function() {
	 'use strict';

	loginAPIService.$inject = ['$http', '$location', '$rootScope', '$timeout', 'constantAPIService', 'commonAPIService'];
angular.module('xCCeedGlobalApp')
	.factory('loginAPIService', loginAPIService);

	/* @ngInject */
	function loginAPIService($http,$location,$rootScope,$timeout,constantAPIService,commonAPIService){
		
		//variable declaration
		var loginAPI={};

		//data encryption logic
		loginAPI.DatEncryptionToken = function(password,key,iv,hideSecret){
			var encryptionToken =CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(password), hideSecret, key,
			{
				keySize: 128,
				iv: iv,
				mode: CryptoJS.mode.CBC,
				padding: CryptoJS.pad.pkcs7
			});

			return encryptionToken;

		}//dataencryption

		loginAPI.DataToServer = function(uid,pass,devid){
			 var datatoServer = {
				UserId: uid,
				Password: pass,
				DeviceId: devid
			}

			return datatoServer;

		}//datatoserver
		

		loginAPI.GetResult = function(baseUrl,verb,dataToServer,scope){
										
			var obj = commonAPIService.allVerbasFunction(baseUrl,"POST",dataToServer);
			obj.getPostData().success(function(data,status, header, config){
				if(data != null){
					loginAPI.storeIntoLS(data);
					
					$('body').removeClass('login-page');
					
					//setting the value to broadcast
					$rootScope.successLogin = true;

					//OFF loading Flag -- CAUSING login form to re-show while redirecting to Register page
					//as its not require here to set OFF as page redirect's to new page
					//scope.$parent.loadingFlag = false;

					// if (constantAPIService.IS_REGISTRATION === true){

					// 	var origin = window.location.origin, 
					// 		pathname = window.location.pathname,
					// 		registerURL = origin+pathname+'register/index.html';

					// 	window.location = registerURL;
					// } 
					// else{

						//Note registration page is seperated so no need to use this settings
						$location.path('/people');	
					//}
				}
				//console.log(data);
			}).error(function(data,status, header, config){

				//Off of loading flag
				scope.$parent.loadingFlag = false;

				if (data === "" || data === null){
				//this is to show the service error
					commonAPIService.triggerModel("error-alert","alert","Error",constantAPIService.SERVICE_ERROR,"OK","","",scope.alertInfo);
									
				}
				else{
					commonAPIService.triggerModel("error-alert","alert","Error",data,"OK","","",scope.alertInfo);
				}
			});
	
		}//getResult ended


		//After Login store the value in the localstorage
		loginAPI.storeIntoLS = function(data){
			//consultant name
			commonAPIService.setInLS(constantAPIService.CONSULTANT_NAME,data.Consultant_Name);
			//Employee Id
			commonAPIService.setInLS(constantAPIService.EMPLOYEE_ID,data.Employee_Id);
			//Employee User Id
			commonAPIService.setInLS(constantAPIService.EMPLOYEE_USER_ID,data.Employee_User_Id);
			//Role ID
			commonAPIService.setInLS(constantAPIService.ROLE_ID,data.Role_Id);
			//Token
			commonAPIService.setInLS(constantAPIService.LOGIN_TOKEN,data.Token);
			//successLogin (to check the logged in successful and on refresh it can be usedfull in future)
			commonAPIService.setInLS(constantAPIService.SUCCESS_LOGIN,'successLogin');
		}


		// loginAPI.GetResultForRegistration = function(baseUrl,verb,dataToServer,scope){
						
		// 	var obj = commonAPIService.allVerbasFunction(baseUrl,"POST",dataToServer);
		// 	obj.getPostData().success(function(data,status, header, config){
		// 		if(data != null){
		// 			//loginAPI.storeIntoLS(data);
					
		// 			//setting the value to broadcast
		// 			$rootScope.successLogin = true;

		// 			//OFF loading Flag
		// 			scope.$parent.loadingFlag = false;

		// 			if(data === "Available"){
		// 				commonAPIService.triggerModel("success-alert","redirect","Info",constantAPIService.REGISTRATION_MESSAGE_AVAILABLE,"OK","","/",scope.alertInfo);
		// 			}//avaliable
		// 			else if(data === "Error"){
		// 				commonAPIService.triggerModel("error-alert","alert","Error",constantAPIService.LOGIN_VALIDATION,"OK","","",scope.alertInfo);
		// 			}//error
		// 			else if(data === "Invalid")
		// 			{
		// 				commonAPIService.triggerModel("error-alert","alert","Error",constantAPIService.LOGIN_VALIDATION,"OK","","",scope.alertInfo);
		// 			}
		// 			else
		// 			{

		// 				if (constantAPIService.IS_REGISTRATION === true){
		// 						var origin = window.location.origin, 
		// 						pathname = window.location.pathname,
		// 						loginPath = origin+pathname;

		// 						loginAPI.registrationDataInLS(data,loginPath);
								
		// 						//This is to set the class of the login page
		// 						$('body').removeClass('login-page');

								
		// 						var registerURL =loginPath+'register/index.html';

		// 						window.location = registerURL;
		// 				} 
		// 			}//end data condition
		// 		}//else data
		// 		//console.log(data);
		// 	}).error(function(data,status, header, config){

		// 		//Off of loading flag
		// 		scope.$parent.loadingFlag = false;

		// 		//this is to show the service error
		// 		commonAPIService.triggerModel("error-alert","alert","Error",constantAPIService.LOGIN_VALIDATION,"OK","","",scope.alertInfo);
		// 	});
	
		// }//GetResultForRegistration ended

		//After Login store the value in the localstorage
		loginAPI.registrationDataInLS = function(data,loginPath){
			//consultant name
			commonAPIService.setInLS(constantAPIService.AD_DETAILS_INFO,data);
			commonAPIService.setInLS(constantAPIService.DEFAULT_PATH,loginPath);
			//location
		}


		return loginAPI;

	}//factory end

})();
 ;(function() {
    'use strict';

    angular
        .module('xCCeedGlobalApp')
        .factory('infiniteFactory', ['$http', 'constantAPIService', 'commonAPIService', function($http, constantAPIService,commonAPIService) {
            var infiniteFactoryObj = function() {
                this.items = [];
                this.busy = false;
                this.after = 0;
            };

            infiniteFactoryObj.prototype.nextPage = function(recUrl, type, data,filterCounter,scope) {

            	if(recUrl !== undefined && type !== undefined){

	                //console.log('inside nextPage method ');

	                if (this.busy) return;
	                this.busy = true;

	                if(type.toLowerCase() == "get"){		                	

		                return $http.get(recUrl+this.after).success(function(resp) {

		                	//console.log('inside get condition');
		                	//console.log(resp);

		                	if(resp !== null && resp !== undefined && resp.length !== 0){			                		
			                    var items = resp;
			                    for (var i = 0; i < items.length; i++) {
			                        this.items.push(items[i]);
			                    }
			                    //console.log('Total items length ' +this.items.length);

			                    this.after = this.items.length;//this.items[this.items.length - 1].RowNumber;
			                    this.busy = false;
			                    //console.log(this.after);
		                	}
		                	else{
		                		this.busy = false;
		                	}
			                
			                //console.log(this.items.length);
		                    
		                }.bind(this)).error(function(data,status, header, config){
		                	//this is to show the service error

		                	
		                	if(data != null){
		                		scope.$parent.loadingFlag = false;
			                	if (data.Message === "" || data.Message === null){
			                		commonAPIService.triggerModel("error-alert","alert","Error",constantAPIService.SERVICE_ERROR,"OK","","",scope.alertInfo);
			                	}
			                	else{
			                		if(data.Message.match("Access Forbidden")||data.Message.match("Invalid indentity or client machine.")){
			                			commonAPIService.triggerModel("error-alert","redirectLogin","Error",constantAPIService.AUTH_ERROR,"OK","","/",scope.alertInfo);
			                			
			                		}
			                		else{
			                			commonAPIService.triggerModel("error-alert","redirectLogin","Error",data.Message,"OK","","/",scope.alertInfo);
			                		}	
			                	}
		                	}
		                	else{
		                		commonAPIService.triggerModel("error-alert","redirectLogin","Error",constantAPIService.SERVICE_ERROR,"OK","","/",scope.alertInfo);
		                	}
							
		                });


	                }
	                else if(type.toLowerCase() == 'post' && data !== undefined){
	                	var cntFilter = filterCounter * 50;
	                	return $http.post(recUrl+this.after, data).success(function(resp) {

		                	//console.log('inside post condition');
		                	//console.log(resp);

		                	if(resp !== null && resp !== undefined && resp.length !== 0){			                		
			                    var items = resp;
			                    for (var i = 0; i < items.length; i++) {
			                        this.items.push(items[i]);
			                    }
			                    //Row no not needed to get the specified record.
			                    this.after = cntFilter; //this.items[this.items.length - 1].RowNumber;
			                    this.busy = false;
			                    //console.log(this.after);
		                    }
		                	else{
		                		this.busy = false;
		                	}
		                }.bind(this)).error(function(data,status, header, config){
		                	//this is to show the service error
		                	scope.$parent.loadingFlag = false;
							if(data != null){
		                		scope.$parent.loadingFlag = false;
			                	if (data.Message === "" || data.Message === null){
			                		commonAPIService.triggerModel("error-alert","alert","Error",constantAPIService.SERVICE_ERROR,"OK","","",scope.alertInfo);
			                	}
			                	else{
			                		if(data.Message.match("Access Forbidden")||data.Message.match("Invalid indentity or client machine.")){
			                			commonAPIService.triggerModel("error-alert","redirectLogin","Error",constantAPIService.AUTH_ERROR,"OK","","/",scope.alertInfo);
			                			
			                		}
			                		else{
			                			commonAPIService.triggerModel("error-alert","redirectLogin","Error",data.Message,"OK","","/",scope.alertInfo);
			                		}	
			                	}
		                	}//else
		                	else{
		                		commonAPIService.triggerModel("error-alert","redirectLogin","Error",constantAPIService.SERVICE_ERROR,"OK","","/",scope.alertInfo);
		                	}
		                });
	                }
            	}
            };

            return infiniteFactoryObj;
        }]);

})();

 ;(function(){
	'use strict';

	peopleController.$inject = ['$scope', '$http', 'infiniteFactory', 'constantAPIService', 'commonAPIService', 'peopleAPIService', 'peopleSharedAPIService', 'filterAPIService'];
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

 ;angular.module('xCCeedGlobalApp')
    .factory('peopleAPIService', peopleAPIService);

/* @ngInject */
function peopleAPIService($http, $location, $timeout, $filter, constantAPIService, commonAPIService, filterAPIService) {
    //variable declaration
    var peopleAPI = {};
    //var peopleAPI.sharedData = {};
    peopleAPI.appliedFilterServiceURL = constantAPIService.BASE_SERVICE_URL + constantAPIService.routingDetails().PEOPLE_FILTER;


    peopleAPI.GetResult = function(baseUrl, verb, scope) {
        var result = false;
        var obj = commonAPIService.allVerbasFunction(baseUrl, verb);

        return obj.getTypeData().success(function(data, status, header, config) {}).error(function(data, status, header, config) {
            //console.log('Error');
            //Off of loading flag
            scope.$parent.loadingFlag = false;

            //this is to show the service error
            commonAPIService.triggerModel("error-alert", "alert", "Error", constantAPIService.SERVICE_ERROR, "OK", "", "", scope.alertInfo);
        });

        return result;
    }; //getResult ended

    peopleAPI.SearchDataResult = function(baseURL, verb) {
        var obj = commonAPIService.allVerbasFunction(baseUrl, verb);

        return obj.getTypeData().success(function(data, status, header, config) {}).error(function(data, status, header, config) {
            //console.log('Error');
            //Off of loading flag
            scope.$parent.loadingFlag = false;

            //this is to show the service error
            commonAPIService.triggerModel("error-alert", "alert", "Error", constantAPIService.SERVICE_ERROR, "OK", "", "", scope.alertInfo);
        });
    }


    //redirecting to perople details 
    peopleAPI.redirectToDetail = function() {
        $location.path('/peopleDetails');
    };

    //filtering is handled in the service for the 
    peopleAPI.filterForDetails = function(peopleList, id) {
        return $filter('filter')(peopleList, {
            User_Id: id
        });
    };

    peopleAPI.myProfileInLS = function(peopleList) {
        var employeeID = JSON.parse(commonAPIService.getFromLS(constantAPIService.EMPLOYEE_USER_ID));
        var myDetailsInLS = commonAPIService.getFromLS(constantAPIService.MY_PERSONALDETAILS);

        //This functionality is to check the data is present in ls ,if not then set into ls
        if (myDetailsInLS === null || myDetailsInLS === undefined || myDetailsInLS === "") {

            //Filter the list of people and get the personal information list on the basis of employee id 
            var myProfileData = peopleAPI.filterForDetails(peopleList, employeeID); //$filter('filter')(peopleList,employeeID);

            return myProfileData;
            // //save the personal details information in the ls
            // commonAPIService.setInLS(constantAPIService.MY_PERSONALDETAILS,myProfileData);
        } //end if 
    };


    return peopleAPI;
}; //end peopleAPISerivce;

 ;(function() {
    'use strict';

    peopleSharedAPIService.$inject = ['$http', '$rootScope', '$location', '$timeout', 'constantAPIService', 'commonAPIService'];
    angular.module('xCCeedGlobalApp')
        .factory('peopleSharedAPIService', peopleSharedAPIService)

    /* @ngInject */
    function peopleSharedAPIService($http, $rootScope, $location, $timeout, constantAPIService, commonAPIService) {
        //variable declaration
        var peopleSharedAPI = {};

        peopleSharedAPI.sharedPeopleData = [];

        peopleSharedAPI.sharedFilteredPeopleData = [];

        peopleSharedAPI.RoleFromLS = commonAPIService.getFromLS(constantAPIService.ROLE_ID);


        //peopleDetail page
        peopleSharedAPI.setPeopleData = function(data) {
                peopleSharedAPI.sharedPeopleData.push(data);

            } //getResult ended

        //filterPage
        peopleSharedAPI.setFilterPeopleData = function(data) {
                peopleSharedAPI.sharedFilteredPeopleData.push(data);

            } //ended

        //peopleDetails page
        peopleSharedAPI.getPeopleData = function() {
            return peopleSharedAPI.sharedPeopleData;
        }

        //filterPAge
        peopleSharedAPI.getFilteredPeopleData = function() {
            return peopleSharedAPI.sharedFilteredPeopleData;
        }

        //peopleDetail
        peopleSharedAPI.clearPeopleData = function() {
            return peopleSharedAPI.sharedPeopleData = [];
        }

        //filterPage
        peopleSharedAPI.clearFilteredPeopleData = function() {
            return peopleSharedAPI.sharedFilteredPeopleData = [];
        }

        peopleSharedAPI.setToLS = function(key, data) {
            //Info
            commonAPIService.setInLS(key, data);
        }

        peopleSharedAPI.getFromLS = function(key) {
            return commonAPIService.getFromLS(key);
        }

        peopleSharedAPI.removeFromLS = function(key) {
            commonAPIService.removeFromLS(key);
        }

        //manipulation of the data before loading the details page
        peopleSharedAPI.manupulateInfoBeforeLoading = function(data) {
            var oldReplaceString = "||";
            var newReplaceString = ", ";

            if (data != null || data != undefined) {
                var manupulateData = data;

                //language
                var consultantAdditonalDetail = data.Consultant_Additional_Detail;
                if (consultantAdditonalDetail.length > 0) {
                    var consultantAdditionData = consultantAdditonalDetail[0];

                    //languages
                    var language = consultantAdditionData.Languages;
                    if (language != null || language != undefined) {
                        //manupulateData.Consultant_Additional_Detail[0].Languages = language.replace(oldReplaceString,newReplaceString);

                        manupulateData.Consultant_Additional_Detail[0].Languages = commonAPIService.replaceAllOccurance(language, oldReplaceString, newReplaceString);
                    } //language

                    //Capabilities
                    var capabilities = consultantAdditionData.Capabilities;
                    if (capabilities != null || capabilities != undefined) {
                        //manupulateData.Consultant_Additional_Detail[0].Capabilities = capabilities.replace(oldReplaceString,newReplaceString);
                        manupulateData.Consultant_Additional_Detail[0].Capabilities = commonAPIService.replaceAllOccurance(capabilities, oldReplaceString, newReplaceString);

                    } //capabilities

                    //Sector
                    var sector = consultantAdditionData.Sector;
                    if (sector != null || sector != undefined) {
                        //manupulateData.Consultant_Additional_Detail[0].Sector = sector.replace(oldReplaceString,newReplaceString);
                        manupulateData.Consultant_Additional_Detail[0].Sector = commonAPIService.replaceAllOccurance(sector, oldReplaceString, newReplaceString);


                    } //sector

                    //Digital_Skills
                    var digitalSkills = consultantAdditionData.Digital_Skills;
                    if (digitalSkills != null || digitalSkills != undefined) {
                        //manupulateData.Consultant_Additional_Detail[0].Digital_Skills = digitalSkills.replace(oldReplaceString,newReplaceString);
                        manupulateData.Consultant_Additional_Detail[0].Digital_Skills = commonAPIService.replaceAllOccurance(digitalSkills, oldReplaceString, newReplaceString);

                    } //digitalSkills

                    //Managing Position
                    var management_Position = consultantAdditionData.Management_Position;
                    if (management_Position != null || management_Position != undefined) {
                        //manupulateData.Consultant_Additional_Detail[0].Digital_Skills = digitalSkills.replace(oldReplaceString,newReplaceString);
                        manupulateData.Consultant_Additional_Detail[0].Management_Position = commonAPIService.replaceAllOccurance(management_Position, oldReplaceString, newReplaceString);

                    } //management_Position

                    //manipulatedData return
                    return manupulateData;

                } //consultantAdditionalDetail length check
                //console.log(data);
            } //end if (data)
            //If there is no changes the return data
            return data;
        }

        //This modal is to set the modal
        peopleSharedAPI.modelEditPopUp = function() {
            var editInfo = {
                editHTMLId: 'editModal',
                editHeading: '',
                editMessage: '',
                eidtAction: '',
                editURL: ''
            };
            return editInfo;
        }

        //this functionality is to edit the detail info
        peopleSharedAPI.triggerEditModal = function(eHeading, eMessage, eAction, eURL, editInfo) {
            editInfo['editHeading'] = eHeading;
            //editInfo['editMessage'] = eMessage;
            //eidtAction[''],
            //editURL: eURL
            //$('#dynamicTemplate').remove();
            //$('.edit-message').append(eMessage);

            $('.edit-modal').modal({
                keyboard: false,
                backdrop: 'static'
            });
        }

        //dataToServer for managingPosition
        peopleSharedAPI.DataToServerManagingPositon = function(msg, uid) {
                var datatoServer = {
                    ManagingPosition: msg,
                    UserId: uid
                }

                return datatoServer;

            } //datatoserver

        //adding the contact in the data base
        peopleSharedAPI.UpdateManagingPositon = function(baseUrl, verb, dataToServer, scope, vm) {
                var obj = commonAPIService.allVerbasFunction(baseUrl, verb, dataToServer);
                return obj.getPostData().success(function(data, status, header, config) {}).error(function(data, status, header, config) {

                    vm.editFormSubmitWaitingMsg = false;

                    // //Off of loading flag
                    scope.$parent.loadingFlag = false;

                    // //this is to show the service error
                    commonAPIService.triggerModel("error-alert", "alert", "Error", constantAPIService.SERVICE_ERROR, "OK", "", "", scope.alertInfo);

                }); //end of the service call

            } //getResult ended

        peopleSharedAPI.FormatData = function(managingField1, managingField2) {
                var managingField = undefined;
                if (managingField1 === null || managingField1 === undefined || managingField1 === "") {
                    managingField = "";
                } else {
                    managingField = managingField1;
                }
                if (managingField2 === null || managingField2 === undefined || managingField2 === "") {
                    managingField2 = "";
                } else {

                    if (managingField === "") {
                        managingField = managingField2;
                    } else {
                        managingField = managingField + '||' + managingField2;
                    }
                }
                return managingField;
            } //end function FormatData


        //show edit Modal pop up
        peopleSharedAPI.showEditModal = function(vm, scope, managingPositionValue, userId) {
                // Reset the editFormSubmittedMsg flag to false each time edit modal triggered
                vm.editFormSubmittedMsg = false;

                var valueToUpdate = [];
                var splitValue = ',';
                var i = 0;

                //This is to check the value present or not
                if (managingPositionValue !== undefined && managingPositionValue !== "" && managingPositionValue !== null) {
                    valueToUpdate = managingPositionValue.split(splitValue);
                    for (i = 0; i <= 1; i++) {
                        if (valueToUpdate[i] === null || valueToUpdate[i] === undefined || valueToUpdate[i] === "") {
                            valueToUpdate[i] = "";
                        }
                        vm.managingField1 = valueToUpdate[0];
                        vm.managingField2 = valueToUpdate[1];
                    }

                }
                vm.userId = userId;

                var finalTagValue = '';

                //this is to trigger the modal
                peopleSharedAPI.triggerEditModal('Add / Update Role', finalTagValue, "", "", scope.editInfo);
            } //show edit modal


        //get the addition details and personal details data
        peopleSharedAPI.GetAdditionalDataResult = function(baseUrl, verb, scope) {
            var result = false;
            var obj = commonAPIService.allVerbasFunction(baseUrl, verb);

            return obj.getTypeData().success(function(data, status, header, config) {}).error(function(data, status, header, config) {
                //console.log('Error');
                //Off of loading flag
                scope.$parent.loadingFlag = false;

                //this is to show the service error
                commonAPIService.triggerModel("error-alert", "alert", "Error", constantAPIService.SERVICE_ERROR, "OK", "", "", scope.alertInfo);
            });

            return result;
        }; //getResult ended

        return peopleSharedAPI;

    }; //end peopleAPISerivce;

})();

 ;(function(){
	'use strict';	

		myDetailController.$inject = ['$scope', '$filter', 'constantAPIService', 'commonAPIService', 'peopleSharedAPIService'];
	angular.module('xCCeedGlobalApp')
		.controller('myDetailController',['$scope','$filter','constantAPIService','commonAPIService','peopleSharedAPIService',myDetailController]);
		
		/* @ngInject */
		function myDetailController($scope,$filter,constantAPIService,commonAPIService,peopleSharedAPIService){
			
			//variable decelaration
			var vm = this;
			var sharedPeopleData = undefined;
			var baseAdditionDetailURL =  constantAPIService.BASE_SERVICE_URL + constantAPIService.routingDetails().PEOPLE_ADD_DETAIL;
			vm.peopleDetailHeader = true;
			vm.singlePeopleData = undefined;
			vm.editFormSubmitWaitingMsg = false;
			vm.editFormSubmittedMsg = false;
			vm.LoggedInRole = peopleSharedAPIService.RoleFromLS;
			vm.showEditModal = showEditModal;
			vm.saveEditForm = saveEditForm;

			//edit modal
			$scope.editInfo = peopleSharedAPIService.modelEditPopUp();
			//this is to set the alert model object 
			$scope.$parent.alertInfo = commonAPIService.modelPopUp();

			//ON Loading flag
			$scope.$parent.loadingFlag = true;
			
			//getting the value from local storage
			var peopleInfoLS = peopleSharedAPIService.getFromLS(constantAPIService.MY_PERSONALDETAILS);
			

			if(peopleInfoLS != "undefined" && peopleInfoLS != null && peopleInfoLS != "")
			{
				//console.log(peopleInfoLS);
				//vm.singlePeopleData = (typeof peopleInfoLS === 'object' ? peopleInfoLS : JSON.parse(peopleInfoLS));
				var dataForManipulation = (typeof peopleInfoLS === 'object' ? peopleInfoLS : JSON.parse(peopleInfoLS));
				
				if(dataForManipulation != null || dataForManipulation != undefined){
					//sending the data for the manupulation
					vm.singlePeopleData=peopleSharedAPIService.manupulateInfoBeforeLoading(dataForManipulation);
				}//end if
				
				//ON Loading flag
				$scope.$parent.loadingFlag = false;

			}//end if
			else{
				showMyDetailView();
			}
		

			//This function is bring the data from the server of personal information
			function showMyDetailView(){
				//get the use id
				var loggedInUserID = JSON.parse(peopleSharedAPIService.getFromLS(constantAPIService.EMPLOYEE_USER_ID));

				if(loggedInUserID != "undefined" && loggedInUserID != null && loggedInUserID != "")
				{
					var baseAdditionDetailURLConcat = undefined;
					baseAdditionDetailURLConcat=baseAdditionDetailURL.concat(loggedInUserID);
					manipulationAdditonalDetail(baseAdditionDetailURLConcat);
				}

			}
			
			//This is to pull the data for the personal information from the system
			function manipulationAdditonalDetail(baseURL){
				//ON Loading flag
				$scope.$parent.loadingFlag = true;
				
				//this is to check the internet connection
				if (commonAPIService.checkNetworkConnection() === 'ONL'){
					peopleSharedAPIService.GetAdditionalDataResult(baseURL,"GET",$scope).then(function(resp){
						if(resp !== null && resp !== undefined){

								if('data' in resp){	
									//save the personal details information in the ls
									commonAPIService.setInLS(constantAPIService.MY_PERSONALDETAILS,resp.data);	

									//
									//console.log(peopleInfoLS);
										//vm.singlePeopleData = (typeof peopleInfoLS === 'object' ? peopleInfoLS : JSON.parse(peopleInfoLS));
										var dataForManipulation = resp.data;
										
										if(dataForManipulation != null || dataForManipulation != undefined){
											//sending the data for the manupulation
											vm.singlePeopleData=peopleSharedAPIService.manupulateInfoBeforeLoading(dataForManipulation);
										}//end if	
									//

								}//end of if
							}//resp data
							
								//OFF of the loading flag
								$scope.$parent.loadingFlag = false;
						});//end of the fucntion
				}//end of if internet connection check
				else
				{
					$scope.$parent.loadingFlag	= false;
					commonAPIService.triggerModel("error-alert","alert","Error",constantAPIService.INTERNET_ERROR,"OK","","",$scope.alertInfo);
				}//end internet connection
	
			}//end manipulationAdditonalDetail



			///Note changes made in myDetails controller need to be changed peopleDetail controller
			function showEditModal(managingPositionValue,userId){
				peopleSharedAPIService.showEditModal(vm,$scope,managingPositionValue,userId);
			}//end showedit modal


			/* Save edit form */
			function saveEditForm(){
				var updateManagingPositionURL = constantAPIService.BASE_SERVICE_URL + constantAPIService.routingDetails().EDIT_MANAGING_POSITION;
				if($scope.frmEditModal.$valid === false){return;}else{
					//console.log('you can submit the form');
					
					//ON Loading flag
					$scope.$parent.loadingFlag = true;

					var managingPosition = peopleSharedAPIService.FormatData(vm.managingField1,vm.managingField2);

					var dataToServer = peopleSharedAPIService.DataToServerManagingPositon(managingPosition,vm.userId);
					
					//this is to check the internet connection
					if (commonAPIService.checkNetworkConnection() === 'ONL'){
						vm.editFormSubmitWaitingMsg = true;
						peopleSharedAPIService.UpdateManagingPositon(updateManagingPositionURL,"PUT",dataToServer,$scope,vm).then(function(resp){
							
							//This flag is to display the message for the successfully edited
							$scope.$parent.loadingFlag = false;
							vm.editFormSubmitWaitingMsg = false;
							vm.editFormSubmittedMsg = true;

							//This will update the UI
							vm.singlePeopleData.Consultant_Additional_Detail[0].Management_Position = managingPosition.replace("||",", ");
							
							////now update the ls for the refresh part
								//getting the value from local storage
							var peopleInfoLS = peopleSharedAPIService.getFromLS(constantAPIService.MY_PERSONALDETAILS);
							if(peopleInfoLS != "undefined" && peopleInfoLS != null && peopleInfoLS != "")
							{	
									//convert the ls data to object form
									var temp = JSON.parse(peopleInfoLS)
									//console.log(temp);
									if(temp != null || temp != undefined){
										var consultantAdditonalDetail = temp.Consultant_Additional_Detail;
										if(consultantAdditonalDetail.length > 0){
												
												//Setting the value of Managing Position
												temp.Consultant_Additional_Detail[0].Management_Position  = commonAPIService.replaceAllOccurance(managingPosition,'||',', ');
												
												//var tempStringify = JSON.stringify(temp);
												peopleSharedAPIService.setToLS(constantAPIService.MY_PERSONALDETAILS,temp);

										}//consultantAdditionDetail		
									}//if peopleInfoLS

							}//end of people info 
							
						});///end updateManagingpostion

					}//end of internet check
					else
					{
						$scope.$parent.loadingFlag	= false;
						commonAPIService.triggerModel("error-alert","alert",constantAPIService.INTERNET_ERROR_HEADING,constantAPIService.INTERNET_ERROR,"OK","","",$scope.alertInfo);
					}

				}//scope editfrom Modal 
			}//end of function (Save edit )
			
			

		}//peopleDetailController

})(); // function end

 ;(function(){
	'use strict';	

		peopleDetailController.$inject = ['$scope', '$filter', 'constantAPIService', 'commonAPIService', 'peopleSharedAPIService'];
	angular.module('xCCeedGlobalApp')
		.controller('peopleDetailController',['$scope','$filter','constantAPIService','commonAPIService','peopleSharedAPIService',peopleDetailController]);
		
		/* @ngInject */
		function peopleDetailController($scope,$filter,constantAPIService,commonAPIService,peopleSharedAPIService){
			
			//variable decelaration
			var vm = this;
			var sharedPeopleData = undefined;
			vm.peopleDetailHeader = true;
			vm.singlePeopleData = undefined;
			vm.editFormSubmittedMsg = false;
			vm.editFormSubmitWaitingMsg = false;
			vm.LoggedInRole = peopleSharedAPIService.RoleFromLS;
			vm.showEditModal = showEditModal;
			vm.saveEditForm = saveEditForm;

			//this is for edit managing position
			$scope.editInfo = peopleSharedAPIService.modelEditPopUp();
			//this is to set the alert model object 
			$scope.$parent.alertInfo = commonAPIService.modelPopUp();
			
			//Scroll to top
			$('html, body').animate({scrollTop: '0px'}, 0);

			//getting the value from local storage
			var peopleInfoLS = peopleSharedAPIService.getFromLS(constantAPIService.PERSON_INFO);
			

			if(peopleInfoLS != "undefined" && peopleInfoLS != null && peopleInfoLS != "")
			{
				var temp = (typeof peopleInfoLS === 'object' ? peopleInfoLS : JSON.parse(peopleInfoLS));
				vm.singlePeopleData = peopleSharedAPIService.manupulateInfoBeforeLoading(temp);
			}
			else
			{
				//get the people releated information from the system.
				sharedPeopleData = peopleSharedAPIService.getPeopleData();
			
				if (sharedPeopleData != null)
				{
					if(sharedPeopleData.length >= 0)
					{
						peopleSharedAPIService.setToLS(constantAPIService.PERSON_INFO,sharedPeopleData[0]);	
						var dataForManipulation	= sharedPeopleData[0];
						///
							if(dataForManipulation != null || dataForManipulation != undefined){
								//sending the data for the manupulation
								vm.singlePeopleData=peopleSharedAPIService.manupulateInfoBeforeLoading(dataForManipulation);
							}//end if
						///

						vm.singlePeopleData = sharedPeopleData[0];
						//console.log(vm.singlePeopleData);
													
					}//shared people data
				}//if end sharedPeopleData;
			}//end of else


			//OFF Loading flag
			$scope.$parent.loadingFlag = false;

			//this is defined in the shared service as used by both the controller myDetail and peopleDetail
			function showEditModal(managingPositionValue,userId){
				peopleSharedAPIService.showEditModal(vm,$scope,managingPositionValue,userId);
			}

			/* Save edit form */
			function saveEditForm(){
				
				var updateManagingPositionURL = constantAPIService.BASE_SERVICE_URL + constantAPIService.routingDetails().EDIT_MANAGING_POSITION;
				if($scope.frmEditModal.$valid === false){return;}else{
					//console.log('you can submit the form');

					//ON Loading flag
					$scope.$parent.loadingFlag = true;
					
									
					var managingPosition = peopleSharedAPIService.FormatData(vm.managingField1,vm.managingField2);

					var dataToServer = peopleSharedAPIService.DataToServerManagingPositon(managingPosition,vm.userId);
					
					
					//this is to check the internet connection
					if (commonAPIService.checkNetworkConnection() === 'ONL'){
						
						vm.editFormSubmitWaitingMsg = true;

						peopleSharedAPIService.UpdateManagingPositon(updateManagingPositionURL,"PUT",dataToServer,$scope,vm).then(function(resp){
							
							//This flag is to display the message for the successfully edited
							$scope.$parent.loadingFlag = false;
							vm.editFormSubmitWaitingMsg = false;
							vm.editFormSubmittedMsg = true;
							
							//This will update the UI
							vm.singlePeopleData.Consultant_Additional_Detail[0].Management_Position =managingPosition.replace("||",", ");
							
							////now update the ls for the refresh part
							//getting the value from local storage
							var peopleInfoLS = peopleSharedAPIService.getFromLS(constantAPIService.PERSON_INFO);
							if(peopleInfoLS != "undefined" && peopleInfoLS != null && peopleInfoLS != "")
							{	
									//convert the ls data to object form
									var temp = JSON.parse(peopleInfoLS)
									//console.log(temp);
									if(temp != null || temp != undefined){
										var consultantAdditonalDetail = temp.Consultant_Additional_Detail;
										if(consultantAdditonalDetail.length > 0){
												
												//Setting the value of Managing Position
												temp.Consultant_Additional_Detail[0].Management_Position  = commonAPIService.replaceAllOccurance(managingPosition,'||',', ');
												
												//var tempStringify = JSON.stringify(temp);
												peopleSharedAPIService.setToLS(constantAPIService.PERSON_INFO,temp);

										}//consultantAdditionDetail		
									}//if peopleInfoLS

							}//end of people info 
							
						});///end updateManagingpostion
					}
					else{
						$('#'+$scope.editInfo.editHTMLId).modal('hide');
						$scope.$parent.loadingFlag	= false;
						commonAPIService.triggerModel("error-alert","alert",constantAPIService.INTERNET_ERROR_HEADING,constantAPIService.INTERNET_ERROR,"OK","","",$scope.alertInfo);
					}

				}//scope editfrom Modal 
			}//end of function (Save edit )


		}//peopleDetailController

})(); // function end
	
 ;/*	
	Author: Dhruv Mistry & Jatinder
	view file: filterPeople.html
	controller: filterController
	controllerAs: filterCtrl
*/

(function() {
    'use strict';

    filterController.$inject = ['$scope', '$filter', '$location', '$timeout', 'constantAPIService', 'commonAPIService', 'filterAPIService', 'peopleSharedAPIService'];
    angular.module('xCCeedGlobalApp')
        .controller('filterController', ['$scope', '$filter', '$location', '$timeout', 'constantAPIService', 'commonAPIService','filterAPIService','peopleSharedAPIService', filterController]);

    /* @ngInject */
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
            //this is to check the internet connection
            if (commonAPIService.checkNetworkConnection() === 'ONL'){
                /* No items in tempAppliedArr empty the appliedFilter localStroage values */
                if(tempAppliedArr.length === 0){
                    localStorage.setItem(constantAPIService.APPLIED_FILTERS_OBJ, tempAppliedArr);
                }
                
                //This page will redirect to people page
                filterAPIService.redirectToDetail();
            }
            else{
                $scope.$parent.loadingFlag  = false;
                commonAPIService.triggerModel("error-alert","alert",constantAPIService.INTERNET_ERROR_HEADING,constantAPIService.INTERNET_ERROR,"OK","","",$scope.alertInfo);
            }
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

 ;(function() {
	'use strict';

		filterAPIService.$inject = ['$http', '$location', '$timeout', 'commonAPIService', 'constantAPIService'];
	angular.module('xCCeedGlobalApp')
		.factory('filterAPIService', filterAPIService);

		/* @ngInject */
		function filterAPIService($http,$location,$timeout,commonAPIService,constantAPIService){
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
		};//end of filterAPIService

})();
 ;(function(){
	'use strict';
	
		contactController.$inject = ['$scope', '$timeout', 'constantAPIService', 'commonAPIService', 'contactAPIService'];
angular.module('xCCeedGlobalApp')
	.controller('contactController',['$scope','$timeout','constantAPIService','commonAPIService','contactAPIService',contactController]);
		
		/* @ngInject */
		function contactController($scope,$timeout,constantAPIService,commonAPIService,contactAPIService){
			
			//variable decelearation
			var vm = this;
			vm.contactHeader = true;
			$scope.$parent.loadingFlag = false;
			var baseURL = undefined;
			//this is to set the alert model object 
			$scope.$parent.alertInfo = commonAPIService.modelPopUp();

			//text area count information
    		setTimeout(function(){
        		textAreaContentCount();
    		},0);

    		function textAreaContentCount() {
        			commonAPIService.remainingCharCount('contactAdminMsgBox');
        			$('#contactAdminMsgBox').keyup(function(){
            		commonAPIService.remainingCharCount('contactAdminMsgBox')
        		});

    		}//end text area content count

			//functions
			$scope.saveContact = function($event){

				$event.preventDefault();

				//this variable is set for the validation
				$scope.submitted = true;

				/* 	If form is not valid return back this condition and form must have ng-model to validate the fields, 
					else it won't work Angular way!
				 */
				if(!$scope.contactForm.$valid){
					return;
				}


				//set the base url
				baseURL = constantAPIService.BASE_SERVICE_URL + constantAPIService.routingDetails().CONTACT_ADMIN;

				//get the logged in user from ls
				var loggedInUser = commonAPIService.getFromLS(constantAPIService.EMPLOYEE_USER_ID);	

				//get the message from the ui
				var contactAdminMsg = contactAdminMsgBox.value;
				
				//validate the ui.
				//contactAPIService.validateContact(contactAdminMsg,$scope);
				var dataToServer = contactAPIService.DataToServer(contactAdminMsg,loggedInUser);

				//this is to check the internet connection
				if (commonAPIService.checkNetworkConnection() === 'ONL'){
					//login service call (Not all the operation and setting is done in loginService)
					contactAPIService.SetContact(baseURL,"POST",dataToServer,$scope);
				}
				else{
					$scope.$parent.loadingFlag	= false;
					commonAPIService.triggerModel("error-alert","alert",constantAPIService.INTERNET_ERROR_HEADING,constantAPIService.INTERNET_ERROR,"OK","","",$scope.alertInfo);
				}//internet connection
				
			}//end of add contact

		}//end of people controller
})(); // function end
 ;(function() {
    'use strict';

    contactAPIService.$inject = ['$http', '$location', '$timeout', 'constantAPIService', 'commonAPIService'];
    angular.module('xCCeedGlobalApp')
        .factory('contactAPIService', contactAPIService);

    /* @ngInject */
    function contactAPIService($http, $location, $timeout, constantAPIService, commonAPIService) {
        var contactAPI = {};

        contactAPI.DataToServer = function(msg, uid) {
                var datatoServer = {
                    User_Id: uid,
                    message: msg
                }

                return datatoServer;

            } //datatoserver

        //adding the contact in the data base
        contactAPI.SetContact = function(baseUrl, verb, dataToServer, scope) {
                var obj = commonAPIService.allVerbasFunction(baseUrl, "POST", dataToServer);
                obj.getPostData().success(function(data, status, header, config) {
                    if (data != null) {

                        //after success full entry in the data base
                        commonAPIService.triggerModel("success-alert", "redirect", "Message Saved", constantAPIService.INSERTION_SUCCESS, "OK", "", "#people", scope.alertInfo);

                    }
                    //console.log(data);
                }).error(function(data, status, header, config) {

                    //Off of loading flag
                    scope.$parent.loadingFlag = false;

                    //this is to show the service error
                    commonAPIService.triggerModel("error-alert", "alert", "Error", constantAPIService.SERVICE_ERROR, "OK", "", "", scope.alertInfo);

                }); //end of the service call

            } //getResult ended
        return contactAPI;
    }; //end of Contact

})();

 ;(function(){
	'use strict'


	angular.module('xCCeedGlobalApp')

	.directive('autoListDivider', ['$timeout', function($timeout) {  
		var lastDivideKey = "";

		return {
			link: function(scope, element, attrs) {

				var key = attrs.autoListDividerValue;

				//console.log();

				//var peopleListLnth = scope.$parent.peopleCtrl.peopleList.length, count = 0;

				var defaultDivideFunction = function(k){
					return k.slice( 0, 1 ).toUpperCase();
				}
	      
				var doDivide = function(){
					var divideFunction = scope.$apply(attrs.autoListDividerFunction) || defaultDivideFunction;

					var divideKey = divideFunction(key);
					
					if(divideKey != lastDivideKey) { 
						var contentTr = angular.element("<div class='item item-divider' id='item-divider-"+divideKey+"'>"+divideKey+"</div>");
						element[0].appendChild(contentTr[0], element[0]);
					}

					lastDivideKey = divideKey;
				}
			  
				$timeout(doDivide,0);

				//console.log(peopleListLnth +' ' + count);
				//console.log(doDivide());

				/*
if(peopleListLnth == count){
					$('.jsAlphaChar').fadeIn('slow');
				}else{
					$('.jsAlphaChar').fadeOut('fast');
				}
*/
				

			}
		}
	}]);
	
})();