/**
 * @this vm
 * @ngdoc controller
 * @name dataSCAPEApp.controller:solarPanelReportCtrl
 *
 * @description
 * it handles the battery Life Report
 */
angular.module('dataSCAPEApp').controller('solarPanelReportCtrl',
    ["$scope", "$uibModal", "$rootScope", "$state", '$filter', '$timeout', 'DeviceService', 'refreshservice', 'optionDataService', '$templateCache',
        function ($scope, $uibModal, $rootScope, $state, $filter, $timeout, deviceService, refreshservice, optionDataService, $templateCache) {
            $rootScope.isValidHostIframe = false;
            deviceService.inIframeAccess().then(function (resObj) {
                if (!resObj) {
                    location.href = '/#/inValidPage';
                }
            });

            $scope.showDateFilter = true;
            $scope.reports = deviceService.getReportsName;
            $scope.selectedReport = $scope.reports[4];
            $scope.solarReport = true;
            /**
             * @description
             * updating the view based on selected item from list
             *
             * @param  Nil
             * @return  Nil
             */

            let currentDefaultTablePageSize = optionDataService.optionsData().paginationPageSize;
            $scope.isSelected = false;
            $scope.mySelectedRows = [];
            let solarReportData = [];

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
                $scope.solarOptions = optionDataService.optionsData();
                $scope.solarOptions.data = [];
                $scope.solarOptions.exporterPdfOrientation = 'landscape';
                $scope.solarOptions.exporterPdfMaxGridWidth = 640;
                $scope.solarOptions.exporterCsvFilename = 'file.csv';
                $scope.solarOptions.columnDefs = [
                    { field: 'Serial', displayName: 'Serial Number', enableHiding: false, visible: true, width: '20%' },
                    { field: 'Avg24hReturn', displayName: 'Avg. 24h Return(KW)', enableHiding: false, visible: true, width: '20%' },
                    { field: 'Total24hReturn', displayName: 'Total 24h Return(KW)', enableHiding: false, visible: true, width: '20%' },
                    { field: 'Avg30DayReturn', displayName: 'Avg 30 Day Return(KW)', enableHiding: false, visible: true, width: '20%' },
                    { field: 'Total30DayReturn', displayName: 'Total 30 Day Return(KW)', enableHiding: false, visible: true, width: '20%' }
                ];
                $scope.solarOptions.onRegisterApi = function (gridApi) {
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
                $scope.searchTerm = '';
                $scope.initTable($scope.pagination.apiCurrentPage, currentDefaultTablePageSize);
                $scope.solarReport = false;
            }

            function initList(pageNum, limit) {
                solarReportData.length = 0;
                $scope.commonMsg = "Loading..";
                deviceService.SolarPanelReturn($scope.searchTerm, pageNum, limit)
                    .then(function (apiData) {
                        if (!angular.isUndefinedOrNull(apiData) && apiData.type) {
                            solarReportData.length = 0;
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
                                objToInsert["Serial"] = apiData[i].meterId;
                                objToInsert["Avg24hReturn"] = (apiData[i].avg24hours !== null && apiData[i].avg24hours !== "NA") ? apiData[i].avg24hours.toFixed(5):'-';
                                objToInsert["Total24hReturn"] = (apiData[i].total24hours !== null && apiData[i].total24hours !== "NA") ? apiData[i].total24hours.toFixed(5):'-';
                                objToInsert["Avg30DayReturn"] = (apiData[i].avg30DaysData !== null && apiData[i].avg30DaysData !== "NA") ? apiData[i].avg30DaysData.toFixed(5):'-';
                                objToInsert["Total30DayReturn"] = (apiData[i].total30daysData !== null && apiData[i].total30daysData !== "NA") ? apiData[i].total30daysData.toFixed(5):'-';
                                solarReportData.push(objToInsert);
                            }
                            $scope.solarOptions.data = solarReportData;
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

            $scope.searchSolarReport = function (searchTerm) {
                if (searchTerm) {
                    $scope.searchTerm = searchTerm;
                    $scope.pagination.currentTablePage = 1;
                    initList($scope.pagination.currentTablePage, $scope.pagination.currentTablePaginationSize);
                }
                angular.element(document.querySelector("div.ui-grid-selection-row-header-buttons")).removeClass("ui-grid-all-selected");
                $scope.mySelectedRows.length = 0;
            };

            $scope.searchButtonClear =  function (searchTerm) {
                if(searchTerm === "") {
                    $scope.searchTerm = '';
                    $scope.pagination.currentTablePage = 1;
                    initList($scope.pagination.currentTablePage, $scope.pagination.currentTablePaginationSize);
                }
            }

            $scope.changeReportType = function () {
                deviceService.changeReportsRoutes($scope.selectedReport.name);
            };

            $scope.$on('$destroy', function () {
                $templateCache.put('ui-grid/pagination', deviceService.setDefaultTable());
            });

        }]);