/**
 * @this vm
 * @ngdoc controller
 * @name dataSCAPEApp.controller:networkResponseReportCtrl
 *
 * @description
 * it handles the home page of report
 */
angular.module('dataSCAPEApp').controller('networkResponseReportCtrl',
    ["$scope", "$uibModal", "$rootScope", "$state", '$filter', '$timeout', 'DeviceService', 'refreshservice', 'optionDataService','$templateCache',
        function ($scope, $uibModal, $rootScope, $state, $filter, $timeout, deviceService, refreshservice, optionDataService, $templateCache) {
            $rootScope.isValidHostIframe = false;
            var isInIframe = deviceService.inIframeAccess();
            if (!isInIframe) {
                location.href = '/#/inValidPage';
            }

            //code for Datetime Picker starts
            $scope.endDateBeforeRender = endDateBeforeRender
            $scope.endDateOnSetTime = endDateOnSetTime
            $scope.startDateBeforeRender = startDateBeforeRender
            $scope.startDateOnSetTime = startDateOnSetTime

            /**
             * @description
             * invokes on change of start Date
             *
             * @param  Nil
             * @return  Nil
             */
            function startDateOnSetTime() {
                $scope.$broadcast('start-date-changed');
            }
            /**
             * @description
             * invokes on change of end Date
             *
             * @param  Nil
             * @return  Nil
             */
            function endDateOnSetTime() {
                $scope.$broadcast('end-date-changed');
            }

            /**
             * @description
             * makes all the date field disable after the ending date
             *
             * @param  $dates - all the dates present in calendar
             * @return  Nil
             */
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
            /**
             * @description
             * makes all the date disable before the start date
             *
             * @param  $view
             * @param  $dates - all the dates present in calendar
             * @return  Nil
             */
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

            /**
             * @description
             * displaying all the list values
             *
             * @param  Nil
             * @return  Nil
             */
            $scope.reports = deviceService.getReportsName;
            $scope.selectedReport = $scope.reports[1];
            $scope.DataQuality = true;
            $scope.commonMsg = "Loading.."
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
            let networkResponseData = [];

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

            $scope.initTable = function (pageNum) {
                $scope.dataQualityOptions = optionDataService.optionsData();
                $scope.dataQualityOptions.data = [];
                $scope.dataQualityOptions.exporterPdfOrientation = 'landscape';
                $scope.dataQualityOptions.exporterPdfMaxGridWidth = 640;
                $scope.dataQualityOptions.exporterCsvFilename = 'file.csv';
                $scope.dataQualityOptions.columnDefs = [
                    { field: 'DTC', displayName: 'DTC ID', enableHiding: false, width: '25%' },
                    { field: 'startTime', displayName: 'Start Time', enableHiding: false, width: '25%' },
                    { field: 'endTime', displayName: 'End Time', enableHiding: false, width: '25%' },
                    { field: 'ReadPercentage', displayName: 'Read Percentage(%)', enableHiding: false, width: '25%' }
                ];
                $scope.dataQualityOptions.onRegisterApi = function (gridApi) {
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
                $scope.DataQuality = false;
            }

            function initList(pageNum, limit) {
                networkResponseData.length = 0;
                let startDate = deviceService.convertDateToUTC($scope.dateRangeStart);
                let endDate = deviceService.convertDateToUTC($scope.dateRangeEnd);
                $scope.commonMsg = "Loading..";
                deviceService.DataQualityReturns($scope.searchTerm, startDate, endDate, pageNum, limit)
                    .then(function (apiData) {
                        if (!angular.isUndefinedOrNull(apiData) && apiData.type) {
                            networkResponseData.length = 0;
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
                                objToInsert["DTC"] = apiData[i].CircuitID;
                                objToInsert["startTime"] = deviceService.convertDateToMST(apiData[i].StartDate);
                                objToInsert["endTime"] = deviceService.convertDateToMST(apiData[i].EndDate);
                                objToInsert["ReadPercentage"] = apiData[i].NetworkResponceRate;
                                networkResponseData.push(objToInsert);
                            }
                            $scope.dataQualityOptions.data = networkResponseData;
                            for (let j = 0; j < $scope.dataQualityOptions.data.length; j++) {
                                let updateReading = null;
                                updateReading = (($scope.dataQualityOptions.data[j].ReadPercentage) * 100);
                                let roundoff = null;
                                roundoff = (updateReading).toFixed(2);
                                $scope.dataQualityOptions.data[j].ReadPercentage = roundoff;
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

            $scope.searchNetworkResponseGrid = function (searchTerm) {
                if(searchTerm) {
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


