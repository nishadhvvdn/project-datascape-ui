/**
  * @this vm
  * @ngdoc controller
  * @name dataSCAPEApp.controller:billingReportCtrl
  *
  * @description
  * displaying the content of billing Report based on selected date
*/
(function (angular) {
    "use strict";
    angular.module('dataSCAPEApp').controller('billingReportCtrl',
        ['$scope', '$rootScope', '$uibModal',
            '$filter', 'DeviceService', 'refreshservice', 'optionDataService', '$templateCache',
            function ($scope, $rootScope, $uibModal, $filter, deviceService, refreshservice, optionDataService, $templateCache) {
                var vm = this;
                var _this = this;
                var modalInstance = null;

                $rootScope.isValidHostIframe = false;
                deviceService.inIframeAccess().then(function (resObj) {
                    if (!resObj) {                   
                        location.href = '/#/inValidPage';
                    }
                });
                _this.getDate = function () {
                    var today = new Date();
                    var dd = today.getDate();
                    var mm = today.getMonth() + 1; //January is 0!
                    var yyyy = today.getFullYear();
                    if (dd < 10) {
                        dd = '0' + dd;
                    }

                    if (mm < 10) {
                        mm = '0' + mm;
                    }
                    today = mm + '/' + dd + '/' + yyyy;
                    return today;
                }

                let currentDefaultTablePageSize = optionDataService.optionsData().paginationPageSize;
                $scope.isSelected = false;
                $scope.mySelectedRows = [];
                let networkResponseData = [];
                $scope.showTable = false;

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
                    $scope.billingReportGrid = optionDataService.optionsData();
                    $scope.billingReportGrid.data = [];
                    $scope.billingReportGrid.exporterPdfOrientation = 'landscape';
                    $scope.billingReportGrid.exporterPdfMaxGridWidth = 640;
                    $scope.billingReportGrid.exporterCsvFilename = 'Billing Report_' + _this.getDate() + '.csv';
                    $scope.billingReportGrid.columnDefs = [
                        { field: 'Account', displayName: 'Account', enableHiding: false, width: '12%' },
                        { field: 'PhysicalMeterNumber', displayName: 'Physical Meter Number', enableHiding: false, visible: true, width: '16%' },
                        { field: 'OldReading', displayName: 'Old Reading', enableHiding: false, width: '12%' },
                        { field: 'OldDate', displayName: 'Old Date', enableHiding: false, width: '12%' },
                        { field: 'NewReading', displayName: 'New reading', enableHiding: false, width: '12%' },
                        { field: 'NewDate', displayName: 'New date', enableHiding: false, width: '12%' },
                        { field: 'Latitude', displayName: 'Latitude', enableHiding: false, visible: true, width: '12%' },
                        { field: 'Longitude', displayName: 'Longitude', enableHiding: false, visible: true, width: '12%' }
                    ];
                    $scope.billingReportGrid.onRegisterApi = function (gridApi) {
                        $scope.gridApi = gridApi;
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
                    $scope.HSNetworStatistics = false;
                }

                function initList(pageNum, limit) {
                    networkResponseData.length = 0;
                    $scope.commonMsg = "Loading..";
                    deviceService.MeterBillingUploadDisplay(pageNum, limit)
                        .then(function (apiData) {
                            $scope.showTable = true;
                            if (!angular.isUndefinedOrNull(apiData) && apiData.type && typeof(apiData.Message) !== 'string') {
                                networkResponseData.length = 0;
                                $scope.pagination.currentTotalItems = apiData.Message.results.length;
                                $scope.pagination.apiCurrentPage = pageNum;
                                $scope.pagination.totalRecordsInDBCount = apiData.Message.totalRecords;
                                $scope.pagination.totalTablePages = Math.ceil($scope.pagination.totalRecordsInDBCount / $scope.pagination.currentTablePaginationSize);
                                let btnFlags = deviceService.getBtnStatus($scope.pagination.currentTablePage, $scope.pagination.totalTablePages);
                                $scope.disableNxtBtn = btnFlags.disableNxtBtn;
                                $scope.disablePrvBtn = btnFlags.disablePrvBtn;
                                $scope.disableFirstBtn = btnFlags.disableFirstBtn;
                                $scope.disableLastBtn = btnFlags.disableLastBtn;

                                $scope.billingReportGrid.data = apiData.Message.results;
                                apiData = apiData.Message.results;
                                $scope.commonMsg = "";
                                for (let i = 0; i < apiData.length; i++) {
                                    let objToInsert = {};
                                    objToInsert["Account"] = apiData[i].Account;
                                    objToInsert["PhysicalMeterNumber"] = apiData[i].PhysicalMeterNumber ? apiData[i].PhysicalMeterNumber : '-';
                                    objToInsert["OldReading"] = apiData[i].OldReading ? apiData[i].OldReading : '-';
                                    objToInsert["OldDate"] = (apiData[i].OldDate && apiData[i].OldDate !== 'null') ? moment($scope.billingReportGrid.data[i].OldDate).utc().format("YYYY/MM/DD") : '-';
                                    objToInsert["NewDate"] = (apiData[i].NewDate && apiData[i].NewDate !== 'null') ? moment($scope.billingReportGrid.data[i].NewDate).utc().format("YYYY/MM/DD") : '-';
                                    objToInsert["NewReading"] = apiData[i].NewReading ? ($scope.billingReportGrid.data[i].NewReading) : '-';
                                    objToInsert["Latitude"] = apiData[i].Latitude ? apiData[i].Latitude : '0.00';
                                    objToInsert["Longitude"] = apiData[i].Longitude ? apiData[i].Longitude : '0.00';
                                    networkResponseData.push(objToInsert);
                                }
                                $scope.billingReportGrid.data = networkResponseData;
                            } else if (apiData.type && apiData.Message) {
                                $scope.disableNxtBtn = true;
                                $scope.disablePrvBtn = true;
                                $scope.disableFirstBtn = true;
                                $scope.disableLastBtn = true;
                                $scope.pagination.totalRecordsInDBCount = 0;
                                $scope.commonMsg = apiData.Message;
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

                $scope.endpointDetails = function () {
                    $uibModal.open({
                        templateUrl: '/templates/endpointDetails.html',
                        controller: 'homePageCtrl',
                        size: 'lg',
                        backdrop: 'static',
                        keyboard: true
                    });
                };

                vm.cellRelayDetails = function (row) {
                    objCacheDetails.data.selectedHypersprout = row.entity.HypersproutSerialNumber;
                    $state.go('cellRelays_networkStatistics');
                };

                $scope.changeReportType = function () {
                    deviceService.changeReportsRoutes($scope.selectedReport.name);
                };

                $scope.$on('$destroy', function () {
                    $templateCache.put('ui-grid/pagination', deviceService.setDefaultTable());
                });

                /**
                  * @description
                  * opens the Upload Billing Report modal on click of upload button
                  *
                  * @param  Nil
                  * @return  Nil
                */
                $scope.openUploadBillingReport = function open() {
                    modalInstance = $uibModal.open({
                        templateUrl: './templates/openUploadBillingReport.html',
                        controller: 'openUploadBillingReportCtrl',
                        size: 'md',
                        backdrop: 'static',
                        keyboard: true
                    });
                    modalInstance.result.then(function () {
                        $scope.pagination.currentTablePage = 1;
                        $scope.initTable($scope.pagination.currentTablePage, $scope.pagination.currentTablePaginationSize);
                    }, function () {
                        $scope.pagination.currentTablePage = 1;
                        $scope.initTable($scope.pagination.currentTablePage, $scope.pagination.currentTablePaginationSize);
                    });
                };
            }]);
})(window.angular);
