
/**
  * @ngdoc service
  * @name MODULE_NAME.optionDataService
  * 
  * @description
  * Options for grid
  *
**/
(function (angular) {
    "use strict";
    angular.module('dataSCAPEApp').service('optionDataService', function () {
        var _this = this;
        _this.optionsData = function () {
            var optionData = {
                columnDefs: [
                    { field: 'SerialNumber', enableHiding: false, cellTemplate: '<div class="ui-grid-cell-contents"><a class="anchorUIGrid" ng-click="grid.appScope.endpointDetails(row)">{{row.entity.SerialNumber}} </a> </div>' },
                    { field: 'Type', enableHiding: false },
                    { field: 'MinutesOnBattery', displayName: 'Minutes On Battery', enableHiding: false },
                ],
                enableColumnMenus: false,
                paginationPageSizes: [15, 30, 45, 60, 75, 90, 100],
                paginationPageSize: 15,
                data: [],
                gridMenuShowHideColumns: false,
                enableGridMenu: true,
                enableSelectAll: true,
                exporterCsvFilename: 'myFile.csv',
                exporterPdfDefaultStyle: { fontSize: 9 },
                exporterPdfTableStyle: { margin: [10, 10, 10, 10] },
                exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'red' },
                exporterPdfHeader: {},
                exporterPdfFooter: function (currentPage, pageCount) {
                    return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
                },
                exporterPdfCustomFormatter: function (docDefinition) {
                    docDefinition.styles.headerStyle = { fontSize: 22, bold: true };
                    docDefinition.styles.footerStyle = { fontSize: 10, bold: true };
                    return docDefinition;
                },
                exporterPdfOrientation: 'portrait',
                exporterPdfPageSize: 'LETTER',
                exporterPdfMaxGridWidth: 500,
                exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
                onRegisterApi: function (gridApi) {
                    _this.gridApi = gridApi;
                    _this.gridApi.core.refresh();
                }
            };

            return optionData;
        };
    });
})(window.angular);