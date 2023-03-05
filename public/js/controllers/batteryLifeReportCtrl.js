/**
 * @this vm
 * @ngdoc controller
 * @name dataSCAPEApp.controller:batteryLifeReportCtrl
 *
 * @description
 * it handles the battery Life Report
 */
angular.module('dataSCAPEApp').controller('batteryLifeReportCtrl',
    ["$scope", "$uibModal", "$rootScope", "$state", '$timeout', 'DeviceService', 'optionDataService', '$templateCache',
        function ($scope, $uibModal, $rootScope, $state, $timeout, deviceService, optionDataService, $templateCache) {
            $rootScope.isValidHostIframe = false;
            var isInIframe = deviceService.inIframeAccess();
            if (!isInIframe) {
                location.href = '/#/inValidPage';
            }

            $scope.showDateFilter = true;
            $scope.reports = deviceService.getReportsName;
            $scope.selectedReport = $scope.reports[5];
            $scope.BatteryReport = true;

            let currentDefaultTablePageSize = optionDataService.optionsData().paginationPageSize;
            $scope.isSelected = false;
            $scope.mySelectedRows = [];
            let batteryResponseData = [];

            $scope.pagination = {
                totalRecordsInDBCount: 0,
                currentTotalItems: 0,
                apiCurrentPage: 1,
                apiNextPage: 0,
                currentTablePage: 1,
                currentTablePaginationSize: optionDataService.optionsData().paginationPageSize,
                totalTablePages: 1
            }
            $scope.disableNxtBtn = true;
            $scope.disablePrvBtn = true;
            $scope.disableFirstBtn = true;
            $scope.disableLastBtn = true;
            $scope.searchTerm = '';
            $scope.commonMsg = "Loading.."

            $scope.initTable = function (pageNum) {
                $scope.batteryOptions = optionDataService.optionsData();
                $scope.batteryOptions.data = [];
                $scope.batteryOptions.exporterPdfOrientation = 'landscape';
                $scope.batteryOptions.exporterPdfMaxGridWidth = 640;
                $scope.batteryOptions.exporterCsvFilename = 'file.csv';
                $scope.batteryOptions.columnDefs = [
                    {field: 'SerialNumber', displayName: 'HyperSPROUT\u2122 Serial Number', enableHiding: false, width: '25%' },
                    {field: 'BatteryVoltage', displayName: 'Battery Voltage', enableHiding: false, width: '25%' },
                    {field: 'MinutesOnBattery', displayName: 'Time Used On Battery (min)', enableHiding: false, width: '25%' },
                    {field: 'BackupTime', displayName: 'Time Left On Battery (min)', enableHiding: false, width: '25%' }
                ];
                $scope.batteryOptions.onRegisterApi = function (gridApi) {
                    $scope.gridApi = gridApi;
                    deviceService.getGridApi($scope, gridApi);
                    gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                        $scope.pagination.currentTablePaginationSize = pageSize;
                        $scope.pagination.totalTablePages = Math.ceil($scope.pagination.currentTotalItems / pageSize);
                        pageNum = 1;
                        $scope.pagination.currentTablePage = 1;
                        initList(pageNum, $scope.pagination.currentTablePaginationSize);
                    });
                };
                initList(pageNum, $scope.pagination.currentTablePaginationSize);

                $templateCache.put('ui-grid/pagination', deviceService.getModifiedTable());
            }

            $scope.initTable($scope.pagination.apiCurrentPage, currentDefaultTablePageSize);


            $scope.update = function () {
                $scope.initTable($scope.pagination.apiCurrentPage, currentDefaultTablePageSize);
                $scope.BatteryReport = false;
            }

            function initList(pageNum, limit) {
                batteryResponseData.length = 0;
                $scope.commonMsg = "Loading..";
                deviceService.BatteryLifeReport($scope.searchTerm, pageNum, limit)
                    .then(function (apiData) {
                        if (!angular.isUndefinedOrNull(apiData) && apiData.type) {
                            batteryResponseData.length = 0;
                            $scope.pagination.currentTotalItems = apiData.Details.results.length;
                            $scope.pagination.apiCurrentPage = pageNum;
                            $scope.pagination.totalRecordsInDBCount = apiData.Details.totalRecords;
                            $scope.pagination.totalTablePages = Math.ceil($scope.pagination.totalRecordsInDBCount / $scope.pagination.currentTablePaginationSize);
                            let btnFlags = deviceService.getBtnStatus($scope.pagination.currentTablePage, $scope.pagination.totalTablePages);
                            $scope.disableNxtBtn = btnFlags.disableNxtBtn;
                            $scope.disablePrvBtn = btnFlags.disablePrvBtn;
                            $scope.disableFirstBtn = btnFlags.disableFirstBtn;
                            $scope.disableLastBtn = btnFlags.disableLastBtn;

                            apiData = apiData.Details.results;
                            $scope.commonMsg = "";
                            for (let i = 0; i < apiData.length; i++) {
                                let objToInsert = {};
                                objToInsert["SerialNumber"] = apiData[i].HypersproutSerialNumber;
                                objToInsert["BatteryVoltage"] = apiData[i].BatteryVoltage;
                                objToInsert["MinutesOnBattery"] = apiData[i].minsOnBattery;
                                objToInsert["BackupTime"] = apiData[i].BackupTime;
                                batteryResponseData.push(objToInsert);
                            }
                            $scope.batteryOptions.data = batteryResponseData;
                            for (var j = 0; j < $scope.batteryOptions.data.length; j++) {
                                var roundoff = null;
                                roundoff = (Number($scope.batteryOptions.data[j].MinutesOnBattery).toFixed(2));
                                $scope.batteryOptions.data[j].MinutesOnBattery = roundoff;
                            }
                            for (var k = 0; k < $scope.batteryOptions.data.length; k++) {
                                var updateReading = null;
                                updateReading = (($scope.batteryOptions.data[k].ReadPercentage) * 100);
                                var roundoffValue = null;
                                roundoffValue = (updateReading).toFixed(2);
                                $scope.batteryOptions.data[k].ReadPercentage = roundoffValue;
                            }
                        } else if (apiData.type == false) {
                            $scope.disableNxtBtn = true;
                            $scope.disablePrvBtn = true;
                            $scope.disableFirstBtn = true;
                            $scope.disableLastBtn = true;
                            $scope.pagination.totalRecordsInDBCount = 0;
                            $scope.commonMsg = "No data found!";
                        } else {
                            $scope.commonMsg = "";
                        }
                    });
            }

            $scope.nxtPageBtnClick = function () {
                if ($scope.pagination.currentTablePage < $scope.pagination.totalTablePages && $scope.pagination.totalTablePages > 0) {
                    let nextAPIPage = ++$scope.pagination.currentTablePage;
                    $scope.disablePrvBtn = false;
                    $scope.initTable(nextAPIPage, $scope.pagination.currentTablePaginationSize);
                } else {
                    $scope.disableNxtBtn = true;
                    $scope.disablePrvBtn = false;
                    $scope.disableLastBtn = true;
                }
            }

            $scope.prvPageBtnClick = function () {
                if ($scope.pagination.currentTablePage > 1 && $scope.pagination.currentTablePage <= $scope.pagination.totalTablePages) {
                    let prevAPIPage = --$scope.pagination.currentTablePage;
                    $scope.disableNxtBtn = false;
                    $scope.initTable(prevAPIPage, $scope.pagination.currentTablePaginationSize);
                } else {
                    {
                        $scope.disablePrvBtn = true;
                        $scope.disableNxtBtn = false;
                        $scope.disableFirstBtn = true;
                    }
                }

            }

            $scope.firstPageBtnClick = function () {
                if ($scope.pagination.currentTablePage > 1 && $scope.pagination.currentTablePage <= $scope.pagination.totalTablePages) {
                    $scope.pagination.currentTablePage = 1;
                    let firstPage = 1;
                    $scope.disableNxtBtn = false;
                    $scope.disableFirstBtn = true;
                    $scope.initTable(firstPage, $scope.pagination.currentTablePaginationSize);
                } else {
                    {
                        $scope.disablePrvBtn = true;
                        $scope.disableNxtBtn = false;
                    }
                }
            }

            $scope.lastPageBtnClick = function () {
                if ($scope.pagination.currentTablePage >= 1 && $scope.pagination.currentTablePage <= $scope.pagination.totalTablePages) {
                    $scope.pagination.currentTablePage = $scope.pagination.totalTablePages;
                    let lastPage = $scope.pagination.totalTablePages;
                    $scope.disableNxtBtn = false;
                    $scope.disableLastBtnBtn = true;
                    $scope.initTable(lastPage, $scope.pagination.currentTablePaginationSize);
                } else {
                    {
                        $scope.disablePrvBtn = true;
                        $scope.disableNxtBtn = false;
                    }
                }
            }

            $scope.paginationBoxChanges = function () {
                if($scope.pagination.currentTablePage) {
                    $scope.initTable($scope.pagination.currentTablePage, $scope.pagination.currentTablePaginationSize);
                } else {
                    $scope.pagination.currentTablePage = 1;
                    $scope.initTable($scope.pagination.currentTablePage, $scope.pagination.currentTablePaginationSize);
                }
            }

            $scope.searchTechnicalLossGrid = function (searchTerm) {
                if (searchTerm) {
                    $scope.searchTerm = searchTerm;
                    $scope.pagination.currentTablePage = 1;
                    initList($scope.pagination.currentTablePage, $scope.pagination.currentTablePaginationSize);
                } else {
                    $scope.searchTerm = '';
                    initList($scope.pagination.currentTablePage, $scope.pagination.currentTablePaginationSize);
                }
                angular.element(document.querySelector("div.ui-grid-selection-row-header-buttons")).removeClass("ui-grid-all-selected");
                $scope.mySelectedRows.length = 0;
            };

            $scope.changeReportType = function () {
                deviceService.changeReportsRoutes($scope.selectedReport.name);
            };

            $scope.$on('$destroy', function () {
                $templateCache.put('ui-grid/pagination', deviceService.setDefaultTable());
            });


        }]);



