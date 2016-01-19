(function() {
    'use strict';

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
