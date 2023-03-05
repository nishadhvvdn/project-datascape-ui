var objCacheDetails;
describe('Controller: networkStatisticsMeterCtrl', function () {
    var scope, state, uibModal, deviceService, filter, timeout, dataSCAPEApp;
    deviceService = {
        NetworkStatisticsMeter: function () {
            return new Promise(function (resolve, reject) {
                var objData = {
                    Details: [{
                        MeterLoadDetail: [{ MeterSerialNumber: 123, MeterDeviceID: 12, MeterLoad: 123, MeterStatus: 'Active' }]
                    }]
                }
                resolve(objData);
            });
        }
    }
    beforeEach(angular.mock.module('dataSCAPEApp'));
    beforeEach(function (done) {
        inject(function ($injector, $rootScope, $controller, $state, $filter, $timeout) {
            scope = $rootScope.$new();
            state = $injector.get('$state');
            uibModal = $injector.get('$uibModal');
            filter = $injector.get('$filter');
            timeout = $injector.get('$timeout');
            dataSCAPEApp = $controller('networkStatisticsMeterCtrl', {
                '$scope': scope,
                '$state': state,
                '$uibModal': uibModal,
                'DeviceService': deviceService,
                '$filter': filter,
                '$timeout': timeout
            });
        });
        done();
    });
    it('01. status.isopen value to be open', (done) => {
        expect(scope.status.isopen).toBe(false);
        done();
    });
    it('02. exporterPdfFooter function to be called', (done) => {
        expect(JSON.stringify(scope.networkStatisticsMeterOptions.exporterPdfFooter(12, 13)))
            .toEqual('{"text":"12 of 13","style":"footerStyle"}');
        let docDefinition = {
            styles: {
                headerStyle: {},
                footerStyle: {}
            }
        }
        expect(JSON.stringify(scope.networkStatisticsMeterOptions.exporterPdfCustomFormatter(docDefinition)))
            .toEqual('{"styles":{"headerStyle":{"fontSize":22,"bold":true},"footerStyle":{"fontSize":10,"bold":true}}}');
        scope.networkStatisticsMeterOptions.onRegisterApi('gridApi');
        expect(scope.gridApi).toBe('gridApi');
        done();
    });
    it('03. filterDeviceStatus should be called', (done) => {
        scope.filterDeviceStatus('123');
        expect(scope.networkStatisticsMeterOptions.data.length).toBe(0);
        done();
    });
});