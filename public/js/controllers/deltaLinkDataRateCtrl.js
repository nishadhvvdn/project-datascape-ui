/**
 * @this vm
 * @ngdoc controller
 * @name dataSCAPEApp.controller:deltaLinkDataRateCtrl
 *
 * @description
 * displaying the data rate of the selected delta Link devices.
 */
(function (angular) {
    "use strict";
    angular.module('dataSCAPEApp').controller('deltaLinkDataRateCtrl',
        ['$scope', '$rootScope', 'DeviceService', function ($scope, $rootScope, deviceService) {

            $rootScope.isValidHostIframe = false;
            deviceService.inIframeAccess().then(function (resObj) {
                if (!resObj) {
                    location.href = '/#/inValidPage';
                }
            });

            $scope.deviceTypes = deviceService.getDeviceTypePages;
            $scope.selectedDeviceType = $scope.deviceTypes[2];

            $scope.changeDeviceType = function () {
                deviceService.changeReportsRoutes($scope.selectedDeviceType);
            }

            $scope.uploadRate = "--";
            $scope.downloadRate = "--";
            $scope.latency = "--";


            init();

            function init() {
                $scope.circuitList = [];
                deviceService.getAllCircuitDetails()
                    .then(function (dtcData) {
                        if (!angular.isUndefinedOrNull(dtcData) && dtcData.type) {
                            if (dtcData.CircuitDetails.length > 0) {
                                $scope.circuitList = dtcData.CircuitDetails;
                                $scope.selectedCircutID = $scope.circuitList[0];
                                $scope.changeCircuitID();
                            } else {
                                $scope.circuitList = [];
                            }
                        }
                    });
            }

            $scope.changeCircuitID = function () {
                $scope.transformerList = [];
                $scope.meterList = [];
                $scope.deltaLinkList = [];
                deviceService.getAllTransformerDetailsForDeviceDataRate("getTransformersByDTCID?CircuitID=" + $scope.selectedCircutID.DTC + "&IsHyperHub=false")
                    .then(function (tfmrData) {
                        if (!angular.isUndefinedOrNull(tfmrData) && tfmrData.type) {
                            if (tfmrData.TransformerDetails.length > 0) {
                                $scope.transformerList = tfmrData.TransformerDetails;
                                $scope.selectedTransformerID = $scope.transformerList[0];
                                $scope.changeMeterID();
                            } else {
                                $scope.transformerList = [];
                            }
                        }
                    });
            };

            $scope.changeMeterID = function () {
                $scope.meterList = [];
                $scope.deltaLinkList = [];
                if($scope.transformerList.length) {
                    deviceService.getAllMeterIDs($scope.selectedTransformerID.TransformerID)
                        .then(function (meterData) {
                            if (!angular.isUndefinedOrNull(meterData) && meterData.type) {
                                if (meterData.MeterDetails.length > 0) {
                                    $scope.meterList = meterData.MeterDetails;
                                    $scope.selectedMeterID = $scope.meterList[0];
                                    $scope.changeDeltaID();
                                } else {
                                    $scope.meterList = [];
                                }
                            }
                        });
                }
            };

            $scope.changeDeltaID = function () {
                $scope.deltaLinkList = [];
                deviceService.getDeltaLinkIDs($scope.selectedMeterID.MeterID)
                    .then(function (deltaData) {
                        if (!angular.isUndefinedOrNull(deltaData) && deltaData.type) {
                            if (deltaData.DeltalinkDetails.length > 0) {
                                $scope.deltaLinkList = deltaData.DeltalinkDetails;
                                $scope.selectedDeltaLinkID = $scope.deltaLinkList[0];
                            } else {
                                $scope.deltaLinkList = [];
                            }
                        }
                    });
            };

            $scope.fetchDataRate = function () {
                $scope.uploadRate = '--';
                $scope.downloadRate = '--';
                $scope.latency = '--';

                deviceService.getDeviceDataRate("DeltaLink", $scope.selectedDeltaLinkID.DeltalinkID).then(function (apiData) {
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
