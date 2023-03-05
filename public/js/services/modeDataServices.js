
/**
  * @ngdoc service
  * @name MODULE_NAME.modeDataServices
  * 
  * @description
  * checks the mode and sets the Date
  *
**/
(function (angular) {
    "use strict";
    angular.module('dataSCAPEApp').service('modeDataServices', function () {
        var _this = this;
        _this.getDayClass = function (data) {
            var date = data.date,
                mode = data.mode;
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0, 0, 0, 0);
                for (var i = 0; i < _this.events.length; i++) {
                    var currentDay = new Date(_this.events[i].date).setHours(0, 0, 0, 0);
                    if (dayToCheck === currentDay) {
                        return _this.events[i].status;
                    }
                }
            }
            return '';
        };
    });
})(window.angular);
