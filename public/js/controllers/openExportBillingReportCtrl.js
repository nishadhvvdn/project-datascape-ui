
/**
  * @this vm
  * @ngdoc controller
  * @name dataSCAPEApp.controller:openExportBillingReportCtrl
  *
  * @description
  * Display the Export Billing Report
*/
(function (angular) {

    "use strict";

    angular.module('dataSCAPEApp').controller('openExportBillingReportCtrl', ['$scope', '$rootScope', 
        '$modalInstance', '$uibModal', 'DeviceService', 'optionDataService', 'modeDataServices',
        function ($scope, $rootScope, $modalInstance, $uibModal,
            deviceService, optionDataService, modeDataServices) {
                
            $rootScope.isValidHostIframe = false;
            deviceService.inIframeAccess().then(function (resObj) {
                if (!resObj) {
                    location.href = '/#/inValidPage';
                }
            });
            
            $scope.startingDate = new Date();

            $scope.inlineOptions = {
                customClass: modeDataServices.getDayClass,
                minDate: new Date(),
                showWeeks: true
            };

            /**
              * @description
              * it sets the datepickerPopUp as true on click 
              *
              * @param  Nil
              * @return  Nil
            */
            $scope.datePickerOpen = function () {
                $scope.datepickerPopUp.opened = true;
            };

            /**
              * @description
              * it sets the selected Date as starting Date
              *
              * @param  year - year selected
              * @param  month - month selected
              * @param  day - day selected
              * @return  Nil
            */
            $scope.setDate = function (year, month, day) {
                $scope.startingDate = new Date(year, month, day);
            };

            $scope.datepickerPopUp = {
                opened: false
            };

            $scope.status = {
                isopen: false
            };

            $scope.hstep = 1;
            $scope.mstep = 1;

            $scope.ismeridian = true;

            /**
              * @description
              * toggles the date picker display
              *
              * @param  Nil
              * @return  Nil
            */
            $scope.toggleMode = function () {
                $scope.ismeridian = !$scope.ismeridian;
            };

            /**
              * @description
              * set the from Date selected in date picker
              *
              * @param  fromDate - selected Date
              * @return  Nil
            */
            $scope.setFromDate = function (fromDate) {
                $scope.startingDate = fromDate;
                $scope.properDateTime = false;
            };
            $scope.invalidDate = false;

            /**
              * @description
              * set the start Time selected
              *
              * @param  fromTime - time selected
              * @return  Nil
            */
            $scope.setStartTime = function (fromTime) {
                $scope.startingDate = fromTime;
                if (angular.isUndefinedOrNull(fromTime)) {
                    $scope.properDateTime = true;
                    $scope.invalidTime = false;
                    $scope.invalidDate = false;
                }
                else {
                    $scope.properDateTime = false;
                }
            };

            $scope.invalidTime = false;

            /**
              * @description
              * set the end time
              *
              * @param  toTime - selected time
              * @return  Nil
            */
            $scope.setToTime = function (toTime) {
                $scope.endingDate = toTime;
                if (angular.isUndefinedOrNull(toTime)) {
                    $scope.properDateTime = true;
                    $scope.invalidTime = false;
                    $scope.invalidDate = false;
                }
                else {
                    $scope.properDateTime = false;
                }
            };
            var showBillingData = [];

            /**
              * @description
              * set the today date in format of MM/DD/YYYY
              *
              * @param  Nil
              * @return  Nil
            */
            function getDate() {
                var today = new Date();
                var dd = today.getDate();
                var mm = today.getMonth() + 1; //January is 0!
                var yyyy = today.getFullYear();
                if (dd < 10) {
                    dd = '0' + dd
                }

                if (mm < 10) {
                    mm = '0' + mm
                }
                today = mm + '/' + dd + '/' + yyyy;
                return today
            }

            $scope.showDateFilter = true;
            this.picker3 = {
                date: new Date()
            };

            $scope.billingFile = true;

            /**
              * @description
              * cancel the modal
              *
              * @param  Nil 
              * @return  Nil
            */
            $scope.cancel = function () {
                $modalInstance.dismiss();
            };

            /**
              * @description
              * opens the export billing report modal
              *
              * @param  Nil
              * @return  Nil
            */
            $scope.openView = function () {
                $modalInstance = $uibModal.open({
                    templateUrl: './templates/exportBillingFileView.html',
                    controller: 'openExportBillingReportCtrl',
                    size: 'md',
                    backdrop: 'static',
                    keyboard: true
                });
                $modalInstance.result.then(function () {
                    load();
                }, function () {
                    load();
                });
            };
            $scope.billingFileGrid = optionDataService.optionsData();
            $scope.billingFileGrid.columnDefs = [
                { field: 'Filename', displayName: 'File Name', enableHiding: false },
                { field: 'TimeStamp', displayName: 'TimeStamp', enableHiding: false },
                {
                    field: 'Actions',
                    cellTemplate: '<div class="ui-grid-cell-contents"><button type="button" class="btn btn-xs btn-primary cellBtn" ng-click="grid.appScope.viewFile(row)">  <i class="fa fa-eye" aria-hidden="true"></i></button> &nbsp | &nbsp <button class="btn btn-xs btn-primary cellBtn" ng-click="grid.appScope.deleteFile(row)"> <i class="fa fa-trash-o" aria-hidden="true"></i></button></div>',
                    enableColumnMenu: false, enableSorting: false, enableHiding: false, width: 150
                }
            ];
            $scope.billingFileGrid['width'] = '*';
            $scope.billingFileGrid['multiSelect'] = true;
            $scope.billingFileGrid.exporterCsvFilename = 'Billing Report_' + getDate() + '.csv';
            $scope.billingFileGrid.exporterPdfOrientation = 'landscape',
            $scope.billingFileGrid.exporterPdfMaxGridWidth = 640;
            $scope.billingFileGrid.exporterSuppressColumns = ['Actions'];

            /**
              * @description
              * sweet alert confirmation message on deleting file
              *
              * @param  row - file to be deleted
              * @return  Nil
            */
            $scope.deleteFile = function (row) {
                swal({
                    title: "Delete File", text: " Are you sure you want to remove ?",
                    showCancelButton: true,
                    confirmButtonColor: 'black',
                    confirmButtonText: 'Delete',
                    cancelButtonText: "Cancel",
                    cancelButtonColor: 'white',
                },
                    function (isConfirm) {
                        if (isConfirm) {
                            deviceService.DeleteMeterBilling(row.entity.Filename, row.entity.TimeStamp).then(function (objData) {
                                swal(objData.Messege);
                                $scope.showGrid();
                            });
                        }
                    });
            };

            /**
              * @description
              * View File of selected row
              *
              * @param  row - selected row
              * @return  Nil
            */
            $scope.viewFile = function (row) {
                deviceService.ViewBillingData(row.entity.Filename, row.entity.TimeStamp).then(function (objData) {
                    $modalInstance.close(objData);
                });
            };

            /**
              * @description
              * show data for selected date and time stamp
              *
              * @param  Nil
              * @return  Nil
            */
            $scope.showGrid = function () {
                $scope.billingFile = false;
                var startDate = moment($scope.startingDate).utc().format('YYYY-MM-DDTHH:mm') + 'Z';
                deviceService.UniqueFileNameandTimeStamp(startDate).then(function (objData) {
                    showBillingData = [];
                    if (!angular.isUndefined(objData) && !angular.isUndefined(objData.Details)) {
                        for (var i = 0; i < objData.Details.length; i++) {
                            var Details = objData.Details[i];
                            var dataInsert = {};
                            dataInsert["Filename"] = Details.FileName;
                            dataInsert["TimeStamp"] = Details.StoredTime;
                            showBillingData.push(dataInsert);
                        }
                        $scope.billingFileGrid.data = showBillingData;
                    }
                });
            }
        }])

})(window.angular);