'use strict';
/**
  * @ngdoc service
  * @name MODULE_NAME.refreshservice
  * 
  * @description
  * This handles Session Check in Each Controller
  *
**/
angular.module('dataSCAPEApp').service('refreshservice', ['$q', 'InitService',
    function ($q, initService) {

        this.refresh = function () {
            var des = $q.defer(); // inject and call Authservice here and pass user name and password to it.
            initService.initializeApp().then(function (responseData) {// Update the Changes here!
                des.resolve();
            });
            return des.promise;
        }
    }]);