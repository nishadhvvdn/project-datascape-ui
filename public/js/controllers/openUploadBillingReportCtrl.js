
/**
  * @this vm
  * @ngdoc controller
  * @name dataSCAPEApp.controller:openUploadBillingReportCtrl
  *
  * @description
  * Display Upload Billing Report
*/
(function (angular) {

    "use strict";

    angular.module('dataSCAPEApp').controller('openUploadBillingReportCtrl', ['$http', '$scope', 'fileUpload',
        'csvparser', '$modalInstance', '$rootScope', '$uibModal', '$state', '$filter',
        '$timeout', 'DeviceService', 'refreshservice', '$window', 'Upload',
        function ($http, $scope, fileUpload, csvparser, $modalInstance, $rootScope, $uibModal,
            $state, $filter, $timeout, deviceService, refreshservice, $window, Upload) {
            
            $rootScope.isValidHostIframe = false;
            deviceService.inIframeAccess().then(function (resObj) {
                if (!resObj) {
                    location.href = '/#/inValidPage';
                }
            });

            var host = objCacheDetails.webserviceUrl;


            $scope.disableImport = true;

            /**
              * @description
              * Check the uploaded file type is excel or csv
              *
              * @param  element - uploaded file
              * @return  Nil
            */
            $scope.fileNameChanged = function (element) {
                $scope.$apply(function () {
                    var fileImported = element.files[0];
                    let fileName = fileImported.name;
                    let type = fileName.substring(fileName.lastIndexOf(".") + 1);
                    if (type === "csv") {
                        $scope.disableImport = false;
                    } else {
                        swal("Please upload a .CSV file!");
                    }
                });
            };

            /**
              * @description
              * Http request to Upload Billing File
              *
              * @param  Nil
              * @return  Nil
            */
            $scope.uploadFile = function () {
                Upload.upload({
                    url: host + 'MeterBillingUploadData',//WebAPI exposed to upload the file
                    data: { file: $scope.file },//Pass the file as data, should be user ng-model
                    contentType: 'multipart/form-data; boundary=----WebKitFormBoundaryXFQ9VxiHvjIEwmJA'
                }).then(function (resp) {//Upload function returns a promise
                    if (resp.data.Message == 0) { //Validate success
                        $timeout(function () {
                            swal('Failed To Generate Report');
                            $modalInstance.dismiss();
                        }, 1000);
                    } else if (resp.data.Message == 1) {
                        $timeout(function () {
                            switch (resp.data.errorCode) {
                                case 2:
                                    swal('Incorrect Data in CSV, New Reading and New Date must be empty');
                                    $modalInstance.dismiss();
                                    break;
                                case 3:
                                    swal('Incorrect Data in CSV, Physical mtr no is required');
                                    $modalInstance.dismiss();
                                    break;
                                case 5:
                                    swal('Incorrect Data in CSV, Invalid OldDate format')
                                    $modalInstance.dismiss();
                                    break;
                                default:
                                    swal('Incorrect CSV Format');
                                    $modalInstance.dismiss();
                            }
                                  
                        }, 1000);
                    }
                    else if (resp.data.Message == 2) {
                        $timeout(function () {
                            swal('Billing Report Generated Successfully');
                            $modalInstance.dismiss();
                        }, 1000);
                    }

                }, function (resp) { //Catch error
                    // swal('Error status: ' + resp.status);
                    swal('Something went wrong, please try again!');
                }, function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    $scope.Progress = 'Progress: ' + progressPercentage + '% '; //Capture upload progress 
                });
            };
            /**
              * @description
              * cancel the upload File 
              *
              * @param  Nil
              * @return  Nil
            */
            $scope.cancel = function () {
                $modalInstance.dismiss();
            };

        }])
        .service('fileUpload', ['$http', function ($http) {
            this.uploadFileToUrl = function (file, uploadUrl) {
                var fd = new FormData();
                fd.append('file', file);
                $http.post(uploadUrl, fd, {
                    transformRequest: angular.identity,
                    headers: { 'Content-Type': undefined }
                })
                    .success(function ($scope) {
                        $scope.message = "File uploaded";
                    })
                    .error(function () {
                    });

            }
        }]);
})(window.angular);
