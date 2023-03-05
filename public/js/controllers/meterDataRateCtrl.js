/**
 * @this vm
 * @ngdoc controller
 * @name dataSCAPEApp.controller:meterDataRateCtrl
 *
 * @description
 * displaying the data rate of the selected meter devices.
 */
(function (angular) {
    "use strict";
    angular.module('dataSCAPEApp').controller('meterDataRateCtrl',
        ['$scope', '$rootScope', 'DeviceService', '$timeout', function ($scope, $rootScope, deviceService, $timeout) {

            $rootScope.isValidHostIframe = false;
            deviceService.inIframeAccess().then(function (resObj) {
                if (!resObj) {
                    location.href = '/#/inValidPage';
                }
            });
            $scope.uploadRate = "--";
            $scope.downloadRate = "--";
            $scope.latency = "--";

            $scope.deviceTypes = deviceService.getDeviceTypePages;
            $scope.selectedDeviceType = $scope.deviceTypes[1];

            $scope.changeDeviceType = function () {
                deviceService.changeReportsRoutes($scope.selectedDeviceType);
            }


            init();

            function init() {
                $scope.circuitList = [];
                deviceService.getAllCircuitDetails()
                    .then(function (apiData) {
                        if (!angular.isUndefinedOrNull(apiData) && apiData.type) {
                            if (apiData.CircuitDetails.length > 0) {
                                $scope.circuitList = apiData.CircuitDetails;
                                $scope.selectedCircutID = $scope.circuitList[0];
                                $scope.changeCircuitID();
                            } else {
                                $scope.circuitList = [];
                            }
                        } else {
                            $scope.circuitList = [];
                        }
                    });
            }

            $scope.changeCircuitID = function () {
                    $scope.transformerList = [];
                deviceService.getAllTransformerDetailsForDeviceDataRate("getTransformersByDTCID?CircuitID=" + $scope.selectedCircutID.DTC + "&IsHyperHub=false")
                    .then(function (apiData) {
                        if (!angular.isUndefinedOrNull(apiData) && apiData.type) {
                            if (apiData.TransformerDetails.length > 0) {
                                $scope.transformerList = apiData.TransformerDetails;
                                $scope.selectedTransformerID = $scope.transformerList[0];
                                $scope.changeMeterID();
                            } else {
                                $scope.transformerList = [];
                            }
                        }  else {
                            $scope.transformerList = [];
                        }
                    });
            };

            $scope.changeMeterID = function () {
                $scope.meterList = [];
                if($scope.transformerList.length) {
                    deviceService.getAllMeterIDs($scope.selectedTransformerID.TransformerID)
                        .then(function (apiData) {
                            if (!angular.isUndefinedOrNull(apiData) && apiData.type) {
                                if (apiData.MeterDetails.length > 0) {
                                    apiData.MeterDetails.forEach(meter => {
                                        meter.MeterID = parseInt(meter.MeterID)
                                    })
                                    $scope.meterList = apiData.MeterDetails;
                                    // console.log($scope.meterList);
                                    $scope.selectedMeterID = $scope.meterList[0];
                                } else {
                                    $scope.meterList = [];
                                }
                            }  else {
                                $scope.meterList = [];
                            }
                        });
                }
            };

            $scope.fetchDataRate = function () {
                $scope.uploadRate = '--';
                $scope.downloadRate = '--';
                $scope.latency = '--';

                deviceService.getDeviceDataRate("Meter", $scope.selectedMeterID.MeterID).then(function (apiData) {
                    if (!angular.isUndefinedOrNull(apiData) && apiData.type) {
                        apiData = apiData.DataRate;
                        $scope.validData = true;
                        $scope.uploadRate = apiData.UploadRate;
                        $scope.downloadRate = apiData.DownloadRate;
                        $scope.latency = apiData.Latency;

                    } else {
                        swal(apiData.Message);
                        $scope.uploadRate = '--';
                        $scope.downloadRate = '--';
                        $scope.latency = '--';
                    }
                });
            }
        }]);
})(window.angular);
