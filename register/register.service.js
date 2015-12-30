(function() {
    'use strict';


    angular
        .module('xCCeedGlobalApp')
        .factory('registerService', registerService);

    registerService.$inject = ['$http','commonAPIService'];

    /* @ngInject */
    function registerService($http,commonAPIService) {
        var service = {
            validateForm        : validateForm,
            saveFormDetails     : saveFormDetails,
            getLocalStorageData : getLocalStorageData,
            formatPhoneNo       : formatPhoneNo,
            reformatToPipe      : reformatToPipe,
            logoutRegister      : logoutRegistration
            
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

                    //Scroll to top
                    $('.ng-invalid:eq(0)').animate({scrollTop: '0px'}, 500);
                	$('input.ng-invalid:eq(0)').focus();
                	$('select.ng-invalid:eq(0)').focus();   
                	return false;
                }

            }
        }

        function saveFormDetails(postDataObj,saveConsultantURL,accessToken,vm,errorFromService) {
            console.log(postDataObj);
            console.log(JSON.stringify(postDataObj));
            // var accessToken = commonAPIService.getFromLS(accessToken);    
            //     accessToken = JSON.parse(accessToken);
            vm.loadingFlag = true;
            //Save service fucntion call is done
            var obj = commonAPIService.allVerbasFunction(saveConsultantURL,"POST",postDataObj);
                    
                return obj.getPostData().success(function(data,status, header, config){
                    
                }).error(function(data,status, header, config){
                    //Off of loading flag
                    vm.loadingFlag = false;

               
                });

            //

        	//console.log('saveFormDetails fired!');
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

        // logout
        function logoutRegistration(){
            commonAPIService.registrationLogout();
        }

      

        function reformatToPipe(arrValue){
            if(arrValue !== undefined && angular.isArray(arrValue)){
                var str     = arrValue.toString(),
                    reStr   = str.replace(/,/g,'||');
                    return reStr;
            }else{
                console.log('Something wrong with parameter values' + arrValue);
            }
        }
    }

})();