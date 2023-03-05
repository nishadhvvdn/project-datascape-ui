/**
  * @this vm
  * @ngdoc controller
  * @name dataSCAPEApp.controller:homePageCtrl
  *
  * @description
  * it handles the home page of report 
*/
angular.module('dataSCAPEApp').controller('homePageCtrl',
    ["$scope", "$uibModal", "$rootScope", "$state", '$filter', '$timeout', 'DeviceService', 'refreshservice', 'optionDataService',
        function ($scope, $uibModal, $rootScope, $state, $filter, $timeout, deviceService, refreshservice, optionDataService, $location) {
            
            $rootScope.isValidHostIframe = false;
            deviceService.inIframeAccess().then(function (resObj) {
                if (!resObj) {
                    location.href = '/#/inValidPage';
                }
            });
            // console.log('cookies', document.cookie);
            /**
              * @description
              * displaying all the list values
              *
              * @param  Nil
              * @return  Nil
            */
            $scope.reports = deviceService.getReportsName;
            $scope.selectedReport = $scope.reports[0];
            /**
              * @description
              * opens the modal for endpointDetail
              *
              * @param  Nil 
              * @return  Nil
            */

                $scope.changeReportType = function () {
                    deviceService.changeReportsRoutes($scope.selectedReport.name);
                };
        }]);



