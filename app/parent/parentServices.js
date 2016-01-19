(function() {
    'use strict';

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
