var objCacheDetails;
describe('Controller: cellRelayDetail_DataVINEHealthCtrl', function () {
    var scope, dataSCAPEApp;
    var $modalInstance = {
        dismiss: function () {

        }
    };

    beforeEach(angular.mock.module('dataSCAPEApp'));
    beforeEach(function (done) {
        inject(function ($injector, $rootScope, $controller) {
            objCacheDetails = {
                data: {
                    meterInfo: {
                        'Serial Number': 12,
                        Load: 200,
                        MeterVersion: 1234,
                        consumerAddress: 1234556
                    }
                }
            }
            scope = $rootScope.$new();
            dataSCAPEApp = $controller('cellRelayDetail_DataVINEHealthCtrl', {
                '$scope': scope,
                '$modalInstance': $modalInstance,
            });
            done();
        });
    });
    it('01.serialNumber value to be 12', (done) => {
        expect(scope.serialNumber).toBe(12);
        done();
    });
    it('02.cancel function to be called', (done) => {
        scope.cancel();
        expect(scope.cancel).toBeDefined();
        done();
    });

});