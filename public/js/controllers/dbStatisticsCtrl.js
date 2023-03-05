/**
  * @this vm
  * @ngdoc controller
  * @name dataSCAPEApp.controller:dbStatisticsCtrl
  *
  * @description
  * display db statistics table
*/
(function (angular) {

    "use strict";

    angular.module('dataSCAPEApp').controller('dbStatisticsCtrl',
        ['$scope', '$rootScope', '$uibModal', '$state', '$filter', '$timeout',
            'DeviceService', 'refreshservice', 'optionDataService', '$http',
            function ($scope, $rootScope, $uibModal, $state, $filter,
                $timeout, deviceService, refreshservice, optionDataService, $http) {

                $rootScope.isValidHostIframe = false;
                deviceService.inIframeAccess().then(function (resObj) {
                    if (!resObj) {
                        location.href = '/#/inValidPage';
                    }
                });

                init();
                var startDate;
                var endDate;
                var showData = [];
                var showError = [];

                $scope.showTable = false;

                /**
                  * @description
                  * Reads the start and End Date
                  *
                  * @param  Nil
                  * @return  Nil
                */
                $scope.gdata = function () {
                    startDate = moment($scope.startingDate).format('YYYY-MM-DDTHH:mm:ss');
                    endDate = moment($scope.endingDate).format('YYYY-MM-DDTHH:mm:ss');
                    init();
                };

                /**
                  * @description
                  * sets the default start date and end date on load
                  *
                  * @param  Nil
                  * @return  Nil
                */
                function init() {
                    if (startDate == undefined || startDate == null) {
                        $scope.endingDate = new Date();
                        var fromDate24hours = new Date();
                        fromDate24hours.setHours(fromDate24hours.getHours() - 24);
                        $scope.startingDate = fromDate24hours;
                        startDate = deviceService.convertDateToUTC($scope.startingDate);
                        endDate = deviceService.convertDateToUTC($scope.endingDate);
                    }

                    /**
                      * @description
                      * getting JSON data for dbStatistics table
                      *
                      * @param  objData - JSON data for dbStatistics table
                      * @return  Nil
                    */
                    deviceService.DBStatistics(startDate, endDate).then(function (objData) {
                        $scope.showTable = true;
                        showData.length = 0;
                        showError.length = 0;
                        if (!angular.isUndefinedOrNull(objData) &&
                            !angular.isUndefinedOrNull(objData.dbStats)) {
                            var dbStatsReport = objData.dbStats;
                            var objToInsert = {};
                            objToInsert["Inserts"] = dbStatsReport[0];
                            objToInsert["Updates"] = dbStatsReport[1];
                            objToInsert["Commands"] = dbStatsReport[2];
                            objToInsert["TransactionsPerSecond"] = dbStatsReport[3];
                            showData.push(objToInsert);
                            $scope.transactionsGrid.data = showData;
                        }

                        for (var i = 0; i < $scope.transactionsGrid.data.length; i++) {
                            var roundoff = null;
                            roundoff = (parseFloat($scope.transactionsGrid.data[i].TransactionsPerSecond).toFixed(2));
                            $scope.transactionsGrid.data[i].TransactionsPerSecond = ($scope.transactionsGrid.data[i].TransactionsPerSecond !== undefined) ? roundoff :'';
                        }
                        if (!angular.isUndefinedOrNull(objData) && !angular.isUndefinedOrNull(objData.Errors)) {
                            if (objData.Errors.length > 0) {
                                for (var j = 0; j < objData.Errors.length; j++) {
                                    var errorsReports = objData.Errors[j];
                                    if(!angular.isUndefinedOrNull(errorsReports)) {
                                        var dataInsert = {};
                                        dataInsert["Error Type"] = angular.isUndefinedOrNull(errorsReports.name)  ? '' : errorsReports.name;
                                        // dataInsert["Error Description"] = angular.isUndefinedOrNull(errorsReports.message)  ? '' : errorsReports.message;
                                        dataInsert["Error Timestamp"] = angular.isUndefinedOrNull(errorsReports.errorTimestamp) ? '' : deviceService.convertDateToMST(errorsReports.errorTimestamp);
                                        showError.push(dataInsert);
                                    }
                                }
                                $scope.errorDetailGrid.data = showError;
                            }
                        }
                    });
                }
                $scope.transactionsGrid = optionDataService.optionsData();
                $scope.transactionsGrid.columnDefs = [
                    { field: 'Inserts', displayName: 'Inserts', enableHiding: false, visible: true, width: '25%' },
                    { field: 'Updates', displayName: 'Updates', enableHiding: false, visible: true, width: '25%' },
                    { field: 'Commands', displayName: 'Commands', enableHiding: false, visible: true, width: '25%' },
                    { field: 'TransactionsPerSecond', displayName: 'Transactions Per Second', enableHiding: false, visible: true, width: '25%' }

                ];
                $scope.transactionsGrid['multiSelect'] = true;
                $scope.transactionsGrid['width'] = '*';
                $scope.transactionsGrid.exporterCsvFilename = 'Database Statistics Report_' + '.csv';
                $scope.transactionsGrid.exporterPdfOrientation = 'landscape',
                $scope.transactionsGrid.exporterPdfMaxGridWidth = 640;
                //error table
                $scope.errorDetailGrid = optionDataService.optionsData();
                $scope.errorDetailGrid.columnDefs = [
                    { field: 'Error Type', displayName: 'Error Type', enableHiding: false, visible: true, width: '50%' },
                    // { field: 'Error Description', displayName: 'Error Description', enableHiding: false, visible: true },
                    { field: 'Error Timestamp', displayName: 'Error Timestamp', enableHiding: false, visible: true, width: '50%' }
                ];
                $scope.errorDetailGrid['multiSelect'] = true;
                $scope.errorDetailGrid['width'] = '*';
                $scope.errorDetailGrid.exporterCsvFilename = 'Er Report_' + '.csv';
                $scope.errorDetailGrid.exporterPdfOrientation = 'landscape',
                $scope.errorDetailGrid.exporterPdfMaxGridWidth = 640;
                $scope.endDateBeforeRender = endDateBeforeRender;
                $scope.endDateOnSetTime = endDateOnSetTime;
                $scope.startDateBeforeRender = startDateBeforeRender;
                $scope.startDateOnSetTime = startDateOnSetTime;
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
                  * @param   Nil
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
                    if ($scope.endingDate) {
                        var activeDate = moment($scope.endingDate);

                        $dates.filter(function (date) {
                            return date.localDateValue() >= activeDate.valueOf()
                        }).forEach(function (date) {
                            date.selectable = false;
                        })
                    }
                };

                /**
                  * @description
                  * makes all the date disable before the start date
                  *
                  * @param  $view
                  * @param  $dates - all the dates present in calendar
                  * @return  Nil
                */
                function endDateBeforeRender($view, $dates) {
                    if ($scope.startingDate) {
                        var activeDate = moment($scope.startingDate).subtract(1, $view).add(1, 'minute');

                        $dates.filter(function (date) {
                            return date.localDateValue() <= activeDate.valueOf()
                        }).forEach(function (date) {
                            date.selectable = false;
                        })
                    }
                }

            }]);
})(window.angular);
