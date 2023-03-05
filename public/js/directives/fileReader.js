
/**
  * @ngdoc directive
  * @name directives.fileReader
  * 
  * @description
  * Reads the file content
  * 
**/
angular.module('dataSCAPEApp').directive('fileReader', function () {
    return {
        scope: {
            fileReader: "="
        },
        link: function (scope, element) {
            $(element).on('change', function (changeEvent) {
                var files = changeEvent.target.files;
                if (files.length) {
                    var r = new FileReader();
                    r.onload = function (e) {
                        var contents = e.target.result;
                        var validData = angular.isUndefinedOrNull(contents) ? false : true;
                        scope.$apply(function () {
                            scope.fileReader = { 'name': files[0].name, 'content': contents, validData: validData };
                        });
                    };

                    r.readAsText(files[0]);
                }
            });
        }
    };
});
