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
        .controller('registerController',['$http', '$scope', 'registerService', 'masterAPIService', registerController]);
        
        
            /* @ngInject */
            function registerController($http, $scope, registerService, masterAPIService) {
                var vm = this;

                vm.loadingFlag = true;

                vm.countriesArray     = registerService.getLocalStorageData('Glo_Countries')     !== undefined ? registerService.getLocalStorageData('Glo_Countries') : [];
                vm.designationArray   = registerService.getLocalStorageData('Glo_Designation')   !== undefined ? registerService.getLocalStorageData('Glo_Designation') : [];
                vm.sectorsArray       = registerService.getLocalStorageData('Glo_Sectors')       !== undefined ? registerService.getLocalStorageData('Glo_Sectors') : [];
                vm.capabalitiesArray  = registerService.getLocalStorageData('Glo_Capabalities')  !== undefined ? registerService.getLocalStorageData('Glo_Capabalities') : [];
                vm.digitalSkillsArray = registerService.getLocalStorageData('Glo_Digital_Skill') !== undefined ? registerService.getLocalStorageData('Glo_Digital_Skill') : [];
                vm.languagesArray     = registerService.getLocalStorageData('Glo_Language')      !== undefined ? registerService.getLocalStorageData('Glo_Language') : [];

                vm.title                 = 'Registration Form';
                vm.userid                = 'dummy';
                vm.username              = 'dummy';
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
                vm.submitRegisterEmpForm = submitRegisterEmpForm;

                /* watch expression to watch */

                //.sinceYear.$invalid = true;

                /* register service test */

                /* Getting master data to populate dropdown values */
                masterAPIService.getMasterData().then(function(){
                    console.log('master data call successfull');
                    vm.loadingFlag = false;
                });

                function checkValidYear(year){
                    if(year != 0 && (year > vm.curYear || year < 1950)){
                        $scope.registerEmpForm.sinceYear.$setValidity('valid', false);
                        vm.showErrorYearMsg = true;
                    }else{
                        $scope.registerEmpForm.sinceYear.$setValidity('valid', true);
                        vm.showErrorYearMsg = false;
                    }
                }

                /* submit register form */
                function submitRegisterEmpForm($event){
                    $event.preventDefault();

                    //this variable is set for the validation
                    $scope.submitted = true;
                    
                    if(!registerService.validateForm($scope.registerEmpForm)){return;}
                    else{
                        var preparedPostData = {
                                userid:            $.trim(vm.userid),
                                username:          $.trim(vm.username),
                                currentRole:       $.trim(vm.currentRole),
                                sinceYear:         $.trim(vm.sinceYear),
                                country:           $.trim(vm.country),
                                city:              $.trim(vm.city),
                                mobileNumber:      $.trim(registerService.formatPhoneNo(vm.mobileCCode+vm.mobileNumber+'')), //'' for sending as string rather than integer no
                                emailId:           $.trim(vm.emailId),
                                workPhone:         $.trim(registerService.formatPhoneNo(vm.workCCode+vm.workPhone+'')), //'' for sending as string rather than integer no
                                extenstion:        $.trim(vm.extenstion),
                                sectorsList:       vm.sectorsList,
                                capabilitiesList:  vm.capabilitiesList,
                                digitalSkillsList: vm.digitalSkillsList,
                                languagesList:     vm.languagesList
                            };

                        registerService.saveFormDetails(preparedPostData);
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