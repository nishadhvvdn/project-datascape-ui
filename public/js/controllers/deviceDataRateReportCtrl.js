/**
 * @this vm
 * @ngdoc controller
 * @name dataSCAPEApp.controller:deviceDataRateReportCtrl
 *
 * @description
 * it handles the data rate Report
 */
angular.module('dataSCAPEApp').controller('deviceDataRateReportCtrl',
    ["$scope", "$uibModal", "$rootScope", "$state", '$filter', '$timeout', 'DeviceService', 'refreshservice', 'optionDataService', '$templateCache',
        function ($scope, $uibModal, $rootScope, $state, $filter, $timeout, deviceService, refreshservice, optionDataService, $templateCache) {
            $rootScope.isValidHostIframe = false;
            deviceService.inIframeAccess().then(function (resObj) {
                if (!resObj) {
                    location.href = '/#/inValidPage';
                }
            });

            $scope.showDateFilter = true;
            //code for Datetime Picker starts
            $scope.endDateBeforeRender = endDateBeforeRender
            $scope.endDateOnSetTime = endDateOnSetTime
            $scope.startDateBeforeRender = startDateBeforeRender
            $scope.startDateOnSetTime = startDateOnSetTime

            function startDateOnSetTime() {
                $scope.$broadcast('start-date-changed');
            }

            function endDateOnSetTime() {
                $scope.$broadcast('end-date-changed');
            }

            function startDateBeforeRender($dates) {
                if ($scope.dateRangeEnd) {
                    var activeDate = moment($scope.dateRangeEnd);
                    $dates.filter(function (date) {
                        return date.localDateValue() >= activeDate.valueOf()
                    }).forEach(function (date) {
                        date.selectable = false;
                    })
                }
            }

            function endDateBeforeRender($view, $dates) {
                if ($scope.dateRangeStart) {
                    var activeDate = moment($scope.dateRangeStart).subtract(1, $view).add(1, 'minute');
                    $dates.filter(function (date) {
                        return date.localDateValue() <= activeDate.valueOf()
                    }).forEach(function (date) {
                        date.selectable = false;
                    })
                }
            }

            $scope.reports = deviceService.getReportsName;
            $scope.selectedReport = $scope.reports[7];
            $scope.dataRateReport = true;
            $scope.selectedDeviceType = "HyperSprout";

            let currentDefaultTablePageSize = optionDataService.optionsData().paginationPageSize;
            $scope.isSelected = false;
            $scope.mySelectedRows = [];
            let dataRateResponseData = [];

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
            //visible: false
            $scope.initTable = function (pageNum) {
                $scope.dataRateOption = optionDataService.optionsData();
                $scope.dataRateOption.data = [];
                $scope.dataRateOption.exporterPdfOrientation = 'landscape';
                $scope.dataRateOption.exporterPdfMaxGridWidth = 640;
                $scope.dataRateOption.exporterCsvFilename = 'file.csv';
                $scope.dataRateOption.columnDefs = [
                    { field: 'Circuit_ID', displayName: 'DTC ID', enableHiding: true , visible: true, width: 100 },
                    { field: 'Transformer_SerialNumber', displayName: 'Transformer ID', visible: true, enableHiding: true },
                    { field: 'Hypersprout_SerialNumber', displayName: 'HS/HH ID', enableHiding: false, visible: true},
                    { field: 'Meter_SerialNumber', displayName: 'Meter ID', enableHiding: false,  visible: true },
                    { field: 'Deltalink_SerialNumber', displayName: 'DeltaLINK\u2122 ID', enableHiding: false,  visible: true },
                    { field: 'Download_Rate', displayName: 'Download Rate(Mbps)', enableHiding: false },
                    { field: 'Upload_Rate', displayName: 'Upload Rate(Mbps)', enableHiding: false },
                    { field: 'Latency', displayName: 'Latency(Ms)', enableHiding: false },
                    { field: 'DBTimestamp', displayName: 'Timestamp', enableHiding: false }
                ];
                $scope.dataRateOption.onRegisterApi = function (gridApi) {
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
                $scope.dataRateReport = false;
            }

            function initList(pageNum, limit) {
                if($scope.selectedDeviceType === "HyperSprout") {
                    $scope.dataRateOption.columnDefs[3].visible = false;
                    $scope.dataRateOption.columnDefs[4].visible = false;
                } else if($scope.selectedDeviceType === "Meter") {
                    $scope.dataRateOption.columnDefs[2].visible = false;
                    $scope.dataRateOption.columnDefs[4].visible = false;
                } else if($scope.selectedDeviceType === "DeltaLink") {
                    $scope.dataRateOption.columnDefs[2].visible = false;
                }
                dataRateResponseData.length = 0;
                let startDate = moment($scope.dateRangeStart).format('YYYY-MM-DDTHH:mm:ss') + 'Z';
                let endDate = moment($scope.dateRangeEnd).format('YYYY-MM-DDTHH:mm:ss') + 'Z';
                $scope.commonMsg = "Loading..";
                deviceService.DataRateReport($scope.selectedDeviceType ,$scope.searchTerm, pageNum, limit, startDate, endDate)
                    .then(function (apiData) {
                        if (!angular.isUndefinedOrNull(apiData) && apiData.type) {
                            dataRateResponseData.length = 0;
                            $scope.pagination.currentTotalItems = apiData.CircuitDetails.results.length;
                            $scope.pagination.apiCurrentPage = pageNum;
                            $scope.pagination.totalRecordsInDBCount = apiData.CircuitDetails.totalRecords;
                            $scope.pagination.totalTablePages = Math.ceil($scope.pagination.totalRecordsInDBCount / $scope.pagination.currentTablePaginationSize);
                            let btnFlags = deviceService.getBtnStatus($scope.pagination.currentTablePage, $scope.pagination.totalTablePages);
                            $scope.disableNxtBtn = btnFlags.disableNxtBtn;
                            $scope.disablePrvBtn = btnFlags.disablePrvBtn;
                            $scope.disableFirstBtn = btnFlags.disableFirstBtn;
                            $scope.disableLastBtn = btnFlags.disableLastBtn;

                            apiData = apiData.CircuitDetails.results;
                            $scope.commonMsg = "";
                            for (let i = 0; i < apiData.length; i++) {
                                let objToInsert = {};
                                objToInsert["Circuit_ID"] = apiData[i].Circuit_ID ? apiData[i].Circuit_ID : '-';
                                objToInsert["Transformer_SerialNumber"] = apiData[i].Transformer_SerialNumber ? apiData[i].Transformer_SerialNumber : '-';
                                objToInsert["Hypersprout_SerialNumber"] = apiData[i].Hypersprout_SerialNumber ? apiData[i].Hypersprout_SerialNumber : '-' ;
                                objToInsert["Meter_SerialNumber"] = apiData[i].Meter_SerialNumber ? apiData[i].Meter_SerialNumber : '-';
                                objToInsert["Deltalink_SerialNumber"] = apiData[i].Deltalink_SerialNumber ? apiData[i].Deltalink_SerialNumber : '-';
                                objToInsert["Download_Rate"] = apiData[i].Download_Rate ? apiData[i].Download_Rate : '-';
                                objToInsert["Upload_Rate"] = apiData[i].Upload_Rate ? apiData[i].Upload_Rate : '-';
                                objToInsert["Latency"] = apiData[i].Latency ? apiData[i].Latency : '-';
                                objToInsert["DBTimestamp"] = apiData[i].DBTimestamp ? apiData[i].DBTimestamp : '-';
                                dataRateResponseData.push(objToInsert);
                            }
                            $scope.dataRateOption.data = dataRateResponseData;
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

            $scope.searchButtonClear =  function (searchTerm) {
                if(searchTerm === "") {
                    $scope.searchTerm = "";
                    $scope.pagination.currentTablePage = 1;
                    initList($scope.pagination.currentTablePage, $scope.pagination.currentTablePaginationSize);
                }
            }

            $scope.searchDataRate = function (searchTerm) {
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


            $scope.changeReportType = function () {
                deviceService.changeReportsRoutes($scope.selectedReport.name);
            };

            $scope.$on('$destroy', function () {
                $templateCache.put('ui-grid/pagination', deviceService.setDefaultTable());
            });
        }]);