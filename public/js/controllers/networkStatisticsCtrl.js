/**
 * @this vm
 * @ngdoc controller
 * @name dataSCAPEApp.controller:networkStatistics
 *
 * @description
 * Display Network Statistics Report
 */
(function (angular) {

    "use strict";

    angular.module('dataSCAPEApp').controller('networkStatisticsCtrl',
        ['$scope', '$rootScope', '$state', '$uibModal', 'DeviceService', 'optionDataService', '$timeout',
            function ($scope, $rootScope, $state, $uibModal, deviceService, optionDataService, $timeout) {

                $rootScope.isValidHostIframe = false;
                deviceService.inIframeAccess().then(function (resObj) {
                    if (!resObj) {
                        location.href = '/#/inValidPage';
                    }
                });

                var vm = this;
                var transfomerData = [];

                $scope.reports = deviceService.getReportsName;
                $scope.selectedReport = $scope.reports[5];
                $scope.commonGridMsg = 'Loading..';

                let flag = window.sessionStorage.getItem('showHSGrid');
                $scope.hsNetworkStatReport = flag === 'true';
                /**
                 * @description
                 * getting JSON data for Network Statistics
                 *
                 * @param objData - JSON data for Network Statistics
                 * @return  Nil
                 */

                init();

                function init() {
                    deviceService.NetworkStatisticsMeter().then(function (objData) {
                        transfomerData = [];
                        if (!angular.isUndefined(objData) && !angular.isUndefined(objData.Details)) {
                            if (objData.Details.length > 0) {
                                for (var i = 0; i < objData.Details.length; i++) {
                                    var Details = objData.Details[i];
                                    var dataInsert = {};
                                    dataInsert["Status"] = Details.TransformerStatus;
                                    dataInsert["HypersproutSerialNumber"] = Details.HypersproutSerialNumber;
                                    dataInsert["TotalMeters"] = Details.NoOfMeter;
                                    dataInsert["ConnectedMeters"] = Details.NoOfConnectedMeter;
                                    dataInsert["Load"] = Details.HyperSproutLoad;
                                    dataInsert["HypersproutID"] = Details.HypersproutSerialNumber;
                                    transfomerData.push(dataInsert);
                                }
                                $scope.dataVINEHealthOptions.data = transfomerData;
                            } else {
                                $scope.commonGridMsg = 'No Data found!';
                            }
                        } else {
                            $scope.commonGridMsg = 'No Data found!';
                        }
                    });
                }

                $scope.dataVINEHealthOptions = optionDataService.optionsData();
                $scope.dataVINEHealthOptions.columnDefs = [
                    {
                        field: 'HypersproutSerialNumber',
                        displayName: 'HyperSPROUT\u2122 Serial Number',
                        enableHiding: false,
                        width: '20%'
                    },
                    {field: 'TotalMeters', enableHiding: false, width: '16%' },
                    {field: 'ConnectedMeters', enableHiding: false, width: '16%'},
                    {field: 'Load', displayName: 'Managerial Data Load(Bytes)', enableHiding: false, width: '16%'},
                    {field: 'Status', enableColumnMenu: false, enableHiding: false, width: '16%'},
                    {
                        field: 'Meters List',
                        enableColumnMenu: false,
                        cellTemplate: '<div class="ui-grid-cell-contents"><button type="button" class="btn btn-xs btn-primary cellBtn" ng-model="cellRelayDetails" ng-click="grid.appScope.vm.cellRelayDetails(row)"><i class="fa fa-list"></i></button></div>',
                        enableHiding: false,
                        enableSorting: false
                    }
                ];
                $scope.dataVINEHealthOptions['exporterSuppressColumns'] = ['Meters List', 'Server Info',];
                $scope.dataVINEHealthOptions.data = $scope.transfomerData;
                $scope.dataVINEHealthOptions.exporterPdfOrientation = 'landscape',
                    $scope.dataVINEHealthOptions.exporterPdfMaxGridWidth = 640;

                /**
                 * @description
                 * go to meter level of selected row
                 *
                 * @param  row - selected row
                 * @return  Nil
                 */
                vm.cellRelayDetails = function (row) {
                    objCacheDetails.data.selectedHypersprout = row.entity.HypersproutSerialNumber;
                    window.sessionStorage.setItem('selectedHypersprout', row.entity.HypersproutSerialNumber);
                    $state.go('cellRelays_networkStatistics');

                };

                $scope.changeReportType = function () {
                    deviceService.changeReportsRoutes($scope.selectedReport.name);
                    window.sessionStorage.setItem('showHSGrid', 'true');
                };

                $scope.goToNetworkStats = function (page) {
                    $state.go('cellRelays_networkStatistics');
                }

                $scope.createReport = function () {
                    $scope.hsNetworkStatReport = false;
                    window.sessionStorage.setItem('showHSGrid', 'false');
                    init();
                }

                /**
                 * @description
                 * print the page
                 *
                 * @param  Nil
                 * @return  Nil
                 */
                $scope.printCart = function () {
                    window.print();
                };
            }]);
})(window.angular);