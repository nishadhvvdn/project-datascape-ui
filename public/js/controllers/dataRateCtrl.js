/**
 * @this vm
 * @ngdoc controller
 * @name dataSCAPEApp.controller:phaserGraphsCtrl
 *
 * @description
 * displaying the data rate of the selected devices.
 */
(function (angular) {
    "use strict";
    angular.module('dataSCAPEApp').controller('dataRateCtrl',
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
            $scope.selectedDeviceType = 'Transformer';

            $scope.changeDeviceType = function () {
                deviceService.changeReportsRoutes($scope.selectedDeviceType);
            }

            init();
            function init() {
                deviceService.getAllCircuitDetails()
                    .then(function (apiData) {
                        if (!angular.isUndefinedOrNull(apiData) && apiData.type) {
                            $scope.circuitList = [];
                            if (apiData.CircuitDetails.length > 0) {
                                $scope.circuitList = apiData.CircuitDetails;
                                $scope.selectedCircutID = $scope.circuitList[0];
                                $scope.changeCircuitID();
                            } else {
                                $scope.transformerList = [];
                            }
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
                            }
                        }
                    });
            };

            let deviceType = "";
            let deviceID = "";
            $scope.fetchDataRate = function () {
                $scope.uploadRate = '--';
                $scope.downloadRate = '--';
                $scope.latency = '--';

                deviceType = $scope.selectedTransformerID.IsHyperHub === true ? "HyperHub" : "HyperSprout";
                deviceID = $scope.selectedTransformerID.HypersproutID;
                deviceService.getDeviceDataRate(deviceType, deviceID).then(function (apiData) {
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
