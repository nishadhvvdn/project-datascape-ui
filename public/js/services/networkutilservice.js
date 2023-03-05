/**
 * @ngdoc service
 * @name MODULE_NAME.NetworkUtilService
 *
 * @description
 * This handles request for all endpoints and populate response
 *
 **/
angular.module('dataSCAPEApp').service('NetworkUtilService', ['$q', 'NetworkService', 'InitService',
    function ($q, networkService, InitService) {
        var _this = this;
        _this.createHttpRequestAndGetResponse = function (endpointName, arrInputData) {
            var des = $q.defer();
            if (angular.isUndefined(objCacheDetails.endpoints)) {
                InitService.initializeApp().then(function () {
                    _this.request(des, endpointName, arrInputData);
                })
            } else {
                _this.request(des, endpointName, arrInputData);
            }
            return des.promise;
        }
        _this.request = function (des, endpointName, arrInputData) {
            let objLoginEndPoints;
            let endpointNameWithQueryParam ;
            if(endpointName.includes("?")) {
                endpointNameWithQueryParam = endpointName;
                let nameArray = endpointName.split('?');
                endpointName = nameArray[0];
            }
            objLoginEndPoints = angular.copy(objCacheDetails.endpoints[endpointName]);
            if (!angular.isUndefined(objLoginEndPoints)) {
                var objData = null;
                if (!angular.isUndefined(objLoginEndPoints.data) && !angular.isUndefined(arrInputData)) {
                    objData = _this.populateData(arrInputData, objLoginEndPoints.data);
                }
                if(endpointNameWithQueryParam && endpointNameWithQueryParam.includes('?')) {
                    networkService.openURL(objCacheDetails.webserviceUrl + endpointNameWithQueryParam,
                        objLoginEndPoints.method,
                        null,
                        null,
                        objData).then(function (objResponse) {
                        objLoginEndPoints = null;
                        if (angular.isUndefinedOrNull(objResponse)) {
                            des.resolve(null);
                        } else {
                            if (!angular.isUndefinedOrNull(objResponse.data) &&
                                (objResponse.data.hasOwnProperty('Message') &&
                                    objResponse.data.Message === 'Login First')) {
                            } else {
                                des.resolve(objResponse.data);
                            }
                        }
                    });
                } else {
                    networkService.openURL(objCacheDetails.webserviceUrl + objLoginEndPoints.name, objLoginEndPoints.method,
                        null, null, objData).then(function (objResponse) {
                        objLoginEndPoints = null;
                        if (angular.isUndefinedOrNull(objResponse)) {
                            des.resolve(null);
                        } else {
                            des.resolve(objResponse.data);
                        }
                    });
                }
            } else {
                des.resolve(false);
            }
        };
        _this.populateData = function (arrInputData, arrDataKey, inputIndex) {
            inputIndex = angular.isUndefined(inputIndex) ? 0 : inputIndex;
            if (arrDataKey instanceof Object) {
                _this.getPopulatedObjectData(arrInputData, arrDataKey, inputIndex);
            } else if (arrDataKey instanceof Array) {
                for (var i = 0; i < arrDataKey.length; i++) {
                    if (arrDataKey[i] instanceof Object) {
                        _this.getPopulatedObjectData(arrInputData, arrDataKey[i], inputIndex)
                    } else {
                        arrDataKey[i] = arrInputData[inputIndex++];
                    }
                }
            }
            return arrDataKey;
        }

        _this.getPopulatedObjectData = function (arrInputData, arrDataKey, inputIndex) {
            inputIndex = angular.isUndefined(inputIndex) ? 0 : inputIndex;
            if (arrDataKey instanceof Object) {
                for (var key in arrDataKey) {
                    if (arrDataKey[key] instanceof Array) {
                        _this.getPopulatedObjectData(arrInputData, arrDataKey[key], inputIndex);
                    } else if (arrDataKey[key] instanceof Object) {
                        _this.getPopulatedObjectData(arrInputData, arrDataKey[key], inputIndex);
                    } else {
                        arrDataKey[key] = arrInputData[inputIndex++];
                    }
                }
            }
            return arrDataKey;
        }
    }]);
