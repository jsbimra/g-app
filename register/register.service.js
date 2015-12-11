(function() {
    'use strict';


    angular
        .module('xCCeedGlobalApp')
        .factory('registerService', registerService);

    registerService.$inject = ['$http'];

    /* @ngInject */
    function registerService($http) {
        var service = {
            validateForm        : validateForm,
            saveFormDetails     : saveFormDetails,
            getLocalStorageData : getLocalStorageData,
            formatPhoneNo       : formatPhoneNo
        };
        return service;

        /* Service defination of the function's */

        function validateForm(formObj) {
        	/*  If form is not valid return back this condition and form must have ng-model to validate the fields, 
                else it won't work Angular way!
             */
            if(formObj !== undefined && formObj !== null){
	        	console.log('validation status ' +formObj.$valid);

                if(formObj.$valid){
                	return true;
                }else{
                	$('input.ng-invalid:eq(0)').focus();
                	$('select.ng-invalid:eq(0)').focus();
                	return false;
                }

            }
        }

        function saveFormDetails(postDataObj) {
            console.log(postDataObj);
            console.log(JSON.stringify(postDataObj));
        	console.log('saveFormDetails fired!');
        }

        /* Returning localStorage data */
        function getLocalStorageData(keyname){
        	if(keyname !== undefined && keyname !== null){
	        	var res = localStorage.getItem(keyname) !== null ? JSON.parse(localStorage.getItem(keyname)) : [];
	        	return res;	
        	}else{
        		console.log('Please pass the key name');
        	}
        }

        /* Format phone num */
        function formatPhoneNo(strNum){
            if(strNum){
                var cc, first3, second3, restAll, formatStr;

                if(strNum.length <=7){
                    cc = strNum.substr(-strNum.length, 2);
                    first3 = strNum.substr(-(strNum.length-2), 3);
                    restAll = strNum.substr(-(strNum.length-5), strNum.length);
                    formatStr = '+'+cc + '-'+ first3 +'-'+ restAll;
                }else{
                    cc = strNum.substr(-strNum.length, 2);
                    first3 = strNum.substr(-(strNum.length-2), 3);
                    second3 = strNum.substr(-(strNum.length-5), 3);
                    restAll = strNum.substr(-(strNum.length-8), strNum.length);
                    formatStr = '+'+cc + '-'+ first3 + '-'+second3 +'-'+ restAll;

                }

                //for unformat later
                //var c = formatStr.replace(/-/g,'');

                return formatStr;
            }
        }
    }

})();