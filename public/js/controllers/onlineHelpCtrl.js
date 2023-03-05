
/**
  * @this vm
  * @ngdoc controller
  * @name dataSCAPEApp.controller:onlineHelpCtrl
  *
  * @description
  * Display the Online Help Screen
*/
(function (angular) {
  "use strict";
  angular.module('dataSCAPEApp').controller('onlineHelpCtrl', 
  ['$scope', '$state', 'onlineHelpService', function ($scope, $state, onlineHelpService) {
    /*---------------------------for vertical menu------------------------ */
    $scope.showReport = true;
    $scope.showDashboard = true;
    $scope.showMapping = true;
    $scope.showGraphing = true;
    $scope.tabs = {};
    $scope.isDashboard = false;
    $scope.tabs.readingReport = true;
    /**
      * @description
      * invokes on tab change
      *
      * @param  tabValue - selected tab name
      * @return  Nil
    */
    $scope.tabChange = function (tabValue) {
      $scope.tabs = onlineHelpService.tabSet(tabValue);
    };

    /**
      * @description
      * change of plus minus icon on click of Home Tab
      *
      * @param  Nil
      * @return  Nil
    */
    $scope.homePage = function () {
      $scope.showReport = true;
      $scope.showMapping = true;
      $scope.showDashboard = true;
      $scope.showGraphing = true;
      $scope.tabs = {};
      $scope.tabs.readingReport = true;
      $scope.tabChange = function (tabValue) {
        $scope.tabs = onlineHelpService.tabSet(tabValue);
      }
    };

    /**
      * @description
      * change of plus minus icon on click of Dashboard Tab
      *
      * @param  Nil
      * @return  Nil
    */
    $scope.displayDashboard = function () {
      $scope.showReport = true
      $scope.showDashboard = !$scope.showDashboard;
      $scope.showMapping = true;
      $scope.showGraphing = true;
      $scope.tabs = {};
      $scope.tabs.readingReport = true;
      $scope.tabChange = function (tabValue) {
        $scope.tabs = onlineHelpService.tabSet(tabValue);
      }
    };

    /**
      * @description
      * change of plus minus icon on click of Mapping Tab
      *
      * @param description
      * @return  name - description
    */
    $scope.displayMapping = function () {
      $scope.showDashboard = true;
      $scope.showMapping = !$scope.showMapping;
      $scope.showGraphing = true;
      $scope.showSystem = true;
      $scope.showReport = true;
      $scope.tabs = {};
      $scope.tabs.readingReport = true;
      $scope.tabChange = function (tabValue) {
        $scope.tabs = onlineHelpService.tabSet(tabValue);
      }
    };

    /**
      * @description
      * change of plus minus icon on click of Report Tab
      *
      * @param  Nil
      * @return  Nil
    */
    $scope.displayReports = function () {
      $scope.showReport = !$scope.showReport;
      $scope.showDashboard = true;
      $scope.showMapping = true;
      $scope.showGraphing = true;
      $scope.tabs = {};
      $scope.tabs.readingReport = true;
      $scope.tabChange = function (tabValue) {
        $scope.tabs = onlineHelpService.tabSet(tabValue);
      }
    };

    /**
      * @description
      * change of plus minus icon on click of Graph Tab
      *
      * @param  Nil
      * @return  Nil
    */
    $scope.displayGraphing = function () {
      $scope.showDashboard = true;
      $scope.showGraphing = !$scope.showGraphing;
      $scope.showReport = true;
      $scope.showMapping = true;
      $scope.tabs = {};
      $scope.tabs.readingReport = true;
      $scope.tabChange = function (tabValue) {
        $scope.tabs = onlineHelpService.tabSet(tabValue);
      };
    };

    /**
      * @description
      * change of plus minus icon on click of Settings
      *
      * @param  Nil
      * @return  Nil
    */
    $scope.displaySettings = function () {
      $scope.showDashboard = true;
      $scope.showReport = true;
      $scope.showMapping = true;
      $scope.showGraphing = true;
      $scope.tabs = {};
      $scope.tabs.readingReport = true;
      $scope.tabChange = function (tabValue) {
        $scope.tabs = onlineHelpService.tabSet(tabValue);
      }
    };
    if (!angular.isUndefinedOrNull($state.current) &&
      $state.current.name === 'help') {
      $state.go('help.home');
    }
  }]);
})(window.angular);