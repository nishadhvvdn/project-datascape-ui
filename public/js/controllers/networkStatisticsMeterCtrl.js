/**
 * @this vm
 * @ngdoc controller
 * @name dataSCAPEApp.controller:networkStatisticsMeterCtrl
 *
 * @description
 * display network statistics meter data
 */
angular.module('dataSCAPEApp').controller('networkStatisticsMeterCtrl',
    ['$scope', '$rootScope', '$state', '$uibModal', 'DeviceService', 'optionDataService',
        '$filter', '$timeout',
        function ($scope, $rootScope, $state, $uibModal,
                  deviceService, optionDataService,
                  $filter, $timeout) {

            $rootScope.isValidHostIframe = false;
            deviceService.inIframeAccess().then(function (resObj) {
                if (!resObj) {
                    location.href = '/#/inValidPage';
                }
            });

            $scope.reports = deviceService.getReportsName;
            $scope.selectedReport = $scope.reports[8];
            $scope.status = 'Connected';
            $scope.showDateFilter = false;
            $scope.commonGridMsg = 'Loading..';

            var arrMeterData;
            var hypersprout;
            if (objCacheDetails.data) {
                    hypersprout = objCacheDetails.data.selectedHypersprout;
            } else {
                    hypersprout = window.sessionStorage.getItem('selectedHypersprout');
            }


            /**
             * @description
             * getting JSON data for network statistics meter and assigning value to table
             *
             * @param  objData - JSON data for network statistics meter
             * @return  Nil
             */
            $scope.changeReportType = function () {
                if ($scope.selectedReport.name !== "Network Statistics Report") {
                    deviceService.showHSNetworkStatisticsReport = true;
                }
                deviceService.changeReportsRoutes($scope.selectedReport.name);
            };

            deviceService.NetworkStatisticsMeter().then(function (objData) {
                arrMeterData = [];
                if (!angular.isUndefined(objData) && !angular.isUndefined(objData.Details)) {
                    for (var i = 0; i < objData.Details.length; i++) {
                        var Details = objData.Details[i];
                        if (Details.HypersproutSerialNumber === hypersprout) {
                            if (Details.MeterLoadDetail.length > 0) {
                                for (var j = 0; j < Details.MeterLoadDetail.length; j++) {
                                    var dataInsert = {};
                                    dataInsert["Serial Number"] = Details.MeterLoadDetail[j].MeterSerialNumber;
                                    dataInsert["MeterDeviceID"] = Details.MeterLoadDetail[j].MeterDeviceID;
                                    dataInsert["Load"] = Details.MeterLoadDetail[j].MeterLoad;
                                    dataInsert["Status"] = Details.MeterLoadDetail[j].MeterStatus;
                                    arrMeterData.push(dataInsert);
                                }
                            } else {
                                $scope.commonGridMsg = 'No Data found!';
                            }
                        } else {
                            $scope.commonGridMsg = 'No Data found!';
                        }
                    }
                    $scope.networkStatisticsMeterOptions.data = arrMeterData;
                } else {
                    $scope.commonGridMsg = 'No Data found!';
                }
            });
            $scope.networkStatisticsMeterOptions = optionDataService.optionsData();
            $scope.networkStatisticsMeterOptions.columnDefs = [
                {field: 'Serial Number', enableHiding: false, width: '25%' },
                {field: 'MeterDeviceID', enableHiding: false, width: '25%' },
                {field: 'Load', displayName: 'Managerial Data Load(Bytes)', enableHiding: false, width: '25%' },
                {field: 'Status', enableColumnMenu: false, enableHiding: false, width: '25%' },
            ];
            $scope.networkStatisticsMeterOptions.data = $scope.arrMeterData;
            $scope.networkStatisticsMeterOptions['exporterSuppressColumns'] = ['Detail View', 'Meter Info'];
            $scope.networkStatisticsMeterOptions['width'] = '*';
            $scope.networkStatisticsMeterOptions.exporterPdfOrientation = 'landscape';
            $scope.networkStatisticsMeterOptions.exporterPdfMaxGridWidth = 640;

            /**
             * @description
             * Filtering meter data based on selected status
             *
             * @param  status - selected status of meter (connected, disconnected or CommonFault)
             * @return  Nil
             */
            $scope.filterDeviceStatus = function (status) {
                var filterByStatus = {'Status': status};
                $scope.networkStatisticsMeterOptions.data = $filter('filter')(arrMeterData, filterByStatus, undefined);
            };

            $scope.goToNetworkStats = function (page) {
                $state.go('servers_networkStatistics');
                window.sessionStorage.setItem('showHSGrid', 'false');
                window.sessionStorage.removeItem('selectedHypersprout');
            }
        }]);