'use strict';
/**
  * @ngdoc service
  * @name MODULE_NAME.InitService
  * 
  * @description
  * This handles loading the required configuration data to cache
  *
**/
angular.module('dataSCAPEApp').service('InitService', ['$q', 'NetworkService',
    function ($q, networkService) {
        var _this = this;
        _this.initializeApp = function () {
            var des = $q.defer();
            _this.loadConfigurations().then(function (responseData) {
                des.resolve(responseData);
            });
            return des.promise;
        };

        _this.loadConfigurations = function () {
            var des = $q.defer();
            networkService.openURL(Constants.CONFIGURATION_FILEPATH, Constants.HTTPMETHOD_GET,
                {}, {}).then(function (objResponse) {
                    networkService.openURL(Constants.getEnv, Constants.HTTPMETHOD_GET, {}, {}).then(function (resEnv) {
                        if (!angular.isUndefinedOrNull(objResponse.data) && !
                            angular.isUndefinedOrNull(resEnv.data.webservicehost)) {
                            objCacheDetails.userDetails = {};
                            objCacheDetails.data = {};
                            objCacheDetails.protocol = resEnv.data.protocol;
                            objCacheDetails.webservicehost = resEnv.data.webservicehost;
                            objCacheDetails.webserviceport = resEnv.data.webserviceport;
                            objCacheDetails.webserviceUrl = objCacheDetails.protocol + "://" + objCacheDetails.webservicehost + ":" + objCacheDetails.webserviceport + "/";
                            objCacheDetails.endpoints = objResponse.data.endpoints;
                            objCacheDetails.datascapeweburl = resEnv.data.datascapeweburl;
                            des.resolve(true);
                        } else {
                            des.resolve(false);
                            swal('Backend services not ready, try again after some time');
                        }
                    });
                });
            return des.promise;
        }
    }]);