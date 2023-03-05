/**
 * @this vm
 * @ngdoc controller
 * @name dataSCAPEApp.controller:nonTechnicalLossCtrl
 *
 * @description
 * Display Non Technical Loss Table
 */
angular.module('dataSCAPEApp').controller('nonTechnicalLossCtrl',
    ['$scope', '$rootScope', '$state', '$uibModal', 'DeviceService', 'optionDataService', '$timeout', '$filter', '$templateCache',
        function ($scope, $rootScope, $state, $uibModal, deviceService, optionDataService, $timeout, $filter, $templateCache) {
            var dataNonTechnicalLoss = [];

            $rootScope.isValidHostIframe = false;
            deviceService.inIframeAccess().then(function (resObj) {
                if (!resObj) {
                    location.href = '/#/inValidPage';
                }
            });

            let currentDefaultTablePageSize = optionDataService.optionsData().paginationPageSize;
            $scope.isSelected = false;
            $scope.mySelectedRows = [];
            let nonTechLossData = [];

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

            $scope.showTable = false;

            $scope.initTable = function (pageNum) {
                $scope.nonTechnicalOptions = optionDataService.optionsData();
                $scope.nonTechnicalOptions.data = [];
                $scope.nonTechnicalOptions.exporterPdfOrientation = 'landscape';
                $scope.nonTechnicalOptions.exporterPdfMaxGridWidth = 640;
                $scope.nonTechnicalOptions.exporterCsvFilename = 'file.csv';
                $scope.nonTechnicalOptions.columnDefs = [
                    // { field: 'EventID', displayName: 'Event ID', enableHiding: false, visible: true },
                    {field: 'CircuitID', displayName: 'DTC ID', enableHiding: false, visible: true, width: '15%'},
                    {
                        field: 'AffectedTransformers',
                        displayName: 'Affected Transformers',
                        enableHiding: false,
                        visible: true,
                        width: '15%'
                    },
                    {
                        field: 'ConnectedDevices',
                        displayName: 'Connected Devices',
                        enableHiding: false,
                        visible: true,
                        width: '14%'
                    },
                    {
                        field: 'EventIdentifytime',
                        displayName: 'Event Identify time',
                        enableHiding: false,
                        visible: true,
                        width: '14%'
                    },
                    {
                        field: 'TotalkWSent',
                        displayName: 'Total kW Sent',
                        enableHiding: false,
                        visible: true,
                        width: '14%'
                    },
                    {
                        field: 'TotalkWRecorded',
                        displayName: 'Total kW Recorded',
                        enableHiding: false,
                        visible: true,
                        width: '14%'
                    },
                    {field: 'Delta', displayName: 'Delta', enableHiding: false, visible: true, width: '14%'}
                ];
                $scope.nonTechnicalOptions.onRegisterApi = function (gridApi) {
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
                $scope.solarReport = false;
            }

            function initList(pageNum, limit) {
                nonTechLossData.length = 0;
                $scope.commonMsg = "Loading..";
                deviceService.NonTechnicalLossReport($scope.searchTerm, pageNum, limit)
                    .then(function (apiData) {
                        $scope.showTable = true;
                        if (!angular.isUndefinedOrNull(apiData) && apiData.type) {
                            nonTechLossData.length = 0;
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
                                let meterSerial = [];
                                for (let j = 0; j < apiData[i].meterConnected.length; j++) {
                                    meterSerial.push(apiData[i].meterConnected[j].MeterSerialNumber);
                                }
                                let objToInsert = {};
                                objToInsert["EventID"] = apiData[i].eventID;
                                objToInsert["CircuitID"] = apiData[i].CircuitID;
                                objToInsert["AffectedTransformers"] = apiData[i].TransformerID;
                                objToInsert["ConnectedDevices"] = meterSerial.toString().replace('"', '');
                                objToInsert["EventIdentifytime"] = apiData[i].Transformer_ReadTimestamp;
                                objToInsert["TotalkWSent"] = apiData[i].transforRecieve;
                                objToInsert["TotalkWRecorded"] = apiData[i].meterRecieve;
                                objToInsert["Delta"] = apiData[i].Delta;
                                nonTechLossData.push(objToInsert);
                            }
                            $scope.nonTechnicalOptions.data = nonTechLossData;
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
                if ($scope.pagination.currentTablePage) {
                    $scope.initTable($scope.pagination.currentTablePage, $scope.pagination.currentTablePaginationSize);
                } else {
                    $scope.pagination.currentTablePage = 1;
                    $scope.initTable($scope.pagination.currentTablePage, $scope.pagination.currentTablePaginationSize);
                }
            }

            $scope.searchNonTechReport = function (searchTerm) {
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

            $scope.$on('$destroy', function () {
                $templateCache.put('ui-grid/pagination', deviceService.setDefaultTable());
            });
        }]);