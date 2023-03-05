'use strict';

/**
  * @ngdoc service
  * @name MODULE_NAME.NetworkService
  * 
  * @description
  * This handles communicating to network
  *
**/
angular.module('dataSCAPEApp').service('NetworkService', ['$q', '$http',
    function ($q, $http) {
        this.openURL = function (strPath, strMethod, objQueryParam, objHeaders, dataObject) {
            if (angular.isUndefinedOrNull(strMethod)) {
                strMethod = 'GET';
            }
            if (angular.isUndefinedOrNull(objQueryParam)) {
                objQueryParam = {};
            }
            if (angular.isUndefinedOrNull(objHeaders)) {
                objHeaders = {};
            }
            var des = $q.defer();
            if (navigator.onLine) {
                objHeaders["Cache-Control"] = "no-cache, no-store, must-revalidate";
                objHeaders["Pragma"] = "no-cache";
                objHeaders["Expires"] = "0";
                var objNetworkData = {
                    method: strMethod,
                    url: strPath, params: objQueryParam,
                    timeout: Constants.intHttpRequestTimeout,
                    headers: objHeaders,
                    cache: false
                };
                if (!angular.isUndefinedOrNull(dataObject)) {
                    objHeaders["Content-Type"] = "application/json"; //TODO to cusotmize
                    objNetworkData['data'] = dataObject;
                }
                $http(
                    objNetworkData
                ).success(function (data, status, headers, config) {
                    var objResponse = { "data": data, "status": status, "headers": headers, "config": config };
                    des.resolve(objResponse);
                }).error(function (data, status, headers, config) {
                    var objResponse = { "data": data, "status": status, "headers": headers, "config": config };
                    des.resolve(objResponse);
                });
            } else {
                des.resolve(null);
            }
            return des.promise;
        };
    }]);