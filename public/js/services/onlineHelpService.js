
/**
  * @ngdoc service
  * @name MODULE_NAME.onlineHelpService
  * 
  * @description
  * list of tabs on Help Screen
  *
**/
(function (angular) {
    "use strict";
    angular.module('dataSCAPEApp').service('onlineHelpService', function () {
        this.tabSet = function (tab) {
            var tabList = {
                'readingReport': false,
                'exportingReport': false,
                'filterReport': false,
                'printReport': false,
                'sortReport': false,
                'setReport': false,
                'editReport': false,
                'addReport': false,
                'dataconsumptionReport': false,
                'trendingReport': false,
                'datarateReport': false
            };
            tabList[tab] = true;
            return tabList;
        };
    });
})(window.angular);
