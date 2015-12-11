(function() {
	 'use strict';
	

	angular.module('xCCeedGlobalApp')
		.factory('commonAPIService', function($http, $location,constantAPIService){
		
		//variable declaration
		var commonService={};

		//get the data from LS
		commonService.getFromLS = function(key)
		{
			if(key && key != undefined){
						var record = localStorage[key];	
							if(record != '' && record != undefined){
								return record;					
							}
							else{
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
    	commonService.allVerbasFunction = function(baseURL,type,param){
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

		// commonService.addSpaceAfterReplace = function(str,find,replace){
		// 	//return str.split(find).joinreplace);
		// }//

		return commonService;

	});//factory end


})();//function end