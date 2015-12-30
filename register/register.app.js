(function() {
    'use strict';

    //Register angular module
    angular
        .module('xCCeedGlobalApp', ['ngAnimate', 'ngMessages',]);

    //Multiple select directive 
    angular.module('xCCeedGlobalApp')
        .directive('requireMultiple', function ($timeout) {
            return {
                require: 'ngModel',
                link: function postLink(scope, element, attrs, ngModel) {
                    // /console.clear();
                    // /console.log(attrs.ngMaxlength);

                    ngModel.$validators.ngRequired = function (selectedArrayVal) {
                        
                        if(angular.isArray(selectedArrayVal) && selectedArrayVal.length <= attrs.ngMaxlength){
                            /*console.log(angular.isArray(selectedArrayVal) && selectedArrayVal.length <= attrs.ngMaxlength);
                            console.log(selectedArrayVal);
                            console.log(ngModel);*/
                            return true;
                        }                        
                        if(angular.isArray(selectedArrayVal) && (selectedArrayVal.length > attrs.ngMaxlength)){

                            /*console.log('inside count greater than max length');
                            console.log(selectedArrayVal);
                            // /console.log(angular.isArray(selectedArrayVal) && selectedArrayVal.length > attrs.ngMaxlength);
                            console.log(ngModel.$modelValue);*/
                            
                            $timeout(function(){
                                $(element).siblings('.error').removeClass('ng-hide ng-inactive')
                                
                                if($(element).siblings('.error').find('.jsExceedMsg').length === 0){
                                    $(element).siblings('.error').empty().append('<div class="jsExceedMsg">You exceded maximum selections.</div>');   
                                }else{
                                    $(element).siblings('.error').find('.jsExceedMsg').html('You exceded maximum selections.');
                                }
                            },0);
                            
                            return false;
                        }   
                    };
                    
                }
            };
        });

   //Register Controller
    angular
        .module('xCCeedGlobalApp')
        .controller('registerController',['$http', '$scope', 'registerService', 'masterAPIService','constantAPIService','commonAPIService', registerController]);
        
        
            /* @ngInject */
            function registerController($http, $scope, registerService, masterAPIService,constantAPIService,commonAPIService) {
                var vm = this;

                vm.loadingFlag = false;
              
                vm.alertInfo = commonAPIService.modelPopUp();
                
                vm.countriesArray     = registerService.getLocalStorageData('Glo_Countries')     !== undefined ? registerService.getLocalStorageData('Glo_Countries') : [];
                vm.designationArray   = registerService.getLocalStorageData('Glo_Designation')   !== undefined ? registerService.getLocalStorageData('Glo_Designation') : [];
                vm.sectorsArray       = registerService.getLocalStorageData('Glo_Sectors')       !== undefined ? registerService.getLocalStorageData('Glo_Sectors') : [];
                vm.capabalitiesArray  = registerService.getLocalStorageData('Glo_Capabilities')  !== undefined ? registerService.getLocalStorageData('Glo_Capabilities') : [];
                vm.digitalSkillsArray = registerService.getLocalStorageData('Glo_Digital_Skills') !== undefined ? registerService.getLocalStorageData('Glo_Digital_Skills') : [];
                vm.languagesArray     = registerService.getLocalStorageData('Glo_Language')      !== undefined ? registerService.getLocalStorageData('Glo_Language') : [];
                vm.userDetails        = registerService.getLocalStorageData('AD_PERSONAL_DETAIL') !== undefined ? registerService.getLocalStorageData('AD_PERSONAL_DETAIL') : [];
                
                vm.title                 = 'Registration Form';
                vm.userid                = vm.userDetails.UserLoginName;
                vm.username              = vm.userDetails.UserFullName;
                vm.emailId               = vm.userDetails.UserEmailID;
                vm.hidFirstName          = vm.userDetails.UserFirstName;
                vm.hidLastName           = vm.userDetails.UserLastName;
                vm.hidProfileURL         = vm.userDetails.UserProfileURL;

                vm.sinceYear             = '';
                vm.mobileCCode           = '';
                vm.workCCode             = '';
                vm.sectorsList           = [];
                vm.capabilitiesList      = [];
                vm.digitalSkillsList     = [];
                vm.languagesList         = [];
                vm.showErrorYearMsg      = false;
                vm.checkValidYear        = checkValidYear;
                vm.curYear               = new Date().getFullYear();
                vm.resetForm             = resetForm;
                vm.submitRegisterEmpForm = submitRegisterEmpForm;
                vm.logoutRegistration    = logoutRegistration;
                vm.alreadyRegisterMsg    = false;

                //baseURL 
                var saveConsultantURL =  constantAPIService.BASE_SERVICE_URL + constantAPIService.routingDetails().REGISTRATION;


                /* watch expression to watch */

                //.sinceYear.$invalid = true;


                /* register service test */

                /* Getting master data to populate dropdown values */
                /*masterAPIService.getMasterData().then(function(){
                    console.log('master data call successfull');
                    vm.loadingFlag = false;
                });*/

                function checkValidYear(year){
                    if(year != 0 && (year > vm.curYear || year < 1950)){
                        $scope.registerEmpForm.sinceYear.$setValidity('valid', false);
                        vm.showErrorYearMsg = true;
                    }else{
                        $scope.registerEmpForm.sinceYear.$setValidity('valid', true);
                        vm.showErrorYearMsg = false;
                    }
                }

                /* reset register form */
                function resetForm(){

                    $scope.registerEmpForm.$setUntouched();
                    $scope.registerEmpForm.$setPristine();

                    //$scope.registerEmpForm.$setValidity('valid',false);
                    $('input').val('');
                    $('select').find('option:eq(0)').prop('selected',true); 
                    console.log($scope.registerEmpForm);
                }

                //logout functionality set
                function logoutRegistration(){
                    //This will logout the registration
                    registerService.logoutRegister();
                }

                function RegistrationCheckOnLoad(){

                }

                /* submit register form */
                function submitRegisterEmpForm($event){
                    $event.preventDefault();

                    //this variable is set for the validation
                    $scope.submitted = true;
                    
                    if(!registerService.validateForm($scope.registerEmpForm)){return;}
                    else{
                        
                        if(vm.workCCode === undefined || vm.workPhone === undefined)
                        {
                            vm.workCCode = "";
                            vm.workPhone = "";   
                        }                                             
                                                
                        var preparedPostData = 
                        {
                                userid:            $.trim(vm.userid),
                                username:          $.trim(vm.username),
                                firstName:         $.trim(vm.userDetails.UserFirstName),
                                lastName:          $.trim(vm.userDetails.UserLastName),
                                profileURL:        $.trim(vm.userDetails.UserProfileURL),
                                currentRole:       $.trim(vm.currentRole),
                                sinceYear:         $.trim(vm.sinceYear),
                                country:           $.trim(vm.country),
                                city:              $.trim(vm.city),
                                mobileNumber:      $.trim(registerService.formatPhoneNo(vm.mobileCCode+vm.mobileNumber+'')), //'' for sending as string rather than integer no
                                emailId:           $.trim(vm.emailId),
                                workPhone:         $.trim(registerService.formatPhoneNo(vm.workCCode+vm.workPhone+'')) !== '+Na-N-N' ? $.trim(registerService.formatPhoneNo(vm.workCCode+vm.workPhone+'')) : '', //'' for sending as string rather than integer no
                                extenstion:        $.trim(vm.extenstion),
                                sectorsList:       registerService.reformatToPipe(vm.sectorsList),
                                capabilitiesList:  registerService.reformatToPipe(vm.capabilitiesList),
                                digitalSkillsList: registerService.reformatToPipe(vm.digitalSkillsList),
                                languagesList:     registerService.reformatToPipe(vm.languagesList)
                            };

                            //console.log(preparedPostData.workPhone);
                            //return;
                            //Registration is completed do the opertaion
                            registerService.saveFormDetails(preparedPostData,saveConsultantURL,constantAPIService.LOGIN_TOKEN,vm,constantAPIService.SERVICE_ERROR).then(function(resp){
                                
                                //OFF Loading flag
                                vm.loadingFlag = false;

                                if(resp.data === "Available"){
                                    //commonAPIService.triggerModel("success-alert","redirect","Success",constantAPIService.REGISTRATION_MESSAGE_AVAILABLE,"OK","","/",vm.alertInfo);
                                    vm.alreadyRegisterMsg = true;
                                    //return;
                                }//avaliable
                                else if(resp.data === "Invalid"){
                                    //commonAPIService.triggerModel("success-alert","redirect","Success",constantAPIService.REGISTRATION_MESSAGE_AVAILABLE,"OK","","/",vm.alertInfo);
                                    vm.alreadyRegisterMsg = '/';
                                    //return;
                                }//avaliable
                                else{
                                    window.location.href = 'thankyou.html';
                                }
                            });


                    }
                }

                /* Bind country code to respective input fields */
                $('select[name="country"').change(function(){

                    var ele = $(this);

                    if(ele !== undefined){
                        var cc = $(ele).find('option:selected').data('code');
                        vm.mobileCCode  = cc;
                        vm.workCCode    = cc;
                    }
                });
                


            }

        ;
})();