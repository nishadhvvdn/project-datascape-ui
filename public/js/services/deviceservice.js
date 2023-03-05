'use strict';
/**
  * @ngdoc service
  * @name MODULE_NAME.DeviceService
  * 
  * @description
  * Request and Responses for all reports
  *
**/
angular.module('dataSCAPEApp').service('DeviceService', ['$q', 'NetworkUtilService','InitService', '$rootScope', '$state',
    function ($q, networkUtilService, InitService, $rootScope, $state) {



        /**
          * @description
          * Display message if data request operation fails
          *
          * @param objData - data
          * @return message operation failed message
        */
        function handleDisplayMessage(objData) {
            if (!angular.isUndefinedOrNull(objData) && !angular.isUndefinedOrNull(objData.Message)) {
                return objData.Message;
            } else {
                return "Failed to perform operation !! Try again";
            }
        }

        /**
          * @description
          * Request and Response for Meter Billing Upload 
          *
          * @param name Nil
          * @return des.promise - promise object
        */
        this.MeterBillingUploadDisplay = function (pageNum, limit) {
            var des = $q.defer();
            networkUtilService.createHttpRequestAndGetResponse("MeterBillingUploadDisplay?Page=" + pageNum + "&Limit=" + limit, []).then(function (objData) {
                des.resolve(handleDBMessage(objData));
            });
            return des.promise;
        };

        /**
          * @description
          * Request and Response for DB Statistics
          *
          * @param startDate - selected start date
          * @param endDate - selected end date
          * @return des.promise - promise object
        */
        this.DBStatistics = function (startDate, endDate) {
            var des = $q.defer();
            var arrInputData = [startDate, endDate];
            networkUtilService.createHttpRequestAndGetResponse("DBStatistics", arrInputData).then(function (objData) {
                des.resolve(handleDBMessage(objData));
            });
            return des.promise;
        };

        /**
          * @description
          * Request and Response for Solar Panel Report
          *
          * @param Nil
          * @return des.promise - promise object
        */
        /**
         * @param searchTerm
         * @param pageNum
         * @param limit
         */
        this.SolarPanelReturn = function (searchTerm, pageNum, limit) {
                var des = $q.defer();
                networkUtilService.createHttpRequestAndGetResponse("SolarPanelReturn?Page=" + pageNum + "&Limit=" + limit + "&search=" + searchTerm, [])
                    .then(function (objData) {
                        des.resolve(handleDBMessage(objData));
                    });
                return des.promise;
            };
        /**
         * @description
         * Request and Response for DataQualityReturns
         *
         * @param searchTerm
         * @param startDate - selected start date
         * @param endDate - selected end date
         * @param pageNum
         * @param limit
         * @return des.promise - promise object
         */
            this.DataQualityReturns = function (searchTerm, startDate, endDate, pageNum, limit) {
                var des = $q.defer();
                networkUtilService.createHttpRequestAndGetResponse("DataQualityReturns?Page=" + pageNum + "&Limit=" + limit + "&search=" + searchTerm, [startDate, endDate]).then(function (objData) {
                    des.resolve(handleDBMessage(objData));
                });
                return des.promise;
            };
        /**
         * @description
         * Request and Response for Outage Report
         *
         * @param tfrSearchTerm
         * @param dtcSearchTerm
         * @param pageNum
         * @param limit
         * @param startDate - selected start date
         * @param endDate - selected end date
         * @return des.promise - promise object
         */
        this.Outagereport = function (tfrSearchTerm,dtcSearchTerm, pageNum, limit,startDate, endDate) {
            var des = $q.defer();
            networkUtilService.createHttpRequestAndGetResponse("Outagereport?Page=" + pageNum+ "&Limit="+ limit + "&tfrSearch=" + tfrSearchTerm + "&dtcSearch=" + dtcSearchTerm, [startDate, endDate])
                .then(function (objData) {
                des.resolve(handleDBMessage(objData));
            });
            return des.promise;
        };

        this.getAllCircuitDetails = function () {
            var des = $q.defer();
            networkUtilService.createHttpRequestAndGetResponse("getCircuitDetails", [])
                .then(function (objData) {
                des.resolve(handleDBMessage(objData));
            });
            return des.promise;
        };

        this.getAllTransformerDetails = function (selectedCircuitID) {
            var des = $q.defer();
            networkUtilService.createHttpRequestAndGetResponse("getTransformersByDTCID?CircuitID=" + selectedCircuitID, [])
                .then(function (objData) {
                des.resolve(handleDBMessage(objData));
            });
            return des.promise;
        };
        this.getAllTransformerDetailsForDeviceDataRate = function (query) {
            var des = $q.defer();
            networkUtilService.createHttpRequestAndGetResponse(query, [])
                .then(function (objData) {
                des.resolve(handleDBMessage(objData));
            });
            return des.promise;
        };
        this.getAllMeterIDs = function (tfmrID) {
            var des = $q.defer();
            networkUtilService.createHttpRequestAndGetResponse("getMeterByTransformerID?transformerID=" + tfmrID, [])
                .then(function (objData) {
                des.resolve(handleDBMessage(objData));
            });
            return des.promise;
        };
        this.getDeltaLinkIDs = function (meterID) {
            var des = $q.defer();
            networkUtilService.createHttpRequestAndGetResponse("getDeltalinkDetails?MeterID=" + meterID, [])
                .then(function (objData) {
                des.resolve(handleDBMessage(objData));
            });
            return des.promise;
        };

        this.getAllPhaseDetails = function (urlQuery) {
            var des = $q.defer();
            networkUtilService.createHttpRequestAndGetResponse(urlQuery,[])
                .then(function (objData) {
                des.resolve(handleDBMessage(objData));
            });
            return des.promise;
        };

        this.getDeviceDataRate = function (deviceType, id) {
            var des = $q.defer();
            networkUtilService.createHttpRequestAndGetResponse("DataRate",[deviceType, id])
                .then(function (objData) {
                    des.resolve(objData);
            });
            return des.promise;
        };

        /**
          * @description
          * Request and Response for Delay Response
          *
          * @param  Nil
          * @return des.promise - promise object
        */

        this.DelayResponseReport = function (searchTerm, pageNum, limit) {
            var des = $q.defer();
            networkUtilService.createHttpRequestAndGetResponse("DelayResponseReport?Page=" + pageNum+ "&Limit="+ limit + "&search=" + searchTerm, []).then(function (objData) {
                des.resolve(objData);
            });
            return des.promise;
        };
        this.DataRateReport = function (deviceType, searchTerm, pageNum, limit, startDate, endDate) {
            var des = $q.defer();
            networkUtilService.createHttpRequestAndGetResponse("DataRateReport?Page=" + pageNum+ "&Limit="+ limit + "&search=" + searchTerm +"&DeviceType=" + deviceType + "&StartTime=" + startDate + "&EndTime=" + endDate, []).then(function (objData) {
                des.resolve(objData);
            });
            return des.promise;
        };

        /**
         * @description
         * Request and Response for Device Error
         *
         * @param searchTerm
         * @param pageNum
         * @param limit
         * @param startDate - selected start Date
         * @param endDate - selected end Date
         * @return des.promise - promise object
         */
        this.DeviceErrorReports = function (searchTerm, pageNum, limit,startDate, endDate) {
            var des = $q.defer();
            networkUtilService.createHttpRequestAndGetResponse("DeviceErrorReport?Page=" + pageNum+"&Limit="+ limit + "&search=" + searchTerm, [startDate, endDate]).then(function (objData) {
                des.resolve(objData);
            });
            return des.promise;
        };

        /**
          * @description
          * Request and Response for Network Statistics
          *
          * @param  Nil
          * @return name - description
        */
        this.NetworkStatisticsMeter = function (pageNum, limit) {
            var des = $q.defer();
            // networkUtilService.createHttpRequestAndGetResponse("NetworkStatisticsMeter?Page=" + pageNum+ "&Limit="+ limit, []).then(function (objData) {
            networkUtilService.createHttpRequestAndGetResponse("NetworkStatisticsMeter", []).then(function (objData) {
                des.resolve(objData);
            });
            return des.promise;
        };

        /**
         * @description
         * Request and Response for Battery Life
         *
         * @return Nil
         * @param searchTerm
         * @param pageNum
         * @param limit
         */
        this.BatteryLifeReport = function (searchTerm, pageNum, limit) {
            var des = $q.defer();
            networkUtilService.createHttpRequestAndGetResponse("BatteryLifeReport?Page=" + pageNum+ "&Limit="+ limit + "&search=" + searchTerm, []).then(function (objData) {
                des.resolve(objData);
            });
            return des.promise;
        };

        /**
          * @description
          * Request and Response for UniqueFileNameandTimeStamp
          *
          * @param startDate - selected start Date
          * @return des.promise - promise object
        */
        this.UniqueFileNameandTimeStamp = function (startDate) {
            var des = $q.defer();
            var arrInputData = [startDate];
            networkUtilService.createHttpRequestAndGetResponse("UniqueFileNameandTimeStamp", arrInputData).then(function (objData) {
                des.resolve(handleDBMessage(objData));
            });
            return des.promise;
        };

        /**
          * @description
          * Request and Response for Delete Meter
          *
          * @param FileName - selected FileName
          * @param DateTime - selected DateTime 
          * @return des.promise - promise object
        */
        this.DeleteMeterBilling = function (FileName, DateTime) {
            var des = $q.defer();
            var arrInputData = [FileName, DateTime];
            networkUtilService.createHttpRequestAndGetResponse("DeleteMeterBilling", arrInputData).then(function (objData) {
                des.resolve(handleDBMessage(objData));
            });
            return des.promise;
        };

        /**
          * @description
          * Request and Response for Billing View
          *
          * @param FileName - selected FileName for view
          * @param DateTime - selected DateTime
          * @return des.promise - promise object
        */
        this.ViewBillingData = function (FileName, DateTime) {
            var des = $q.defer();
            var arrInputData = [FileName, DateTime];
            networkUtilService.createHttpRequestAndGetResponse("ViewBillingData", arrInputData).then(function (objData) {
                des.resolve(handleDBMessage(objData));
            });
            return des.promise;
        };

        /**
          * @description
          * Request and Response for Non Technical Loss
          *
          * @param startDate - selected start date
          * @param endDate - selected end date
          * @return des.promise - promise object
        */
        this.NonTechnicalLossReport = function (searchTerm, pageNum, limit) {
            var des = $q.defer();
            var arrInputData = [0, 0];
            networkUtilService.createHttpRequestAndGetResponse("NonTechnicalLossReport?Page=" + pageNum+ "&Limit="+ limit + "&search=" + searchTerm, arrInputData).then(function (objData) {
                des.resolve(handleDBMessage(objData));
            });
            return des.promise;
        };

        /**
          * @description
          * Checking Response is undefined or not
          *
          * @param objData - Response data
          * @return objData - Response data
          * @return message - Operation failed message
        */
        function handleDBMessage(objData) {
            if (!angular.isUndefinedOrNull(objData)) {
                return objData;
            } else {
                return "Failed to perform operation !! Try again";
            }
        }

        this.inIframeAccess = function() {
            var des = $q.defer();
            InitService.initializeApp().then(function () {
                if(window.location.hash === '#/help/home') {
                    $rootScope.isValidHostIframe = true;
                    des.resolve(true);
                } else {
                    var url = (window.location != window.parent.location) ? document.referrer : document.location.href;
                    var hostURL = '';
                    if(url){
                        var a  = document.createElement('a');
                        a.href = url;
                        hostURL =  a.hostname;
                    }

                    try {
                        var isIframe =  window.self !== window.top;
                        if(isIframe && hostURL && hostURL === objCacheDetails.datascapeweburl) {
                            $rootScope.isValidHostIframe = true;
                            des.resolve(true);
                        } else {
                            $rootScope.isValidHostIframe = false;
                            des.resolve(false);
                        }
                    } catch (e) {
                        des.resolve(false);
                    }
                }
            });
            return des.promise;
        }
        this.getModifiedTable = function () {
            return "<div role=\"contentinfo\" class=\"ui-grid-pager-panel\" ui-grid-pager " +
                "ng-show=\"grid.options.enablePaginationControls\"><div role=\"navigation\" class=\"ui-grid-pager-container\">" +
                "<div role=\"menubar\" class=\"ui-grid-pager-control\"><button type=\"button\" role=\"menuitem\" class=\"ui-grid-pager-first\"" +
                " ui-grid-one-bind-title=\"aria.pageToFirst\" ui-grid-one-bind-aria-label=\"aria.pageToFirst\" " +
                "ng-click=\"pageFirstPageClick(); grid.appScope.firstPageBtnClick();\" ng-disabled=\"grid.appScope.disableFirstBtn\">" +
                "<div ng-class=\"grid.isRTL() ? 'last-triangle' : 'first-triangle'\"><div ng-class=\"grid.isRTL() ? 'last-bar-rtl' : 'first-bar'\">" +
                "</div></div></button> <button type=\"button\" role=\"menuitem\" class=\"ui-grid-pager-previous\" ui-grid-one-bind-title=\"aria.pageBack\"" +
                " ui-grid-one-bind-aria-label=\"aria.pageBack\" ng-click=\"pagePreviousPageClick(); grid.appScope.prvPageBtnClick();\"" +
                " ng-disabled=\"grid.appScope.disablePrvBtn\"><div ng-class=\"grid.isRTL() ? 'last-triangle prev-triangle' : 'first-triangle prev-triangle'\"></div></button>" +
                "<input type=\"number\" ng-disabled=\"false\" ui-grid-one-bind-title=\"aria.pageSelected\" ui-grid-one-bind-aria-label=\"aria.pageSelected\" " +
                "class=\"ui-grid-pager-control-input\" ng-change = \"grid.appScope.paginationBoxChanges()\"  ng-model=\"grid.appScope.pagination.currentTablePage\" min=\"1\" max=\"{{ grid.appScope.pagination.totalTablePages }}\">" +
                " <span class=\"ui-grid-pager-max-pages-number\" ng-show=\"paginationApi.getTotalPages() > 0\"><abbr ui-grid-one-bind-title=\"paginationOf\">/</abbr>" +
                " {{ grid.appScope.pagination.totalTablePages }}</span> <button type=\"button\" role=\"menuitem\" class=\"ui-grid-pager-next\" " +
                "ui-grid-one-bind-title=\"aria.pageForward\" ui-grid-one-bind-aria-label=\"aria.pageForward\" " +
                "ng-click=\"grid.appScope.nxtPageBtnClick(); pageNextPageClick();\" ng-disabled=\"grid.appScope.disableNxtBtn\">" +
                "<div ng-class=\"grid.isRTL() ? 'first-triangle next-triangle' : 'last-triangle next-triangle'\"></div></button>" +
                " <button type=\"button\" role=\"menuitem\" class=\"ui-grid-pager-last\" ui-grid-one-bind-title=\"aria.pageToLast\" " +
                "ui-grid-one-bind-aria-label=\"aria.pageToLast\" ng-click=\"pageLastPageClick(); grid.appScope.lastPageBtnClick();\" " +
                "ng-disabled=\"grid.appScope.disableLastBtn\"><div ng-class=\"grid.isRTL() ? 'first-triangle' : 'last-triangle'\"><div ng-class=\"grid.isRTL() ? 'first-bar-rtl' : 'last-bar'\">" +
                "</div></div></button></div><div class=\"ui-grid-pager-row-count-picker\" ng-if=\"grid.options.paginationPageSizes.length > 1\">" +
                "<select ui-grid-one-bind-aria-labelledby-grid=\"'items-per-page-label'\" ng-model=\"grid.options.paginationPageSize\" " +
                "ng-options=\"o as o for o in grid.options.paginationPageSizes\"></select><span ui-grid-one-bind-id-grid=\"'items-per-page-label'\" " +
                "class=\"ui-grid-pager-row-count-label\">&nbsp;{{sizesLabel}}</span></div><span ng-if=\"grid.options.paginationPageSizes.length <= 1\" " +
                "class=\"ui-grid-pager-row-count-label\">{{grid.options.paginationPageSize}}&nbsp;{{sizesLabel}}</span></div><div class=\"ui-grid-pager-count-container\">" +
                "<div class=\"ui-grid-pager-count\"><span ng-show=\"grid.options.totalItems > 0\">{{showingLow}} <abbr ui-grid-one-bind-title=\"paginationThrough\">-</abbr>" +
                " {{showingHigh}} {{paginationOf}} {{grid.options.totalItems}} {{totalItemsLabel}}</span></div></div></div>";
        }
        this.setDefaultTable = function () {
            return "<div role=\"contentinfo\" class=\"ui-grid-pager-panel\" ui-grid-pager ng-show=\"grid.options.enablePaginationControls\"><div role=\"navigation\" class=\"ui-grid-pager-container\"><div role=\"menubar\" class=\"ui-grid-pager-control\"><button type=\"button\" role=\"menuitem\" class=\"ui-grid-pager-first\" ui-grid-one-bind-title=\"aria.pageToFirst\" ui-grid-one-bind-aria-label=\"aria.pageToFirst\" ng-click=\"pageFirstPageClick();\" ng-disabled=\"cantPageBackward()\"><div ng-class=\"grid.isRTL() ? 'last-triangle' : 'first-triangle'\"><div ng-class=\"grid.isRTL() ? 'last-bar-rtl' : 'first-bar'\"></div></div></button> <button type=\"button\" role=\"menuitem\" class=\"ui-grid-pager-previous\" ui-grid-one-bind-title=\"aria.pageBack\" ui-grid-one-bind-aria-label=\"aria.pageBack\" ng-click=\"pagePreviousPageClick();\" ng-disabled=\"cantPageBackward()\"><div ng-class=\"grid.isRTL() ? 'last-triangle prev-triangle' : 'first-triangle prev-triangle'\"></div></button> <input type=\"number\" ui-grid-one-bind-title=\"aria.pageSelected\" ui-grid-one-bind-aria-label=\"aria.pageSelected\" class=\"ui-grid-pager-control-input\" ng-model=\"grid.options.paginationCurrentPage\" min=\"1\" max=\"{{ paginationApi.getTotalPages() }}\" required> <span class=\"ui-grid-pager-max-pages-number\" ng-show=\"paginationApi.getTotalPages() > 0\"><abbr ui-grid-one-bind-title=\"paginationOf\">/</abbr> {{ paginationApi.getTotalPages() }}</span> <button type=\"button\" role=\"menuitem\" class=\"ui-grid-pager-next\" ui-grid-one-bind-title=\"aria.pageForward\" ui-grid-one-bind-aria-label=\"aria.pageForward\" ng-click=\"pageNextPageClick();\" ng-disabled=\"cantPageForward()\"><div ng-class=\"grid.isRTL() ? 'first-triangle next-triangle' : 'last-triangle next-triangle'\"></div></button> <button type=\"button\" role=\"menuitem\" class=\"ui-grid-pager-last\" ui-grid-one-bind-title=\"aria.pageToLast\" ui-grid-one-bind-aria-label=\"aria.pageToLast\" ng-click=\"pageLastPageClick();\" ng-disabled=\"cantPageToLast()\"><div ng-class=\"grid.isRTL() ? 'first-triangle' : 'last-triangle'\"><div ng-class=\"grid.isRTL() ? 'first-bar-rtl' : 'last-bar'\"></div></div></button></div><div class=\"ui-grid-pager-row-count-picker\" ng-if=\"grid.options.paginationPageSizes.length > 1\"><select ui-grid-one-bind-aria-labelledby-grid=\"'items-per-page-label'\" ng-model=\"grid.options.paginationPageSize\" ng-options=\"o as o for o in grid.options.paginationPageSizes\"></select><span ui-grid-one-bind-id-grid=\"'items-per-page-label'\" class=\"ui-grid-pager-row-count-label\">&nbsp;{{sizesLabel}}</span></div><span ng-if=\"grid.options.paginationPageSizes.length <= 1\" class=\"ui-grid-pager-row-count-label\">{{grid.options.paginationPageSize}}&nbsp;{{sizesLabel}}</span></div><div class=\"ui-grid-pager-count-container\"><div class=\"ui-grid-pager-count\"><span ng-show=\"grid.options.totalItems > 0\">{{showingLow}} <abbr ui-grid-one-bind-title=\"paginationThrough\">-</abbr> {{showingHigh}} {{paginationOf}} {{grid.options.totalItems}} {{totalItemsLabel}}</span></div></div></div>"
        }

        this.getBtnStatus = function (currentTablePage, totalTablePages) {
            if (currentTablePage === 1) {
                if (currentTablePage === 1 && currentTablePage === totalTablePages) {
                    return {
                        disableNxtBtn : true,
                        disablePrvBtn : true,
                        disableFirstBtn : true,
                        disableLastBtn : true,
                    }
                } else if (currentTablePage === 1 && currentTablePage < totalTablePages) {
                    return {
                        disableNxtBtn :  false,
                        disablePrvBtn :  true,
                        disableFirstBtn : true,
                        disableLastBtn  : false
                    }
                } else if (currentTablePage === 1 && currentTablePage > totalTablePages) {
                }
            } else if (currentTablePage > 1) {
                if (currentTablePage > 1 && currentTablePage === totalTablePages) {
                    return {
                        disableNxtBtn : true,
                        disablePrvBtn : false,
                        disableFirstBtn : false,
                        disableLastBtn : true,
                    }
                } else if (currentTablePage > 1 && currentTablePage < totalTablePages) {
                    return {
                        disableNxtBtn : false,
                        disablePrvBtn : false,
                        disableFirstBtn : false,
                        disableLastBtn : false,
                    }
                } else if (currentTablePage > 1 && currentTablePage > totalTablePages) {
                    return {
                        disableNxtBtn : true,
                        disablePrvBtn : false,
                        disableFirstBtn : false,
                        disableLastBtn : true,
                    }
                }
            }
        }

        this.getGridApi = function (scope, gridApi) {
            gridApi.selection.on.rowSelectionChanged(scope, function () {
                scope.mySelectedRows = gridApi.selection.getSelectedRows();
            });
            gridApi.selection.on.rowSelectionChangedBatch(scope, function (rows) {
                var temp = [];
                for (var i = 0; i < rows.length; i++) {
                    if (rows[i].isSelected) {
                        temp.push(rows[i].entity);
                    }
                }
                scope.mySelectedRows = temp;
            });
        };

        let routesMatrix = {
            'Select Report Type' : 'deviceManagement',
            'Network Response Report' : 'networkResponseReport',
            'Delayed Response Report' : 'delayedResponseReport',
            'Outages Report' : 'deviceOutageReport',
            'Device Error Report' : 'deviceErrorReport',
            'Solar Report' : 'solarPanelReport',
            'Battery Report' : 'batteryLifeReport',
            'Network Statistics Report' : 'servers_networkStatistics',
            'Transformer' : 'transformerDataRate',
            'Meter' : 'meterDataRate',
            'Delta Link' : 'deltaLinkDataRate',
            'Data Rate Report' : 'deviceDataRateReport'
        }

        this.getReportsName = [
            {name: "Select Report Type"},
            {name: "Network Response Report"},
            {name: "Outages Report"},
            // {name: "Delayed Response Report"},
            {name: "Device Error Report"},
            {name: "Solar Report"},
            // {name: "Battery Report"},
            // {name: "Data Rate Report"},
            {name: "Network Statistics Report"},
        ];
        window.sessionStorage.setItem('showHSGrid', 'true');

        this.getDeviceTypePages = ["Transformer", "Meter", "Delta Link"];

        this.changeReportsRoutes = function (selectedReport) {
            $state.go(routesMatrix[selectedReport]);
        }

        this.convertDateToMST = function (time) {
            let mstTime = new Date(time).toLocaleString('en-US', {timeZone: 'America/Phoenix'});
            return mstTime;
        }

        this.convertDateToUTC = function (time) {
            if(time) {
                let utcString = new Date(time).toUTCString();
                let utcDate = new Date(utcString).toISOString();
                return utcDate;
            }
        }

    }]); 
