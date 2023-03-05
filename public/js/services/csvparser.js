'use strict';
/**
  * @ngdoc service
  * @name MODULE_NAME.csvparser
  * 
  * @description
  * This handles csv parsing
  * 
**/
angular.module('dataSCAPEApp').service('csvparser',
    function () {
        this.validateFiles = function (fileContent) {
            if (angular.isUndefinedOrNull(fileContent)) {
                return { "valid": false, "message": 'Select a file to upload' };
            }
            if (!fileContent.validData) {
                return { "valid": false, "message": 'Invalid file' };
            }
            return { "valid": true, "message": 'Valid file' };
        }

        this.parseCSVConent = function (arrRows) {
            var objResult = {};
            if (!angular.isUndefinedOrNull(arrRows) && arrRows.length > 0) {
                var arrHeaderCols = arrRows[0];
                if (arrHeaderCols.length > 0) {
                    for (var index = 0; index < arrHeaderCols.length; index++) {
                        var strColName = arrHeaderCols[index].trim();
                        objResult[strColName] = [];
                    }

                    for (var i = 1; i < arrRows.length; i++) {
                        var arrContentCols = arrRows[i];
                        if (arrContentCols.length > 0) {
                            if (arrContentCols.length === arrHeaderCols.length) {
                                for (var colindex = 0; colindex < arrHeaderCols.length; colindex++) {
                                    var colName = arrHeaderCols[colindex].trim();
                                    objResult[colName].push(arrContentCols[colindex]);
                                }
                            }
                        }
                    }
                }
            }
            return objResult;
        }
    });